<?php

namespace App\Http\Controllers;

use App\Models\AiRating;
use App\Models\Candidate;
use App\Models\Position;
use Illuminate\Http\Request;
use OpenAI as OpenAIClient;
use Google\Cloud\Storage\StorageClient;
use stdClass;

class PdfController extends Controller
{
    private StorageClient $storage;

    public function __construct(StorageClient $storage)
    {
        $this->storage = $storage;
    }

    /**
     * Process a CV file using OpenAI's API to extract structured information.
     *
     * @param string $file The uploaded PDF file containing the CV
     * @return \stdClass JSON-formatted string containing the extracted CV information
     * @throws \Exception If the file is not a PDF or if processing fails
     */
    private function processCV($fileUrl): \stdClass
    {
        try {
            $file = $this->storage->bucket('hireapp-cvs-storage')->object($fileUrl);
            $openai = OpenAIClient::client(config('services.openai.api_key'));

            // Create a temporary file with .pdf extension
            $tempFile = tempnam(sys_get_temp_dir(), 'cv_') . '.pdf';
            file_put_contents($tempFile, $file->downloadAsString());

            $openaiFile = $openai->files()->upload([
                'purpose' => 'assistants',
                'file' => fopen($tempFile, 'r'),
            ]);

            // Clean up after upload
            unlink($tempFile);

            // Create a thread with the message and attached file
            $thread = $openai->threads()->create([
                'messages' => [
                    [
                        'role' => 'user',
                        'content' => 'Please analyze this CV and extract relevant information in JSON format with the following fields: name, email, phone, skills, experience, education.',
                        'attachments' => [
                            [
                                'file_id' => $openaiFile->id,
                                'tools' => [['type' => 'file_search']]
                            ]
                        ]
                    ]
                ]
            ]);

            // Create a run
            $run = $openai->threads()->runs()->create(
                threadId: $thread->id,
                parameters: [
                    'assistant_id' => 'asst_32gd7WRmc5G5V9qWlgh8Um8S',
                ]
            );

            // Wait for completion
            while (in_array($run->status, ['queued', 'in_progress'])) {
                sleep(1);
                $run = $openai->threads()->runs()->retrieve(
                    threadId: $thread->id,
                    runId: $run->id
                );
            }

            // Check if the run failed
            if ($run->status === 'failed') {
                $errorMessage = $run->last_error->message ?? 'Unknown error';
                // Log::error('Assistant run failed', ['error' => $errorMessage]);
                throw new \Exception('Assistant run failed: ' . $errorMessage);
            }

            // Get the assistant's response
            $messages = $openai->threads()->messages()->list($thread->id);
            $assistantResponse = $messages->data[0]->content[0]->text->value;

            // Cleanup
            $openai->files()->delete($openaiFile->id);

            $cleanResponse = trim(preg_replace('/^```json\s*|\s*```$/m', '', $assistantResponse));

            // Remove any non-JSON content before or after the JSON structure
            if (($start = strpos($cleanResponse, '{')) !== false && ($end = strrpos($cleanResponse, '}')) !== false) {
                $cleanResponse = substr($cleanResponse, $start, $end - $start + 1);
            }

            $res = json_decode($cleanResponse);
            if (!$res || !($res instanceof \stdClass)) {
                $error = json_last_error_msg();
                throw new \Exception('Failed to parse JSON response: ' . $error);
            }

            return $res;
        } catch (\Exception $e) {
            throw $e;
        }
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $filename = request()->input('file');
            $resource = request()->input('resource');

            if (!$filename) {
                return response()->json(['error' => 'No file parameter provided'], 400);
            }

            $res = $this->processCV($filename);
            $this->updateCandidate($resource, $res);

            return response()->json(['message' => $res], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Processing failed: ' . $e->getMessage()], 500);
        }
    }

    private function updateCandidate(int $candidateId, \stdClass $data): array
    {
        try {
            $candidate = Candidate::findOrFail($candidateId);

            // Update candidate with CV data
            $candidate->update([
                'name' => $data->name ?? $candidate->name,
                'email' => $data->email ?? $candidate->email,
                'phone' => $data->phone ?? $candidate->phone,
                'cv_data' => json_encode($data),
                'status' => 'pending_rating'
            ]);

            $position_data = Position::with('persona')
                ->findOrFail($candidate->position_id)
                ->toArray();

            $this->rateCandidate($position_data, $candidate);

            return [
                'message' => 'Candidate updated successfully',
                'data' => $candidate->toArray()
            ];
        } catch (\Exception $e) {
            throw $e;
        }
    }

    private function rateCandidate(mixed $position, Candidate $candidate): void
    {
        $persona = $position['persona'];

        $openai = OpenAIClient::client(config('services.openai.api_key'));

        $prompt = "I need you to analyze this candidate for the following position:

            Position Title: {$persona['position']}
            
            Key Requirements:
            - Work Experience: {$persona['work_experience']}
            - Education: {$persona['education']}
            - Seniority Level: {$persona['seniority']}
            - Required Languages: " . implode(', ', $persona['languages_spoken']) . "
            
            Additional Information:
            " . ($persona['additional_info'] ? "- {$persona['additional_info']}" : "None provided");

        $prompt .= "
            Our candidate information:
            CV Data: {$candidate->cv_data}
        ";

        $thread = $openai->threads()->create([
            'messages' => [
                [
                    'role' => 'user',
                    'content' => $prompt,
                ]
            ]
        ]);

        $run = $openai->threads()->runs()->create(
            threadId: $thread->id,
            parameters: [
                'assistant_id' => 'asst_mxd4aJRThYJCpMSt9YN2VaYL',
            ]
        );

        // Wait for completion
        while (in_array($run->status, ['queued', 'in_progress'])) {
            sleep(1);
            $run = $openai->threads()->runs()->retrieve(
                threadId: $thread->id,
                runId: $run->id
            );
        }

        // Check if the run failed
        if ($run->status === 'failed') {
            $errorMessage = $run->last_error->message ?? 'Unknown error';
            throw new \Exception('Assistant run failed: ' . $errorMessage);
        }

        // Get the assistant's response
        $messages = $openai->threads()->messages()->list($thread->id);
        $assistantResponse = $messages->data[0]->content[0]->text->value;
        $data = json_decode($assistantResponse);

        // Create a new AI rating
        $rating = new AiRating([
            'candidate_id' => $candidate->id,
            'rating' => $data->rating,
            'summary' => $data->summary,
            'cons' => json_encode($data->cons),
            'pros' => json_encode($data->pros),
        ]);

        $candidate->position->team()->decrement('credits', 1);

        $rating->save();
    }
}

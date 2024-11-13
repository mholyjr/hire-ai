<?php

namespace App\Http\Controllers;

use App\Models\Candidate;
use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Log;
use OpenAI as OpenAIClient;
use Google\Cloud\Storage\StorageClient;
use Illuminate\Support\Facades\Http;
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
            // Log::info('Starting CV processing', ['file' => $fileUrl]);

            $file = $this->storage->bucket('hireapp-cvs-storage')->object($fileUrl);
            $openai = OpenAIClient::client(config('services.openai.api_key'));

            // Log::info('Downloading file from storage');
            // Create a temporary file with .pdf extension
            $tempFile = tempnam(sys_get_temp_dir(), 'cv_') . '.pdf';
            file_put_contents($tempFile, $file->downloadAsString());

            // Log::info('Uploading file to OpenAI');
            $openaiFile = $openai->files()->upload([
                'purpose' => 'assistants',
                'file' => fopen($tempFile, 'r'),
            ]);

            // Clean up after upload
            unlink($tempFile);

            // Log::info('Creating OpenAI thread');
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

            // Log::info('Creating OpenAI run');
            // Create a run
            $run = $openai->threads()->runs()->create(
                threadId: $thread->id,
                parameters: [
                    'assistant_id' => 'asst_32gd7WRmc5G5V9qWlgh8Um8S',
                    'additional_instructions' => 'Extract relevant information from a CV and convert it into structured JSON format.

                # Output Format

                Provide the extracted information in the following JSON format:

                {
                    "Name": "John Doe",
                    "Email": "john.doe@example.com",
                    "Phone": "+123456789",
                    "Skills": ["Python", "Data Analysis", "Project Management"],
                    "Education": [
                        {
                            "Degree": "Bachelor of Science",
                            "Field": "Computer Science",
                            "Institution": "Example University",
                            "Year": "2022"
                        }
                    ],
                    "Experience": [
                        {
                            "Role": "Software Developer",
                            "Company": "Example Corp.",
                            "Years": "2020-2022",
                            "Responsibilities": [
                                "Developed backend services using Python.",
                                "Collaborated with the frontend team to integrate APIs."
                            ]
                        }
                    ],
                    "Certifications": [
                        {
                            "Name": "Certified Python Developer",
                            "Year": "2021"
                        }
                    ]
                } 

                # Notes

                - Include sections for Name, Email, Phone, Skills, Education, Experience, and Certifications if available.
                - Handle variations and missing sections gracefully—e.g., if Certifications or Experience are not listed, exclude them from the JSON output.
                Return only the json withou any other text or you will break my json encoding'
                ]
            );

            // Log::info('Waiting for OpenAI run completion');
            // Wait for completion
            while (in_array($run->status, ['queued', 'in_progress'])) {
                sleep(1);
                $run = $openai->threads()->runs()->retrieve(
                    threadId: $thread->id,
                    runId: $run->id
                );
                // Log::info('Run status: ' . $run->status);
            }

            // Check if the run failed
            if ($run->status === 'failed') {
                $errorMessage = $run->last_error->message ?? 'Unknown error';
                // Log::error('Assistant run failed', ['error' => $errorMessage]);
                throw new \Exception('Assistant run failed: ' . $errorMessage);
            }

            // Log::info('Retrieving OpenAI response');
            // Get the assistant's response
            $messages = $openai->threads()->messages()->list($thread->id);
            $assistantResponse = $messages->data[0]->content[0]->text->value;

            // Cleanup
            // Log::info('Cleaning up OpenAI file');
            $openai->files()->delete($openaiFile->id);

            $cleanResponse = trim(preg_replace('/^```json\s*|\s*```$/m', '', $assistantResponse));

            // Remove any non-JSON content before or after the JSON structure
            if (($start = strpos($cleanResponse, '{')) !== false && ($end = strrpos($cleanResponse, '}')) !== false) {
                $cleanResponse = substr($cleanResponse, $start, $end - $start + 1);
            }

            // Log::info('Parsing JSON response');
            $res = json_decode($cleanResponse);
            if (!$res || !($res instanceof \stdClass)) {
                $error = json_last_error_msg();
                // Log::error('JSON parsing failed', ['error' => $error, 'response' => $cleanResponse]);
                throw new \Exception('Failed to parse JSON response: ' . $error);
            }

            // Log::info('CV processing completed successfully');
            return $res;
        } catch (\Exception $e) {
            // Log::error('Error in processCV', [
            //     'error' => $e->getMessage(),
            //     'file' => $fileUrl,
            //     'trace' => $e->getTraceAsString()
            // ]);
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

            // Log::info('Processing CV request', [
            //     'filename' => $filename,
            //     'resource' => $resource
            // ]);

            if (!$filename) {
                // Log::warning('Bad request: No filename provided');
                return response()->json(['error' => 'No file parameter provided'], 400);
            }

            $res = $this->processCV($filename);
            $this->updateCandidate($resource, $res);

            // Log::info('CV processed successfully', [
            //     'filename' => $filename,
            //     'resource' => $resource
            // ]);

            return response()->json(['message' => $res], 200);
        } catch (\Exception $e) {
            // Log::error('CV processing failed', [
            //     'error' => $e->getMessage(),
            //     'file' => $filename ?? null,
            //     'resource' => $resource ?? null,
            //     'trace' => $e->getTraceAsString()
            // ]);

            return response()->json(['error' => 'Processing failed: ' . $e->getMessage()], 500);
        }
    }

    private function updateCandidate(int $candidateId, \stdClass $data): array
    {
        try {
            $candidate = Candidate::findOrFail($candidateId);

            // Update candidate with CV data
            $candidate->update([
                'name' => $data->Name ?? $candidate->name,
                'email' => $data->Email ?? $candidate->email,
                'phone' => $data->Phone ?? $candidate->phone,
                'skills' => $data->Skills ?? $candidate->skills,
                'experience' => $data->Experience ?? $candidate->experience,
                'education' => $data->Education ?? $candidate->education,
                'certifications' => $data->Certifications ?? $candidate->certifications,
            ]);

            return [
                'message' => 'Candidate updated successfully',
                'data' => $candidate->toArray()
            ];
        } catch (\Exception $e) {
            // Log::error('Error in updateCandidate', [
            //     'error' => $e->getMessage(),
            //     'candidateId' => $candidateId,
            //     'trace' => $e->getTraceAsString()
            // ]);
            throw $e;
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}

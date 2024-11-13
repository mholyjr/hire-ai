<?php

namespace App\Http\Controllers;

use App\Jobs\ProcessCandidateCv;
use App\Models\Position;
use App\Models\Candidate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\Log;

class CandidateController extends Controller
{

    use AuthorizesRequests;

    public function store(Request $request, Position $position)
    {
        $this->authorize('createForPosition', [Candidate::class, $position]);

        $validated = $request->validate([
            'phone' => 'nullable|string|max:20',
            'cv' => 'required|file|mimes:pdf|max:10240',
        ]);

        try {
            $file = $request->file('cv');

            // Then store in GCS
            $filename = time() . '_' . md5($file->getClientOriginalName());
            $cvPath = Storage::disk('gcs')->putFileAs(
                'cvs',
                $file,
                $filename,
                [
                    'metadata' => [
                        'contentType' => $file->getMimeType(),
                        'cacheControl' => 'public, max-age=86400'
                    ]
                ]
            );

            $candidate = $position->candidates()->create([
                'name' => $cvData['name'] ?? $validated['name'] ?? "",
                'email' => $cvData['email'] ?? $validated['email'] ?? "",
                'phone' => $cvData['phone'] ?? $validated['phone'] ?? "",
                'cv_path' => $cvPath,
                'cv_data' => "",
            ]);

            // Create LRO job to process CV only in dev mode
            if (app()->environment('local')) {
                dispatch(new ProcessCandidateCv($candidate, $cvPath));
            }

            return redirect()->route('positions.show', $position->slug);
        } catch (\Exception $e) {
            report($e);
            throw $e;
        }
    }

    public function updateFromCvProcessing(Request $request, Candidate $candidate)
    {
        // Ensure only internal requests from Google Cloud Tasks can access this endpoint
        // if (!app()->environment('local') && !$request->header('X-Cloud-Task-Queue-Name')) {
        //     abort(403);
        // }

        Log::info('Received CV processing update request', [
            'candidate_id' => $candidate->id,
            'payload' => $request->all()
        ]);

        $cvData = $request->all();

        // Update only the cv_data field
        $candidate->cv_data = json_encode($cvData);
        $candidate->status = "done";
        $candidate->save();
        return response()->json(['message' => 'Candidate updated successfully']);
    }
}

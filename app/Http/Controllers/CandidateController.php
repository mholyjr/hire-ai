<?php

namespace App\Http\Controllers;

use App\Models\Position;
use App\Models\Candidate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

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

            $position->candidates()->create([
                'name' => $cvData['name'] ?? $validated['name'] ?? "",
                'email' => $cvData['email'] ?? $validated['email'] ?? "",
                'phone' => $cvData['phone'] ?? $validated['phone'] ?? "",
                'cv_path' => $cvPath,
                'cv_data' => "",
            ]);

            return redirect()->route('positions.show', $position->slug);
        } catch (\Exception $e) {
            report($e);
            throw $e;
        }
    }
}

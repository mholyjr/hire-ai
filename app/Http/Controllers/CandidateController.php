<?php

namespace App\Http\Controllers;

use App\Models\Position;
use App\Models\Candidate;
use Illuminate\Http\Request;
use Inertia\Inertia;
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
        $filename = time() . '_' . $file->getClientOriginalName();
        
        // Store file using Spatie's GCS adapter
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
            'name' => $validated['name'] ?? "Test Candidate",
            'email' => $validated['email'] ?? "test@example.com",
            'phone' => $validated['phone'] ?? "123-456-7890",
            'cv_path' => $cvPath,
        ]);

        return redirect()->route('positions.show', $position->slug);
    } catch (\Exception $e) {
        report($e);
        throw $e;
    }
}
}
<?php

namespace App\Http\Controllers;

use App\Models\Position;
use App\Models\Candidate;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CandidateController extends Controller
{
    public function store(Request $request, Position $position)
    {
        $this->authorize('update', $position->project);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'cv' => 'required|file|mimes:pdf|max:10240',
        ]);

        $cvPath = $request->file('cv')->store('cvs', 'public');

        $candidate = $position->candidates()->create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'cv_path' => $cvPath,
        ]);

        // Here you would call your AI service to rate the CV
        // $aiRating = $this->aiService->rateCv($candidate, $position->persona);
        // $candidate->update(['ai_rating' => $aiRating]);

        return redirect()->route('positions.show', $position->slug);
    }
}
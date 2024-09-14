<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Position;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PositionController extends Controller
{
    public function index(Project $project)
    {
        $this->authorize('view', $project);

        return Inertia::render('Positions/Index', [
            'project' => $project->load('positions'),
        ]);
    }

    public function show(Position $position)
    {
        $this->authorize('view', $position->project);

        return Inertia::render('Positions/Show', [
            'position' => $position->load('candidates', 'persona'),
        ]);
    }

    public function store(Request $request, Project $project)
    {
        $this->authorize('update', $project);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $position = $project->positions()->create($validated);

        return redirect()->route('positions.show', $position->slug);
    }
}

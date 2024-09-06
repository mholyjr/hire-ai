<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function index(Request $request)
    {
        $teamId = $request->user()->currentTeam->id;
        $projects = Project::forTeam($teamId)->get();
        
        return Inertia::render('Dashboard', [
            'projects' => $projects
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'state' => 'required|boolean',
        ]);

        $project = $request->user()->currentTeam->projects()->create($validated);

        return redirect()->route('projects.index')->with('success', 'Project created successfully.');
    }
}
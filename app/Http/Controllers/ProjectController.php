<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;


class ProjectController extends Controller
{
    use AuthorizesRequests;

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
        ]);
    
        $project = $request->user()->currentTeam->projects()->create($validated);
    
        return redirect()->route('projects.index');
    }

    public function archive(Request $request, Project $project)
    {
        $this->authorize('update', $project);

        $project->state = !$project->state;
        $project->save();

        return redirect()->back()->with('message', 'Project status updated successfully.');
    }

    public function show($slug)
    {
        $project = Project::where('slug', $slug)->firstOrFail();
        
        // $this->authorize('view', $project);
    
        return Inertia::render('Projects/Show', [
            'project' => $project->load('positions'),
        ]);
    }
    public function getRouteKeyName()
    {
        return 'slug';
    }
}
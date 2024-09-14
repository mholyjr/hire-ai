<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Position;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\DB;

class PositionController extends Controller
{

    use AuthorizesRequests;

    public function index(Project $project)
    {
        $this->authorize('view', $project);

        return Inertia::render('Positions/Index', [
            'project' => $project->load('positions'),
        ]);
    }

    public function create(Project $project)
    {
        $this->authorize('update', $project);

        return Inertia::render('Positions/Create', [
            'project' => $project,
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
            'persona.position' => 'required|string|max:255',
            'persona.work_experience' => 'required|string',
            'persona.education' => 'required|string',
            'persona.seniority' => 'required|string|max:255',
            'persona.nationality' => 'nullable|string|max:255',
            'persona.languages_spoken' => 'required|array',
            'persona.languages_spoken.*' => 'string|max:255',
            'persona.additional_info' => 'nullable|string',
        ]);

        DB::beginTransaction();

        try {
            $position = $project->positions()->create([
                'title' => $validated['title'],
                'description' => $validated['description'],
            ]);

            $position->persona()->create([
                'position' => $validated['persona']['position'],
                'work_experience' => $validated['persona']['work_experience'],
                'education' => $validated['persona']['education'],
                'seniority' => $validated['persona']['seniority'],
                'nationality' => $validated['persona']['nationality'],
                'languages_spoken' => $validated['persona']['languages_spoken'],
                'additional_info' => $validated['persona']['additional_info'],
            ]);

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }

        return redirect()->route('projects.show', $project->slug);
    }
}

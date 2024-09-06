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
}
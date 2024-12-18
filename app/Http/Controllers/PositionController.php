<?php

namespace App\Http\Controllers;

use App\Models\Position;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class PositionController extends Controller
{
    use AuthorizesRequests;

    public function list(Request $request)
    {
        $teamId = $request->user()->currentTeam->id;

        // Get stats for the team
        $stats = app(StatsController::class)->getTeamStats($request)->getData();

        $positions = Position::forTeam($teamId)
            ->where('state', 1)
            ->withCount('candidates')
            ->with(['candidates.aiRating'])
            ->orderBy('created_at', 'desc')
            ->paginate(20)
            ->through(function ($position) {
                // Calculate average rating manually
                $ratings = $position->candidates->pluck('aiRating.rating')->filter();
                $avgRating = $ratings->count() > 0 ? $ratings->avg() : 0;

                return [
                    'id' => $position->id,
                    'title' => $position->title,
                    'description' => $position->description,
                    'created_at' => $position->created_at,
                    'num_of_candidates' => (int) $position->candidates_count,
                    'avg_rating' => round($avgRating, 1),
                    'slug' => $position->slug,
                    'state' => $position->state
                ];
            });

        return Inertia::render('Positions/List', [
            'positions' => $positions,
            'teamStats' => $stats
        ]);
    }

    public function store(Request $request)
    {
        $this->authorize('create', Position::class);

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
            $position = $request->user()->currentTeam->positions()->create([
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

        return redirect()->route('positions');
    }

    public function archive(Request $request, Position $position)
    {
        $this->authorize('update', $position);

        $position->state = !$position->state;
        $position->save();

        return redirect()->back()->with('message', 'Position status updated successfully.');
    }

    public function show(Position $position)
    {
        $this->authorize('view', $position);

        $position->load(['persona', 'candidates.aiRating']);

        return Inertia::render('Positions/Show', [
            'position' => $position
        ]);
    }

    public function upload(Request $request, Position $position)
    {
        $this->authorize('update', $position);

        $request->validate([
            'file' => 'required|file|mimes:pdf|max:10240'
        ]);

        $path = $request->file('file')->store('positions', 'gcs');

        $position->update([
            'file_path' => $path
        ]);

        return response()->json([
            'filePath' => $path
        ]);
    }
}

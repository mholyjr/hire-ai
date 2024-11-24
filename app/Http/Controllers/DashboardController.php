<?php

namespace App\Http\Controllers;

use App\Models\Position;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class DashboardController extends Controller
{
    use AuthorizesRequests;

    public function index(Request $request)
    {
        $teamId = $request->user()->currentTeam->id;

        // Get stats for the team
        $stats = app(StatsController::class)->getTeamStats($request)->getData();

        $positions = Position::forTeam($teamId)
            ->where('state', 1)
            ->withCount('candidates')
            ->with(['candidates.aiRating'])  // Load the relationships
            ->get()
            ->map(function ($position) {
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

        return Inertia::render('Dashboard', [
            'positions' => $positions,
            'teamStats' => $stats
        ]);
    }
}

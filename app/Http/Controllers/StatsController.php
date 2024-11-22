<?php

namespace App\Http\Controllers;

use App\Models\Candidate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class StatsController extends Controller
{
    public function getTeamStats(Request $request)
    {
        $teamId = $request->user()->currentTeam->id;
        $thirtyDaysAgo = Carbon::now()->subDays(30)->startOfDay();
        $dates = collect();

        // Generate all dates for the last 30 days
        for ($date = $thirtyDaysAgo->copy(); $date <= Carbon::now(); $date->addDay()) {
            $dates->push($date->format('Y-m-d'));
        }

        // Get daily candidates count
        $dailyCandidates = Candidate::whereHas('position', function ($query) use ($teamId) {
            $query->where('team_id', $teamId);
        })
            ->where('candidates.created_at', '>=', $thirtyDaysAgo)  // Specify table name
            ->select(
                DB::raw('DATE(candidates.created_at) as date'),
                DB::raw('COUNT(*) as count')
            )
            ->groupBy('date')
            ->pluck('count', 'date')
            ->toArray();

        // Get daily average ratings
        $dailyRatings = Candidate::whereHas('position', function ($query) use ($teamId) {
            $query->where('team_id', $teamId);
        })
            ->whereHas('aiRating')
            ->where('candidates.created_at', '>=', $thirtyDaysAgo)  // Specify table name
            ->join('ai_ratings', 'candidates.id', '=', 'ai_ratings.candidate_id')
            ->select(
                DB::raw('DATE(candidates.created_at) as date'),
                DB::raw('AVG(ai_ratings.rating) as avg_rating')
            )
            ->groupBy('date')
            ->pluck('avg_rating', 'date')
            ->toArray();

        // Rest of the code remains the same...
        $candidatesData = $dates->map(function ($date) use ($dailyCandidates) {
            return [
                'name' => Carbon::parse($date)->format('M d'),
                'total' => $dailyCandidates[$date] ?? 0
            ];
        })->values();

        $ratingsData = $dates->map(function ($date) use ($dailyRatings) {
            return [
                'name' => Carbon::parse($date)->format('M d'),
                'rating' => round($dailyRatings[$date] ?? 0, 1)
            ];
        })->values();

        return response()->json([
            'candidates_data' => $candidatesData,
            'ratings_data' => $ratingsData
        ]);
    }
}

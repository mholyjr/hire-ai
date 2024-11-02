<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Candidate;
use App\Models\Position;
use Illuminate\Auth\Access\HandlesAuthorization;

class CandidatePolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any candidates.
     */
    public function viewAny(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can view the candidate.
     */
    public function view(User $user, Candidate $candidate): bool
    {
        return $user->belongsToTeam($candidate->position->team);
    }

    /**
     * Determine whether the user can create candidates.
     */
    public function create(User $user, Position $position): bool
    {
        return $user->belongsToTeam($position->team);
    }

    /**
     * Determine whether the user can update the candidate.
     */
    public function update(User $user, Candidate $candidate): bool
    {
        return $user->belongsToTeam($candidate->position->team);
    }

    /**
     * Determine whether the user can delete the candidate.
     */
    public function delete(User $user, Candidate $candidate): bool
    {
        return $user->belongsToTeam($candidate->position->team);
    }

    /**
     * Determine whether the user can restore the candidate.
     */
    public function restore(User $user, Candidate $candidate): bool
    {
        return $user->belongsToTeam($candidate->position->team);
    }

    /**
     * Determine whether the user can permanently delete the candidate.
     */
    public function forceDelete(User $user, Candidate $candidate): bool
    {
        return $user->hasTeamPermission($candidate->position->team, 'delete');
    }

    /**
     * Determine whether the user can create candidates for a position.
     */
    public function createForPosition(User $user, Position $position): bool
    {
        return $user->belongsToTeam($position->team);
    }
}
<?php

namespace App\Policies;

use App\Models\Position;
use App\Models\User;

class PositionPolicy
{
    public function create(User $user): bool
    {
        return true;
    }

    public function update(User $user, Position $position): bool
    {
        return $user->belongsToTeam($position->team);
    }
}
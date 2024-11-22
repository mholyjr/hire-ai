<?php

namespace App\Models;

use App\Enums\CandidateState;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Candidate extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'email', 'phone', 'cv_path', 'ai_rating', 'status', 'cv_data', 'state'];

    protected $casts = [
        'cv_data' => 'array',
        'state' => CandidateState::class,
    ];

    public function position()
    {
        return $this->belongsTo(Position::class);
    }

    public function aiRating()
    {
        return $this->hasOne(AiRating::class);
    }
}

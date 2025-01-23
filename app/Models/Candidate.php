<?php

namespace App\Models;

use App\Enums\CandidateState;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Candidate extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'email', 'phone', 'cv_path', 'ai_rating', 'status', 'cv_data', 'state', 'slug'];

    protected $casts = [
        'cv_data' => 'array',
        'ai_rating' => 'array',
        'state' => CandidateState::class,
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($candidate) {
            $candidate->slug = Str::slug($candidate->name . '-' . Str::random(8));
        });
    }

    public function getAiRatingAttribute($value)
    {
        $rating = is_string($value) ? json_decode($value, true) : $value;

        if ($rating && is_array($rating)) {
            if (isset($rating['pros']) && is_string($rating['pros'])) {
                $rating['pros'] = json_decode($rating['pros'], true) ?? [];
            }
            if (isset($rating['cons']) && is_string($rating['cons'])) {
                $rating['cons'] = json_decode($rating['cons'], true) ?? [];
            }
        }

        return $rating;
    }

    public function position()
    {
        return $this->belongsTo(Position::class);
    }

    public function aiRating()
    {
        return $this->hasOne(AiRating::class);
    }

    public function notes()
    {
        return $this->hasMany(Note::class)->orderBy('created_at', 'desc');
    }
}

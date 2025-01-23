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

    public function setCvDataAttribute($value)
    {
        if (empty($value)) {
            $this->attributes['cv_data'] = $value;
            return;
        }
        
        $this->attributes['cv_data'] = is_array($value) ? json_encode($value) : $value;
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

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Position extends Model
{
    use HasFactory;
    
    protected $fillable = ['team_id', 'title', 'description', 'slug', 'state'];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($position) {
            $position->slug = Str::slug($position->title . '-' . Str::random(8));
        });
    }

    public function team()
    {
        return $this->belongsTo(Team::class);
    }

    public function scopeForTeam($query, $teamId)
    {
        return $query->where('team_id', $teamId);
    }

    public function candidates()
    {
        return $this->hasMany(Candidate::class);
    }

    public function persona()
    {
        return $this->hasOne(Persona::class);
    }
}

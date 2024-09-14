<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;


class Position extends Model
{
    use HasFactory;
    
    protected $fillable = ['title', 'description', 'slug'];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($position) {
            $position->slug = Str::slug($position->title . '-' . Str::random(8));
        });
    }

    public function project()
    {
        return $this->belongsTo(Project::class);
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

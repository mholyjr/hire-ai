<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Persona extends Model
{
    use HasFactory;

    protected $fillable = [
        'position', 'work_experience', 'education', 'seniority',
        'nationality', 'languages_spoken', 'additional_info'
    ];

    protected $casts = [
        'languages_spoken' => 'array',
    ];

    public function position()
    {
        return $this->belongsTo(Position::class);
    }
}

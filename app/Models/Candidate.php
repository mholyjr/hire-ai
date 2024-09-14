<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Candidate extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'email', 'phone', 'cv_path', 'ai_rating'];

    public function position()
    {
        return $this->belongsTo(Position::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AiRating extends Model
{
    protected $fillable = ['candidate_id', 'rating', 'summary', 'cons', 'pros'];

    protected $casts = [
        'pros' => 'array',
        'cons' => 'array',
    ];

    public function candidate()
    {
        return $this->belongsTo(Candidate::class);
    }
}

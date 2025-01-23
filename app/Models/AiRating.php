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

    // public function setProsAttribute($value)
    // {
    //     $this->attributes['pros'] = is_array($value) ? json_encode($value) : $value;
    // }

    // public function setConsAttribute($value)
    // {
    //     $this->attributes['cons'] = is_array($value) ? json_encode($value) : $value;
    // }

    public function getProsAttribute($value)
    {
        if (is_string($value)) {
            // First remove the escaped quotes
            $value = str_replace('\"', '"', $value);
            // Remove the leading and trailing quotes if they exist
            $value = trim($value, '"');
            return json_decode($value, true) ?? [];
        }
        return $value ?? [];
    }

    public function getConsAttribute($value)
    {
        if (is_string($value)) {
            // First remove the escaped quotes
            $value = str_replace('\"', '"', $value);
            // Remove the leading and trailing quotes if they exist
            $value = trim($value, '"');
            return json_decode($value, true) ?? [];
        }
        return $value ?? [];
    }

    public function candidate()
    {
        return $this->belongsTo(Candidate::class);
    }
}

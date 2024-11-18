<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CreditPurchase extends Model
{
    protected $fillable = [
        'team_id',
        'amount',
        'credits',
        'stripe_payment_id',
    ];

    public function team()
    {
        return $this->belongsTo(Team::class);
    }
}

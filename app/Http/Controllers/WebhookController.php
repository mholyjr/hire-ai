<?php

namespace App\Http\Controllers;

use App\Models\Team;
use Illuminate\Support\Facades\DB;
use Laravel\Cashier\Http\Controllers\WebhookController as CashierController;

class WebhookController extends CashierController
{
    public function handleCheckoutSessionCompleted(array $payload)
    {
        $data = $payload['data']['object'];
        $team = Team::findOrFail($data['client_reference_id']);

        $credits = $data['metadata']['credits'] ?? 0;

        DB::transaction(function () use ($data, $team, $credits) {
            // Update or create stripe_id if not exists
            if (!$team->stripe_id) {
                $team->update(['stripe_id' => $data['customer']]);
            }

            // Add credits to the team
            $team->increment('credits', $credits);

            // Optionally, log the transaction
            $team->creditPurchases()->create([
                'amount' => $data['amount_total'] / 100, // Convert from cents
                'credits' => $credits,
                'stripe_payment_id' => $data['payment_intent'],
            ]);
        });

        return $this->successMethod();
    }
}

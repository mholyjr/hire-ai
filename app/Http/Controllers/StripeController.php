<?php

namespace App\Http\Controllers;

use App\Models\CreditPurchase;
use App\Models\Team;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Stripe\Stripe;

class StripeController extends Controller
{
    public function __construct()
    {
        Stripe::setApiKey(config('services.stripe.secret'));
    }

    public function portal(Request $request)
    {
        $portalUrl = $request->user()->currentTeam->billingPortalUrl(
            route('positions')
        );

        return inertia('Billing/Portal', [
            'portalUrl' => $portalUrl
        ]);
    }

    public function success(Request $request)
    {
        $sessionId = $request->get('session_id');

        try {
            $session = \Stripe\Checkout\Session::retrieve($sessionId);

            if ($session->payment_status === 'paid') {
                $teamId = $session->metadata->team_id;
                $credits = $session->metadata->credits;
                Log::info('Stripe checkout session processed', ['team_id' => $teamId, 'credits' => $credits]);

                // Find and update the team
                $team = Team::findOrFail($teamId);
                $team->increment('credits', $credits);

                // Create credit purchase record
                CreditPurchase::create([
                    'team_id' => $teamId,
                    'amount' => $session->amount_total / 100, // Convert from cents to dollars
                    'credits' => $credits,
                    'stripe_payment_id' => $session->payment_intent,
                ]);

                return redirect()->route('positions', ['checkout_status' => 'success']);
            }
        } catch (Exception $e) {
            return redirect()->route('positions') . '?checkout_status=error';
        }
    }
}

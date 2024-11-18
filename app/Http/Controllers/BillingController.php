<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class BillingController extends Controller
{
    public function index()
    {
        $team = Auth::user()->currentTeam;
        $credits = 10000;
        $checkoutPlan1 = $team->checkoutCharge(
            1000,
            '10 Credits',
            1,
            [
                'success_url' => route('checkout.success') . '?session_id={CHECKOUT_SESSION_ID}&checkout_status=success',
                'cancel_url' => route('positions') . '?checkout_status=cancel',
                'metadata' => [
                    'credits' => $credits,
                    'team_id' => $team->id
                ]
            ]
        );

        return Inertia::render('Billing/index', [
            'checkoutUrl' => $checkoutPlan1->url
        ]);
    }
}

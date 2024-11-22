<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class BillingController extends Controller
{
    public function index()
    {
        $plans = [
            [
                "title" => "10 Credits",
                "purchaseUrl" => $this->getCheckoutUrl(7.99, 1, "10 Credits"),
                "pricePerCredit" => "0.80",
                "totalPrice" => 7.99
            ],
            [
                "title" => "100 Credits",
                "purchaseUrl" => $this->getCheckoutUrl(29.99, 1, "100 Credits"),
                "pricePerCredit" => "0.30",
                "totalPrice" => 29.99
            ],
            [
                "title" => "1000 Credits",
                "purchaseUrl" => $this->getCheckoutUrl(249.00, 1, "1000 Credits"),
                "pricePerCredit" => "0.25",
                "totalPrice" => 249.00
            ],
        ];

        $purchases = Auth::user()
            ->currentTeam
            ->creditPurchases()
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($purchase) {
                return [
                    'id' => $purchase->id,
                    'credits' => $purchase->credits,
                    'amount' => number_format($purchase->amount / 100, 2), // Convert cents to dollars
                    'date' => $purchase->created_at->format('Y-m-d H:i'),
                    'stripe_payment_id' => $purchase->stripe_payment_id,
                ];
            });

        return Inertia::render('Billing/index', [
            'plans' => $plans,
            'purchases' => $purchases
        ]);
    }

    private function getCheckoutUrl(float $price, int $credits, string $title): string
    {
        $team = Auth::user()->currentTeam;

        if (!$team) {
            throw new \Exception('No team found for the current user');
        }

        // Ensure price is valid and convert to cents
        $priceInCents = (int)($price * 100);

        $checkoutOptions = [
            'success_url' => route('checkout.success') . '?session_id={CHECKOUT_SESSION_ID}&checkout_status=success',
            'cancel_url' => route('billing') . '?checkout_status=cancel',
            'metadata' => [
                'credits' => $credits,
                'team_id' => $team->id,
                'product_name' => $title,
            ],
            'payment_method_types' => ['card'],
            'mode' => 'payment',
        ];

        $link = $team->checkoutCharge($priceInCents, $title, $credits, $checkoutOptions);

        if (!$link || !$link->url) {
            throw new \Exception('Failed to generate checkout URL');
        }

        return $link->url;
    }
}

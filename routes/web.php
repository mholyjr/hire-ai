<?php

use App\Http\Controllers\BillingController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PositionController;
use App\Http\Controllers\CandidateController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\GoogleLoginController;
use App\Http\Controllers\NotesController;
use App\Http\Controllers\StripeController;
use App\Http\Controllers\WebhookController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {});

Route::middleware(['auth:sanctum', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Positions
    Route::get('/positions', [PositionController::class, 'list'])->name('positions.list');
    Route::post('/positions', [PositionController::class, 'store'])->name('positions.store');
    Route::patch('/positions/{position}/archive', [PositionController::class, 'archive'])->name('positions.archive');
    Route::get('/positions/{position:slug}', [PositionController::class, 'show'])->name('positions.show');
    Route::post('/positions/{position:slug}/candidates', [CandidateController::class, 'store'])->name('candidates.store');
    Route::post('/positions/{position}/upload', [PositionController::class, 'upload'])->name('positions.upload');

    // Candidates
    Route::get('/candidates', [CandidateController::class, 'list'])->name('candidates.list');
    Route::get('/candidates/{slug}', [CandidateController::class, 'show'])
        ->name('candidates.show')
        ->middleware(['auth:sanctum', 'verified']);
    Route::get('/candidates/{candidate}/ai-rating', [CandidateController::class, 'checkAiRating'])
        ->name('candidates.check-ai-rating');
    Route::patch('candidates/{candidate}/state', [CandidateController::class, 'updateState'])
        ->name('candidates.update-state')
        ->middleware(['auth']);

    // Notes
    Route::post('/candidates/{candidate}/notes', [NotesController::class, 'store'])->name('notes.store');
    Route::delete('/notes/{note}', [NotesController::class, 'destroy'])->name('notes.destroy');

    // Billing
    Route::get('/billing', [BillingController::class, 'index'])->name('billing');
    Route::get('/billing/portal', [StripeController::class, 'portal'])->name('billing.portal');
});

Route::get('/login/google', [GoogleLoginController::class, 'redirectToGoogle'])->name('auth.google');
Route::get('/login/google/callback', [GoogleLoginController::class, 'handleGoogleCallback']);
Route::post(
    '/stripe/webhook',
    [WebhookController::class, 'handleWebhook']
);

Route::get('/checkout/success', [StripeController::class, 'success'])
    ->name('checkout.success')
    ->middleware(['auth']);

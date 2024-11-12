<?php

use App\Http\Controllers\CandidateController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/candidates/{candidate}/cv-processing', [CandidateController::class, 'updateFromCvProcessing'])
    ->name('candidates.update-from-cv-processing');
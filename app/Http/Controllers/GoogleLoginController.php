<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Team;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\Auth;

class GoogleLoginController extends Controller
{
    public function redirectToGoogle(): RedirectResponse
    {
        return Socialite::driver('google')->redirect();
    }

    public function handleGoogleCallback(): RedirectResponse
    {
        $user = Socialite::driver('google')->user();

        // First check if user exists with google_id
        $existingUser = User::where('google_id', $user->id)->first();

        if ($existingUser) {
            // Log in the existing user
            Auth::login($existingUser, true);
        } else {
            // Check if user exists with same email
            $userWithEmail = User::where('email', $user->email)->first();

            if ($userWithEmail) {
                // Update existing user with google_id
                $userWithEmail->google_id = $user->id;
                $userWithEmail->save();

                Auth::login($userWithEmail, true);
            } else {
                // Create a new user
                $newUser = new User();
                $newUser->name = $user->name;
                $newUser->email = $user->email;
                $newUser->google_id = $user->id;
                $newUser->password = bcrypt(Str::random()); // Set some random password
                $newUser->save();

                // Create personal team for the new user
                $newUser->ownedTeams()->save(Team::forceCreate([
                    'user_id' => $newUser->id,
                    'name' => explode(' ', $newUser->name, 2)[0] . "'s Team",
                    'personal_team' => true,
                ]));

                $newUser->current_team_id = $newUser->ownedTeams()->first()->id;
                $newUser->save();

                Auth::login($newUser, true);
            }
        }

        return redirect()->intended('/dashboard');
    }
}

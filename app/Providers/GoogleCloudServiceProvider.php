<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Google\Cloud\Storage\StorageClient;

class GoogleCloudServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register()
    {
        $this->app->singleton(StorageClient::class, function ($app) {
            return new StorageClient([
                'keyFile' => [
                    'type' => 'service_account',
                    'project_id' => config('services.google.project_id'),
                    'private_key_id' => config('services.google.private_key_id'),
                    'private_key' => str_replace('\\n', "\n", config('services.google.private_key')),
                    'client_email' => config('services.google.client_email'),
                    'client_id' => env('GOOGLE_SERVICE_ACC_CLIENT_ID'),
                    'auth_uri' => 'https://accounts.google.com/o/oauth2/auth',
                    'token_uri' => 'https://oauth2.googleapis.com/token',
                    'auth_provider_x509_cert_url' => 'https://www.googleapis.com/oauth2/v1/certs',
                    'client_x509_cert_url' => config('services.google.client_x509_cert_url'),
                ],
            ]);
        });
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}

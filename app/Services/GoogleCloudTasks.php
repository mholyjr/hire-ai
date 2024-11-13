<?php

namespace App\Services;

use Google\Cloud\Tasks\V2\CloudTasksClient;
use Google\Cloud\Tasks\V2\HttpMethod;
use Google\Cloud\Tasks\V2\HttpRequest;
use Google\Cloud\Tasks\V2\Task;

class GoogleCloudTasks
{
    private CloudTasksClient $client;
    private string $projectId;
    private string $locationId;

    public function __construct()
    {
        $this->client = new CloudTasksClient([
            'credentials' => [
                'type' => env('GOOGLE_SERVICE_ACC_TYPE'),
                'project_id' => env('GOOGLE_SERVICE_ACC_PROJECT_ID'),
                'private_key_id' => env('GOOGLE_SERVICE_ACC_PRIVATE_KEY_ID'),
                'private_key' => env('GOOGLE_SERVICE_ACC_PRIVATE_KEY'),
                'client_email' => env('GOOGLE_SERVICE_ACC_CLIENT_EMAIL'),
                'client_id' => env('GOOGLE_SERVICE_ACC_CLIENT_ID'),
                'auth_uri' => env('GOOGLE_SERVICE_ACC_AUTH_URI'),
                'token_uri' => env('GOOGLE_SERVICE_ACC_TOKEN_URI'),
                'auth_provider_x509_cert_url' => env('GOOGLE_SERVICE_ACC_AUTH_PROVIDER_X509_CERT_URL'),
                'client_x509_cert_url' => env('GOOGLE_SERVICE_ACC_CLIENT_X509_CERT_URL'),
                'universe_domain' => env('GOOGLE_SERVICE_ACC_UNIVERSE_DOMAIN'),
            ]
        ]);
        $this->projectId = config('services.google.project_id');
        $this->locationId = config('services.google.location_id');
    }

    public function dispatch(string $queue, string $url, string $method = HttpMethod::POST, array $payload = []): void
    {
        $queuePath = $this->client->queueName(
            $this->projectId,
            $this->locationId,
            $queue
        );

        $task = new Task([
            'http_request' => new HttpRequest([
                'url' => $url,
                'http_method' => $method,
                'headers' => ['Content-Type' => 'application/json'],
                'body' => json_encode($payload)
            ])
        ]);

        $this->client->createTask($queuePath, $task);
    }
}

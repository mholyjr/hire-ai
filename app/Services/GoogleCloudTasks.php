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
            'credentials' => config('services.google.credentials_path'),
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

<?php

namespace App\Jobs;

use App\Models\Candidate;
use App\Services\GoogleCloudTasks;
use Google\Cloud\Tasks\V2\HttpMethod;

class ProcessCandidateCv
{
    public function __construct(
        private Candidate $candidate,
        private string $cvPath
    ) {}

    public function handle(GoogleCloudTasks $cloudTasks): void
    {
        $payload = [
            'file' => $this->cvPath,
            'resource' => $this->candidate->id,
        ];

        $cloudTasks->dispatch(
            queue: 'pdf-cvs',
            url: "http://138.201.246.60/api/pdfs",
            method: HttpMethod::POST,
            payload: $payload,
        );
    }
}

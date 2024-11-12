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
        $cloudTasks->dispatch(
            queue: 'pdf-cvs',
            url: "http://hireapp-ai-gcp.test/api/pdfs",
            method: HttpMethod::POST,
            payload: [
                'token' => config('services.hireapp_ai_gcp.api_key'),
                'file' => $this->cvPath,
                'resource' => $this->candidate->id,
            ],
        );
    }
}

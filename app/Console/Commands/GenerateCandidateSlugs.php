<?php

namespace App\Console\Commands;

use App\Models\Candidate;
use Illuminate\Console\Command;
use Illuminate\Support\Str;

class GenerateCandidateSlugs extends Command
{
    protected $signature = 'candidates:generate-slugs';
    protected $description = 'Generate slugs for existing candidates';

    public function handle()
    {
        $candidates = Candidate::whereNull('slug')->get();

        $this->info("Generating slugs for {$candidates->count()} candidates...");

        foreach ($candidates as $candidate) {
            $candidate->slug = Str::slug($candidate->name . '-' . Str::random(8));
            $candidate->save();
        }

        $this->info('Slugs generated successfully!');
    }
}

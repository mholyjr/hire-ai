<?php

namespace App\Http\Controllers;

use App\Jobs\ProcessCandidateCv;
use App\Models\Position;
use App\Models\Candidate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\Log;
use App\Enums\CandidateState;
use Illuminate\Support\Facades\Auth;

class CandidateController extends Controller
{

    use AuthorizesRequests;

    public function index(Request $request)
    {
        $this->authorize('viewAny', Candidate::class);

        $query = Candidate::query()
            ->whereHas('position.team', function ($query) {
                $query->where('team_id', Auth::user()->currentTeam->id);
            })
            ->with(['position']);

        // Search by name or email
        if ($request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', "%{$request->search}%")
                    ->orWhere('email', 'like', "%{$request->search}%");
            });
        }

        // Filter by position
        if ($request->position) {
            $query->whereHas('position', function ($q) use ($request) {
                $q->where('id', $request->position);
            });
        }

        // Filter by state
        if ($request->state) {
            $query->where('state', $request->state);
        }

        $candidates = $query->orderBy('created_at', 'desc')->paginate(20)
            ->withQueryString();

        // Get positions for filter dropdown
        $positions = Position::where('team_id', Auth::user()->currentTeam->id)
            ->select('id', 'title')
            ->get();

        return inertia('Candidates/Index', [
            'candidates' => $candidates,
            'positions' => $positions,
            'filters' => [
                'search' => $request->search,
                'position' => $request->position,
                'state' => $request->state,
            ],
        ]);
    }

    public function store(Request $request, Position $position)
    {
        $this->authorize('createForPosition', [Candidate::class, $position]);

        $validated = $request->validate([
            'phone' => 'nullable|string|max:20',
            'cv' => 'required|file|mimes:pdf|max:10240',
        ]);

        try {
            $file = $request->file('cv');

            // Then store in GCS
            $filename = time() . '_' . md5($file->getClientOriginalName());
            $cvPath = Storage::disk('gcs')->putFileAs(
                'cvs',
                $file,
                $filename,
                [
                    'metadata' => [
                        'contentType' => $file->getMimeType(),
                        'cacheControl' => 'public, max-age=86400'
                    ]
                ]
            );

            $candidate = $position->candidates()->create([
                'name' => $cvData['name'] ?? $validated['name'] ?? "",
                'email' => $cvData['email'] ?? $validated['email'] ?? "",
                'phone' => $cvData['phone'] ?? $validated['phone'] ?? "",
                'state' => CandidateState::MAYBE->value,
                'cv_path' => $cvPath,
                'cv_data' => "",
            ]);

            // Create LRO job to process CV only in dev mode
            if (app()->environment('local')) {
                dispatch(new ProcessCandidateCv($candidate, $cvPath));
            }

            return redirect()->route('positions.show', $position->slug);
        } catch (\Exception $e) {
            report($e);
            throw $e;
        }
    }

    public function updateFromCvProcessing(Request $request, Candidate $candidate)
    {
        Log::info('Received CV processing update request', [
            'candidate_id' => $candidate->id,
            'payload' => $request->all()
        ]);

        $cvData = $request->all();

        // Update only the cv_data field
        $candidate->cv_data = json_encode($cvData);
        $candidate->status = "done";
        $candidate->save();
        return response()->json(['message' => 'Candidate updated successfully']);
    }

    public function checkAiRating(Candidate $candidate)
    {
        $this->authorize('view', $candidate);

        $candidate->load('aiRating');

        return response()->json($candidate);
    }

    public function updateState(Request $request, Candidate $candidate)
    {
        $this->authorize('update', $candidate);

        $validated = $request->validate([
            'state' => ['required', 'string', 'in:' . implode(',', array_column(CandidateState::cases(), 'value'))],
        ]);

        $candidate->update([
            'state' => $validated['state'],
        ]);

        return response()->json([
            'message' => 'Candidate state updated successfully',
            'candidate' => $candidate
        ]);
    }
}

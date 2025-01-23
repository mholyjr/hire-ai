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
use Inertia\Inertia;

/**
 * Controller for managing candidate-related operations.
 *
 * This controller handles operations such as listing, showing, creating,
 * and updating candidates, including their states and AI ratings.
 *
 * @uses \Illuminate\Foundation\Auth\Access\AuthorizesRequests
 */
class CandidateController extends Controller
{

    use AuthorizesRequests;

    /**
     * Display a paginated list of candidates with filters.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Inertia\Response
     *
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function list(Request $request)
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

        return inertia('Candidates/List', [
            'candidates' => $candidates,
            'positions' => $positions,
            'filters' => [
                'search' => $request->search,
                'position' => $request->position,
                'state' => $request->state,
            ],
        ]);
    }

    /**
     * Display the specified candidate.
     *
     * @param  string  $slug
     * @return \Inertia\Response
     *
     * @throws \Illuminate\Database\Eloquent\ModelNotFoundException
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function show(string $slug)
    {

        $candidate = Candidate::with(['position.team', 'aiRating', 'notes'])
            ->where('slug', $slug)
            ->firstOrFail();

        $this->authorize('view', $candidate);

        return inertia('Candidates/Show', [
            'candidate' => $candidate,
        ]);
    }

    /**
     * Store a new candidate for a specific position.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Position  $position
     * @return \Illuminate\Http\RedirectResponse
     *
     * @throws \Illuminate\Auth\Access\AuthorizationException
     * @throws \Illuminate\Validation\ValidationException
     * @throws \Exception
     */
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

            dispatch(new ProcessCandidateCv($candidate, $cvPath));

            return redirect()->route('positions.show', $position->slug);
        } catch (\Exception $e) {
            report($e);
            throw $e;
        }
    }

    /**
     * Update candidate data based on CV processing results.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Candidate  $candidate
     * @return \Illuminate\Http\JsonResponse
     */
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

    /**
     * Retrieve the AI rating for a specific candidate.
     *
     * @param  \App\Models\Candidate  $candidate
     * @return \Illuminate\Http\JsonResponse
     *
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function checkAiRating(Candidate $candidate)
    {
        $this->authorize('view', $candidate);

        $candidate->load('aiRating');

        return response()->json($candidate);
    }

    /**
     * Update the state of a specific candidate.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Candidate  $candidate
     * @return \Illuminate\Http\JsonResponse
     *
     * @throws \Illuminate\Auth\Access\AuthorizationException
     * @throws \Illuminate\Validation\ValidationException
     */
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

    /**
     * Download the candidate's CV from Google Cloud Storage.
     *
     * @param  \App\Models\Candidate  $candidate
     * @return \Symfony\Component\HttpFoundation\StreamedResponse
     *
     * @throws \Illuminate\Auth\Access\AuthorizationException
     * @throws \Google\Cloud\Core\Exception\NotFoundException
     */
    public function downloadCv(Candidate $candidate)
    {
        $this->authorize('view', $candidate);

        try {
            $storage = Storage::disk('gcs');

            if (!$storage->exists($candidate->cv_path)) {
                abort(404, 'CV file not found');
            }

            $file = $storage->get($candidate->cv_path);
            $filename = $candidate->name . '_CV.pdf';

            return response()->streamDownload(function () use ($file) {
                echo $file;
            }, $filename, [
                'Content-Type' => 'application/pdf',
                'Content-Disposition' => 'attachment; filename="' . $filename . '"'
            ]);
        } catch (\Exception $e) {
            report($e);
            abort(500, 'Error downloading CV');
        }
    }


    public function update(Request $request, Candidate $candidate)
    {
        $this->authorize('update', $candidate);

        $validated = $request->validate([
            'field' => 'required|string',
            'value' => 'required',
            'type' => 'required|in:direct,cv_data'
        ]);

        try {
            if ($validated['type'] === 'direct') {
                $candidate->update([
                    $validated['field'] => $validated['value']
                ]);
            } else {
                $cvData = $candidate->cv_data;
                $cvData[$validated['field']] = $validated['value'];
                $candidate->update(['cv_data' => $cvData]);
            }

            // Reload the candidate with its relationships
            $candidate->load(['position.team', 'aiRating', 'notes']);

            return Inertia::render('Candidates/Show', [
                'candidate' => $candidate
            ]);
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Failed to update candidate']);
        }
    }
}

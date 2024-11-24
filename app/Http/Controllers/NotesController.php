<?php

namespace App\Http\Controllers;

use App\Models\Candidate;
use App\Models\Note;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NotesController extends Controller
{
    use AuthorizesRequests;

    public function store(Request $request, Candidate $candidate)
    {
        $this->authorize('view', $candidate);

        $validated = $request->validate([
            'content' => 'required|string|max:1000',
        ]);

        $note = $candidate->notes()->create([
            'content' => $validated['content'],
            'user_id' => Auth::id(),
        ]);

        return response()->json([
            'note' => $note->load('user'),
        ]);
    }

    public function destroy(Note $note)
    {
        $this->authorize('view', $note->candidate);

        // Only allow deletion by the note creator
        if ($note->user_id !== Auth::id()) {
            abort(403);
        }

        $note->delete();

        return response()->json([
            'message' => 'Note deleted successfully',
        ]);
    }
}

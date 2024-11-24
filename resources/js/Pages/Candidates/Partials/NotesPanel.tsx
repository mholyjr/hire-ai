import React from "react";
import { Button } from "@/Components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import { Textarea } from "@/Components/ui/textarea";
import { Note } from "@/types";
import { FileTextIcon, XIcon } from "lucide-react";
import { useAddNote } from "../Hooks/useAddNote";
import dayjs from "dayjs";
import { ScrollArea } from "@/Components/ui/scroll-area";
import axios from "axios";

type Props = {
  candidateId: number;
  initialNotes: Note[];
};

const NotesContent = React.memo(
  ({
    notes,
    onDelete,
  }: {
    notes: Note[];
    onDelete: (id: number) => Promise<void>;
  }) => {
    if (notes.length === 0) {
      return (
        <div className="h-[calc(100vh-27rem)] flex flex-col items-center justify-center text-center p-4">
          <FileTextIcon className="h-12 w-12 text-muted-foreground/50 mb-4" />
          <h3 className="font-semibold text-lg">No notes yet</h3>
          <p className="text-sm text-muted-foreground">
            Add your first note to keep track of important information.
          </p>
        </div>
      );
    }

    return (
      <>
        {notes.map(note => (
          <Card key={note.id} className="mb-4 rounded-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {note.user.name}
              </CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDelete(note.id)}
              >
                <XIcon className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{note.content}</p>
            </CardContent>
            <CardFooter>
              <p className="text-xs text-muted-foreground">
                {dayjs(note.created_at.toLocaleString()).format(
                  "MMM D, YYYY h:mm A",
                )}
              </p>
            </CardFooter>
          </Card>
        ))}
      </>
    );
  },
);

NotesContent.displayName = "NotesContent";

export const NotesPanel: React.FC<Props> = ({ candidateId, initialNotes }) => {
  const [notes, setNotes] = React.useState<Note[]>(initialNotes);
  const [newNote, setNewNote] = React.useState("");

  const { mutate: addNote, isPending } = useAddNote(candidateId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    addNote(
      { content: newNote },
      {
        onSuccess: data => {
          setNewNote("");
          setNotes([data, ...notes]);
        },
      },
    );
  };

  const handleDelete = async (noteId: number) => {
    try {
      await axios.delete(`/notes/${noteId}`);
      setNotes(notes.filter(note => note.id !== noteId));
    } catch (error) {
      console.error("Failed to delete note:", error);
    }
  };

  return (
    <Card className="h-[calc(100vh-12rem)] flex flex-col">
      <CardHeader>
        <CardTitle>Notes</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden">
        <ScrollArea className="h-full">
          <NotesContent notes={notes} onDelete={handleDelete} />
        </ScrollArea>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <form onSubmit={handleSubmit} className="w-full space-y-2">
          <Textarea
            placeholder="Add a note..."
            value={newNote}
            onChange={e => setNewNote(e.target.value)}
          />
          <Button className="w-full" disabled={isPending}>
            Add Note
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};

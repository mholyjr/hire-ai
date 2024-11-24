import { Note } from "@/types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export type CreateNoteInput = {
  content: string;
};

const useRemoveNote = (noteId: number) => {
  return useMutation<Note, Error, CreateNoteInput>({
    mutationFn: async data => {
      const response = await axios.delete(`/notes/${noteId}`);

      return response.data.note;
    },
    onSuccess: () => {
      void console.log("Note added successfully");
    },
  });
};

export { useRemoveNote };

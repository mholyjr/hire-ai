import { Note } from "@/types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export type CreateNoteInput = {
  content: string;
};

const useAddNote = (candidateId: number) => {
  return useMutation<Note, Error, CreateNoteInput>({
    mutationFn: async data => {
      const response = await axios.post(
        `/candidates/${candidateId}/notes`,
        data,
      );
      return response.data.note;
    },
    onSuccess: () => {
      void console.log("Note added successfully");
    },
  });
};

export { useAddNote };

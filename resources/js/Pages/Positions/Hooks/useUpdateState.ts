import { Candidate, CandidateState } from "@/types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export type CreatePollInput = {
  state: CandidateState;
};

const useUpdateState = (candidateId: number) => {
  return useMutation<Candidate, Error, CreatePollInput>({
    mutationFn: async data => {
      const payload = data;

      const response = await axios.patch(
        `/candidates/${candidateId}/state`,
        payload,
      );
      return response.data;
    },
    onSuccess: () => {
      void console.log("Updating state successful");
    },
  });
};

export { useUpdateState };

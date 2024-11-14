import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AiRating, Candidate } from "@/types";

export function useAiRating(candidateId: number, initialData: Candidate) {
  return useQuery({
    queryKey: ["aiRating", candidateId],
    queryFn: async (): Promise<Candidate> => {
      const { data } = await axios.get(`/candidates/${candidateId}/ai-rating`);
      return data;
    },
    // Only refetch if we don't have a rating yet
    refetchInterval: 5000,
    // Stop polling after 5 minutes (60 attempts)
    refetchOnMount: true,
    retry: 10,
    enabled: initialData.status !== "done",
    initialData: initialData
  });
}

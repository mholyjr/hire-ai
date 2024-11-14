import { Badge } from "@/Components/ui/badge";
import { Candidate } from "@/types";
import React from "react";
import { useAiRating } from "../Hooks/useAiRating";

export const CandidateRow = ({ candidate }: { candidate: Candidate }) => {
  const {
    data: freshData,
    isLoading,
    isError,
  } = useAiRating(candidate.id, candidate);

  return (
    <div
      key={freshData.id}
      className="flex items-center justify-between border-b pb-4"
    >
      <div>
        <h4 className="font-medium">
          {freshData.name} ({freshData.email}){" "}
          
        </h4>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {freshData.ai_rating?.summary}
        </p>
      </div>
      {freshData.ai_rating && (
        <Badge>Score: {freshData.ai_rating.rating}</Badge>
      )}
    </div>
  );
};

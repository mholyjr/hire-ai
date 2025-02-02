import React from "react";
import { Position, Persona, Candidate } from "@/types";
import { CandidateItem } from "./Partials/CandidateItem";
import PositionLayout from "@/Layouts/PositionLayout";
import { LayoutSidebar } from "./Partials/LayoutSidebar";
import { PositionStats } from "./Partials/PositionStats";

interface CandidateStateCounts {
  rejected: number;
  maybe: number;
  shortList: number;
  avgRating: number;
}

interface Props {
  position: Position & {
    persona: Persona;
    candidates: Candidate[];
  };
  positions: Position[];
  candidateStateCounts: CandidateStateCounts;
}

export default function Show({
  position,
  positions,
  candidateStateCounts,
}: Props) {
  const statsData = [
    {
      name: "Average Rating",
      value: candidateStateCounts.avgRating,
      change: 0,
      changeType: "neutral" as const,
      href: "#",
      id: "avgRating",
      color: "bg-primary",
    },
    {
      name: "Rejected",
      value: candidateStateCounts.rejected,
      change: 0,
      changeType: "neutral" as const,
      href: "#",
      id: "rejected",
      color: "bg-red-500",
    },
    {
      name: "Maybe",
      value: candidateStateCounts.maybe,
      change: 0,
      changeType: "neutral" as const,
      href: "#",
      id: "maybe",
      color: "bg-yellow-500",
    },
    {
      name: "Short-listed",
      value: candidateStateCounts.shortList,
      change: 0,
      changeType: "neutral" as const,
      href: "#",
      id: "shortList",
      color: "bg-green-500",
    },
  ];

  return (
    <PositionLayout
      title={position.title}
      sidebar={<LayoutSidebar positions={positions} position={position} />}
    >
      <div className="border-b border-gray-100 dark:border-gray-700 bg-sidebar p-4 sm:p-6 lg:p-8">
        <PositionStats data={statsData} />
      </div>

      <div className="p-6">
        <h2>Latest candidates</h2>
        <div className="grid gap-8 grid-cols-2">
          {position.candidates.map(candidate => (
            <CandidateItem key={candidate.id} candidate={candidate} />
          ))}
        </div>
      </div>
    </PositionLayout>
  );
}

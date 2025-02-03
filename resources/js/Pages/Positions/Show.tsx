import React from "react";
import { Position, Persona, Candidate } from "@/types";
import { CandidateItem } from "./Partials/CandidateItem";
import PositionLayout from "@/Layouts/PositionLayout";
import { LayoutSidebar } from "./Partials/LayoutSidebar";
import { PositionStats } from "./Partials/PositionStats";
import { Button } from "@/Components/ui/button";
import { CandidatesTable } from "./Partials/CandidatesTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";

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

const SectionHeader = ({ title }: { title: string }) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="font-semibold">{title}</h2>
      <Button>Upload CV</Button>
    </div>
  );
};

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

      <div className="p-8">
        <Card>
          <CardHeader>
            <CardTitle>Latest candidates</CardTitle>
          </CardHeader>
          <CardContent>
            <CandidatesTable data={position.candidates} />
          </CardContent>
        </Card>
      </div>
    </PositionLayout>
  );
}

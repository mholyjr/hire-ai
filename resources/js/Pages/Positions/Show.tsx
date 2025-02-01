import React from "react";
import AppLayout from "@/Layouts/AppLayout";
import { Position, Persona, Candidate } from "@/types";
import { Card, CardContent, CardHeader } from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";
import { Header } from "@/Components/Header";
import { NewPositionForm } from "@/features/Positions/Partials/NewPositionDialog/Partials/NewPositionForm";
import { useForm } from "@inertiajs/react";
import { PersonaForm } from "./Partials/PersonaForm";
import { DragDrop } from "@/Components/DragDrop";
import { CandidateRow } from "./Partials/CandidateRow";
import { CandidateItem } from "./Partials/CandidateItem";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/Components/ui/popover";
import { Button } from "@/Components/ui/button";
import { PlusCircleIcon } from "lucide-react";
import { useToast } from "@/Hooks/use-toast";
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
  const { toast } = useToast();
  const { data, setData, patch, processing, errors } = useForm({
    title: position.title,
    description: position.description,
    persona: {
      position: position.persona.position,
      work_experience: position.persona.work_experience,
      education: position.persona.education,
      seniority: position.persona.seniority,
      nationality: position.persona.nationality || "",
      languages_spoken: position.persona.languages_spoken,
      additional_info: position.persona.additional_info || "",
    },
  });

  const statsData = [
    {
      name: "Average Rating",
      value: candidateStateCounts.avgRating,
      change: 0,
      changeType: "neutral" as const,
      href: "#",
      id: "avgRating",
      color: "bg-primary"
    },
    {
      name: "Rejected",
      value: candidateStateCounts.rejected,
      change: 0,
      changeType: "neutral" as const,
      href: "#",
      id: "rejected",
      color: "bg-red-500"
    },
    {
      name: "Maybe",
      value: candidateStateCounts.maybe,
      change: 0,
      changeType: "neutral" as const,
      href: "#",
      id: "maybe",
      color: "bg-yellow-500"
    },
    {
      name: "Short-listed",
      value: candidateStateCounts.shortList,
      change: 0,
      changeType: "neutral" as const,
      href: "#",
      id: "shortList",
      color: "bg-green-500"
    },
  ];

  return (
    <PositionLayout
      title={position.title}
      sidebar={<LayoutSidebar positions={positions} position={position} />}
    >
      <div>
        <div className="mb-8 pb-8 border-b">
          <PositionStats data={statsData} />
        </div>
        <div className="grid gap-8 grid-cols-2">
          {position.candidates.map(candidate => (
            <CandidateItem key={candidate.id} candidate={candidate} />
          ))}
        </div>
      </div>
    </PositionLayout>
  );
}

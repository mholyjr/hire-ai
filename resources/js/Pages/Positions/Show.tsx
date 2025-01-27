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

interface Props {
  position: Position & {
    persona: Persona;
    candidates: Candidate[];
  };
  positions: Position[];
}

export default function Show({ position, positions }: Props) {
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

  return (
    <PositionLayout
      title={position.title}
      sidebar={<LayoutSidebar positions={positions} position={position} />}
    >
      <div>
        <div className="grid gap-8 grid-cols-2">
          {position.candidates.map(candidate => (
            <CandidateItem key={candidate.id} candidate={candidate} />
          ))}
        </div>
      </div>
    </PositionLayout>
  );
}

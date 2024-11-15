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

interface Props {
  position: Position & {
    persona: Persona;
    candidates: Candidate[];
  };
}

export default function Show({ position }: Props) {
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
    <AppLayout
      title={position.title}
      renderHeader={() => (
        <Header
          title={position.title}
          action={
            <Popover>
              <PopoverTrigger asChild>
                <Button className="inline-flex gap-2">
                  <PlusCircleIcon size={16} /> Upload CV
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <DragDrop
                  position={position}
                  onUploadSuccess={path => {
                    console.log("CV uploaded:", path);
                  }}
                  onUploadError={error => {
                    console.error("Upload failed:", error);
                  }}
                />
              </PopoverContent>
            </Popover>
          }
        />
      )}
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="flex flex-col gap-8">
          {/* Persona Details */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Persona Details</h3>
            </CardHeader>
            <CardContent>
              <PersonaForm data={data} setData={setData} />
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-3">
          <div className="grid gap-8 grid-cols-2">
            {position.candidates.map(candidate => (
              <CandidateItem key={candidate.id} candidate={candidate} />
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

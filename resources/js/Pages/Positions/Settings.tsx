import React from "react";
import { Position, Persona } from "@/types";
import { Card, CardContent, CardHeader } from "@/Components/ui/card";
import { Header } from "@/Components/Header";
import { useForm } from "@inertiajs/react";
import { PersonaForm } from "./Partials/PersonaForm";
import { useToast } from "@/Hooks/use-toast";
import PositionLayout from "@/Layouts/PositionLayout";
import { LayoutSidebar } from "./Partials/LayoutSidebar";
import { Button } from "@/Components/ui/button";

interface Props {
  position: Position & {
    persona: Persona;
  };
}

export default function Settings({ position }: Props) {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    patch(route("positions.update", position.slug), {
      onSuccess: () => {
        toast({
          title: "Settings updated",
          description: "Your position settings have been updated successfully.",
        });
      },
    });
  };

  return (
    <PositionLayout
      title={`${position.title} - Settings`}
      sidebar={<LayoutSidebar positions={[]} position={position} />}
    >
      <form onSubmit={handleSubmit} className="space-y-8">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Position Settings</h3>
          </CardHeader>
          <CardContent>
            <PersonaForm data={data} setData={setData} />
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" disabled={processing}>
            Save Changes
          </Button>
        </div>
      </form>
    </PositionLayout>
  );
}

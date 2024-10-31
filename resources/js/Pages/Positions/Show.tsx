import React from "react";
import AppLayout from "@/Layouts/AppLayout";
import { Position, Persona, Candidate } from "@/types";
import { Card, CardContent, CardHeader } from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";
import { Header } from "@/Components/Header";
import { NewPositionForm } from "@/features/Positions/Partials/NewPositionDialog/Partials/NewPositionForm";
import { useForm } from "@inertiajs/react";
import { PersonaForm } from "./Partials/PersonaForm";

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

  console.log(data)

  return (
    <AppLayout
      title={position.title}
      renderHeader={() => <Header type="detail" title={position.title} />}
    >
      <div className="px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Position Details */}
          <Card className="md:col-span-2">
            <CardHeader>
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Position Details</h3>
                <Badge variant={position.state ? "secondary" : "outline"}>
                  {position.state ? "Active" : "Archived"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">Description</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    {position.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Persona Details */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Persona Details</h3>
            </CardHeader>
            <CardContent>
             <PersonaForm data={data} setData={setData} />
              {/* <div className="space-y-4">
                <div>
                  <h4 className="font-medium">Position</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    {position.persona.position}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">Seniority</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    {position.persona.seniority}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">Work Experience</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    {position.persona.work_experience}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">Education</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    {position.persona.education}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">Languages</h4>
                  <div className="flex gap-2 flex-wrap">
                    {position.persona.languages_spoken.map(language => (
                      <Badge key={language} variant="secondary">
                        {language}
                      </Badge>
                    ))}
                  </div>
                </div>
                {position.persona.additional_info && (
                  <div>
                    <h4 className="font-medium">Additional Information</h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      {position.persona.additional_info}
                    </p>
                  </div>
                )}
              </div> */}
            </CardContent>
          </Card>

          {/* Candidates Section */}
          <Card className="md:col-span-3">
            <CardHeader>
              <h3 className="text-lg font-semibold">Candidates</h3>
            </CardHeader>
            <CardContent>
              {position.candidates.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-400">
                  No candidates yet.
                </p>
              ) : (
                <div className="space-y-4">
                  {position.candidates.map(candidate => (
                    <div
                      key={candidate.id}
                      className="flex items-center justify-between border-b pb-4"
                    >
                      <div>
                        <h4 className="font-medium">{candidate.name}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {candidate.email}
                        </p>
                      </div>
                      {candidate.ai_rating && (
                        <Badge>Score: {candidate.ai_rating}</Badge>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}

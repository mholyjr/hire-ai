import React from "react";
import { Candidate } from "@/types";
import { Badge } from "@/Components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { PencilIcon, StarIcon } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { Textarea } from "@/Components/ui/textarea";
import { Input } from "@/Components/ui/input";
import { router } from "@inertiajs/react";

interface EditableFieldProps {
  value: string | number | null | undefined;
  field: string;
  type: "direct" | "cv_data";
  candidateId: number;
  isMultiline?: boolean;
}

const EditableField = ({
  value,
  field,
  type,
  candidateId,
  isMultiline = false,
}: EditableFieldProps) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [currentValue, setCurrentValue] = React.useState(value);

  const handleSave = async () => {
    try {
      router.put(
        route("candidates.update", candidateId),
        {
          field,
          value: currentValue,
          type,
        },
        {
          preserveState: true,
          preserveScroll: true,
          onSuccess: () => setIsEditing(false),
        },
      );
    } catch (error) {
      console.error("Failed to update:", error);
    }
  };

  if (!isEditing) {
    return (
      <div className="group relative">
        {value}
        <button
          onClick={() => setIsEditing(true)}
          className="absolute -right-6 top-0 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <PencilIcon className="h-4 w-4" />
        </button>
      </div>
    );
  }

  if (!currentValue) return;

  return (
    <div className="flex gap-2">
      {isMultiline ? (
        <Textarea
          value={currentValue}
          onChange={e => setCurrentValue(e.target.value)}
          className="min-h-[100px]"
        />
      ) : (
        <Input
          value={currentValue}
          onChange={e => setCurrentValue(e.target.value)}
        />
      )}
      <Button size="sm" onClick={handleSave}>
        Save
      </Button>
      <Button size="sm" variant="outline" onClick={() => setIsEditing(false)}>
        Cancel
      </Button>
    </div>
  );
};

export const CandidateDetail = ({ candidate }: { candidate: Candidate }) => {
  const handleDownloadCv = () => {
    window.location.href = route("candidates.download-cv", candidate.id);
  };

  console.log(candidate)

  return (
    <>
      <div className="grid gap-8">
        <div>
          <Card className="max-w-[50%]">
            <CardHeader className="flex items-center justify-between flex-row">
              <CardTitle className="text-2xl font-medium m-0 p-0">
                <EditableField
                  value={candidate.name}
                  field="name"
                  type="direct"
                  candidateId={candidate.id}
                />
              </CardTitle>
              <Button
                variant="outline"
                onClick={handleDownloadCv}
                className="!mt-0"
              >
                Download CV
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex flex-row items-center gap-8">
                <div className="mt-1 flex items-center mb-4">
                  <StarIcon className="mr-1 h-4 w-4 fill-primary text-primary" />
                  <span className="text-3xl font-medium">
                    {candidate.ai_rating?.rating ?? 0}/100
                  </span>
                </div>
              </div>
              <div className="flex flex-row items-center gap-8">
                <EditableField
                  value={candidate.email}
                  field="email"
                  type="direct"
                  candidateId={candidate.id}
                />
                <EditableField
                  value={candidate.phone}
                  field="phone"
                  type="direct"
                  candidateId={candidate.id}
                />
              </div>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{candidate.ai_rating?.summary}</p>
          </CardContent>
        </Card>
        {candidate.ai_rating && (
          <Card>
            <CardHeader>
              <CardTitle>Pros & Cons</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium">Pros</h4>
                  <ul className="list-disc pl-5">
                    {Array.isArray(candidate.ai_rating?.pros) &&
                      candidate.ai_rating?.pros?.map((pro, index) => (
                        <li key={index}>{pro}</li>
                      ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium">Cons</h4>
                  <ul className="list-disc pl-5">
                    {Array.isArray(candidate.ai_rating?.cons) &&
                      candidate.ai_rating?.cons?.map((con, index) => (
                        <li key={index}>{con}</li>
                      ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        {candidate.cv_data && (
          <>
            <Card>
              <CardHeader>
                <CardTitle>Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {candidate.cv_data.skills?.map((skill, index) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Education</CardTitle>
              </CardHeader>
              <CardContent>
                {candidate?.cv_data?.education?.map((edu, index) => (
                  <div key={index} className="mb-2">
                    <p className="font-medium">
                      {edu.Degree} in {edu.Field}
                    </p>
                    <p>
                      {edu.Institution}, {edu.Year}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Experience</CardTitle>
              </CardHeader>
              <CardContent>
                {candidate.cv_data.experience?.map((exp, index) => (
                  <div key={index} className="mb-4">
                    <p className="font-medium">{exp.Role}</p>
                    <p>
                      {exp.Company}, {exp.Years}
                    </p>
                    <ul className="list-disc pl-5 mt-2">
                      {exp.Responsibilities?.map((resp, respIndex) => (
                        <li key={respIndex}>{resp}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </>
  );
};

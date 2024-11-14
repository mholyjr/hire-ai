import React from "react";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import { Label } from "@/Components/ui/label";
import { PositionFormData } from "..";

type Props = {
  data: PositionFormData;
  setData: (key: string, value: any) => void;
  errors: Partial<Record<string, string>>;
  handlePersonaChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  handleLanguagesChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const NewPositionForm: React.FC<Props> = ({
  data,
  setData,
  errors,
  handlePersonaChange,
  handleLanguagesChange,
}) => {
  return (
    <>
      <div className="mb-4">
        <Input type="hidden" name="title" value={data.title} />
        <Input type="hidden" name="description" value={data.description} />
        <Label htmlFor="persona.position">Position</Label>
        <Input
          type="text"
          id="persona.position"
          name="position"
          value={data.persona.position}
          onChange={handlePersonaChange}
          placeholder="Software Engineer"
          error={errors["persona.position"] as string}
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="persona.seniority">Seniority</Label>
        <Input
          type="text"
          id="persona.seniority"
          name="seniority"
          value={data.persona.seniority}
          onChange={handlePersonaChange}
          placeholder="Medior to senior"
          error={errors["persona.seniority"]}
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="persona.education">Education</Label>
        <Input
          id="persona.education"
          name="education"
          value={data.persona.education}
          onChange={handlePersonaChange}
          placeholder="At least Bachelor of Science in Computer Science"
          error={errors["persona.education"] as string}
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="persona.work_experience">Work Experience</Label>
        <Textarea
          id="persona.work_experience"
          name="work_experience"
          value={data.persona.work_experience}
          onChange={handlePersonaChange}
          placeholder="We are looking for someone who have worked with big clients"
          rows={4}
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="persona.languages_spoken">
          Languages Spoken (comma-separated)
        </Label>
        <Input
          type="text"
          id="persona.languages_spoken"
          name="languages_spoken"
          value={data.persona.languages_spoken.join(", ")}
          onChange={handleLanguagesChange}
          error={errors["persona.languages_spoken"]}
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="persona.nationality">Nationality (optional)</Label>
        <Input
          type="text"
          id="persona.nationality"
          name="nationality"
          value={data.persona.nationality}
          onChange={handlePersonaChange}
          error={errors["persona.nationality"]}
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="persona.additional_info">Additional Information</Label>
        <Textarea
          id="persona.additional_info"
          name="additional_info"
          value={data.persona.additional_info}
          onChange={handlePersonaChange}
          rows={4}
        />
      </div>
    </>
  );
};

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
        <Label
          htmlFor="title"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Title
        </Label>
        <Input
          type="text"
          id="title"
          value={data.title}
          onChange={e => setData("title", e.target.value)}
          error={errors.title}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <Label
          htmlFor="description"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Description
        </Label>
        <Textarea
          id="description"
          value={data.description}
          onChange={e => setData("description", e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          rows={4}
        />
        {errors.description && (
          <div className="text-red-500 text-xs italic">
            {errors.description}
          </div>
        )}
      </div>

      <h3 className="text-lg font-semibold mb-4 mt-8">Persona Details</h3>
      <div className="mb-4">
        <Label
          htmlFor="persona.position"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Position
        </Label>
        <Input
          type="text"
          id="persona.position"
          name="position"
          value={data.persona.position}
          onChange={handlePersonaChange}
          error={errors["persona.position"]}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <Label
          htmlFor="persona.work_experience"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Work Experience
        </Label>
        <Textarea
          id="persona.work_experience"
          name="work_experience"
          value={data.persona.work_experience}
          onChange={handlePersonaChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          rows={4}
        />
        {errors["persona.work_experience"] && (
          <div className="text-red-500 text-xs italic">
            {errors["persona.work_experience"]}
          </div>
        )}
      </div>
      <div className="mb-4">
        <Label
          htmlFor="persona.education"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Education
        </Label>
        <Textarea
          id="persona.education"
          name="education"
          value={data.persona.education}
          onChange={handlePersonaChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          rows={4}
        />
        {errors["persona.education"] && (
          <div className="text-red-500 text-xs italic">
            {errors["persona.education"]}
          </div>
        )}
      </div>
      <div className="mb-4">
        <Label
          htmlFor="persona.seniority"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Seniority
        </Label>
        <Input
          type="text"
          id="persona.seniority"
          name="seniority"
          value={data.persona.seniority}
          onChange={handlePersonaChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          error={errors["persona.seniority"]}
        />
      </div>
      <div className="mb-4">
        <Label
          htmlFor="persona.nationality"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Nationality (optional)
        </Label>
        <Input
          type="text"
          id="persona.nationality"
          name="nationality"
          value={data.persona.nationality}
          onChange={handlePersonaChange}
          error={errors["persona.nationality"]}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <Label
          htmlFor="persona.languages_spoken"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Languages Spoken (comma-separated)
        </Label>
        <Input
          type="text"
          id="persona.languages_spoken"
          name="languages_spoken"
          value={data.persona.languages_spoken.join(", ")}
          onChange={handleLanguagesChange}
          error={errors["persona.languages_spoken"]}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <Label
          htmlFor="persona.additional_info"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Additional Information
        </Label>
        <Textarea
          id="persona.additional_info"
          name="additional_info"
          value={data.persona.additional_info}
          onChange={handlePersonaChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          rows={4}
        />
        {errors["persona.additional_info"] && (
          <div className="text-red-500 text-xs italic">
            {errors["persona.additional_info"]}
          </div>
        )}
      </div>
    </>
  );
};

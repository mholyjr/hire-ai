import React from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import Checkbox from "@/Components/Checkbox";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";

type Props = {
  data: {
    title: string;
    description: string;
  };
  setData: (key: string, value: any) => void;
  errors: Partial<Record<"title" | "description" | "state", string>>;
};

export const NewProjectForm: React.FC<Props> = ({ data, setData, errors }) => {
  return (
    <>
      <div className="mb-4">
        <Input
          value={data.title}
          onChange={e => setData("title", e.target.value)}
          required
          label="Title"
        />
        <InputError message={errors.title} className="mt-2" />
      </div>

      <div className="mb-4">
        <Textarea
          id="description"
          value={data.description}
          onChange={e => setData("description", e.target.value)}
          label="Description"
        />
        <InputError message={errors.description} className="mt-2" />
      </div>
    </>
  );
};

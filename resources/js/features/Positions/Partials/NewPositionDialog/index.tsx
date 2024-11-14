import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/Components/ui/sheet";
import { Button } from "@/Components/ui/button";
import { NewPositionForm } from "./Partials/NewPositionForm";
import { useForm } from "@inertiajs/react";

export type PositionFormData = {
  title: string;
  description: string;
  persona: {
    position: string;
    work_experience: string;
    education: string;
    seniority: string;
    nationality: string;
    languages_spoken: string[];
    additional_info: string;
  };
};

export const NewPositionDialog: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [formMessage, setFormMessage] = React.useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const { data, setData, reset, processing, errors, post } =
    useForm<PositionFormData>({
      title: "",
      description: "",
      persona: {
        position: "",
        work_experience: "",
        education: "",
        seniority: "",
        nationality: "",
        languages_spoken: [],
        additional_info: "",
      },
    });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormMessage(null);

    // Set title and description based on position
    const title = data.persona.position;
    const description = `We are looking for a ${data.persona.seniority} ${data.persona.position}`;
    setData(prev => ({
      ...prev,
      title,
      description,
    }));

    post(route("positions.store"), {
      onSuccess: () => {
        reset();
      },
      onError: err => {
        setFormMessage({
          type: "error",
          text: err.response,
        });
      },
    });
  };

  const handlePersonaChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setData("persona", { ...data.persona, [name]: value });
  };

  const handleLanguagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const languages = e.target.value.split(",").map(lang => lang.trim());
    setData("persona", { ...data.persona, languages_spoken: languages });
  };

  return (
    <Sheet open={open} onOpenChange={() => setOpen(!open)}>
      <SheetTrigger asChild>
        <Button>Add position</Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto !max-w-[33%]">
        <SheetHeader className="mb-8">
          <SheetTitle>Add a new position</SheetTitle>
          <SheetDescription>
            Fill out the form to create a new position.
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit}>
          <NewPositionForm
            data={data}
            setData={setData}
            errors={errors}
            handlePersonaChange={handlePersonaChange}
            handleLanguagesChange={handleLanguagesChange}
          />

          <Button disabled={processing} className="w-full">
            Create Position
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
};

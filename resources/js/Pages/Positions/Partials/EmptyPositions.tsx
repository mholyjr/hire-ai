import { Button } from "@/Components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import { PositionFormData } from "@/features/Positions/Partials/NewPositionDialog";
import { useForm } from "@inertiajs/react";
import { PlusCircle } from "lucide-react";
import React from "react";

export const EmptyPositions = () => {
  const [formMessage, setFormMessage] = React.useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const [step, setStep] = React.useState<number>(1);

  const nextStep = () => {
    setStep(prev => prev + 1);
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
  };

  const getStepFromFieldName = (fieldName: string): number => {
    const step1Fields = ["position", "seniority"];
    const step2Fields = ["education", "work_experience"];
    const step3Fields = ["languages_spoken", "nationality", "additional_info"];

    const field = fieldName.replace("persona.", "");

    if (step1Fields.includes(field)) return 1;
    if (step2Fields.includes(field)) return 2;
    if (step3Fields.includes(field)) return 3;
    return 1;
  };

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
        // Find the first error and set the step accordingly
        if (errors) {
          const errorFields = Object.keys(errors);
          if (errorFields.length > 0) {
            const firstErrorStep = getStepFromFieldName(errorFields[0]);
            setStep(firstErrorStep);
          }
        }
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

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <div className="mb-4">
              <Input type="hidden" name="title" value={data.title} />
              <Input
                type="hidden"
                name="description"
                value={data.description}
              />
              <Label htmlFor="persona.position">Position</Label>
              <Input
                type="text"
                id="persona.position"
                name="position"
                value={data.persona.position}
                onChange={handlePersonaChange}
                placeholder="Software Engineer"
                // @ts-expect-error
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
                // @ts-expect-error
                error={errors["persona.seniority"]}
              />
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div className="mb-4">
              <Label htmlFor="persona.education">Education</Label>
              <Input
                id="persona.education"
                name="education"
                value={data.persona.education}
                onChange={handlePersonaChange}
                placeholder="At least Bachelor of Science in Computer Science"
                // @ts-expect-error
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
          </>
        );
      case 3:
        return (
          <>
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
                // @ts-expect-error
                error={errors["persona.languages_spoken"]}
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="persona.nationality">
                Nationality (optional)
              </Label>
              <Input
                type="text"
                id="persona.nationality"
                name="nationality"
                value={data.persona.nationality}
                onChange={handlePersonaChange}
                // @ts-expect-error
                error={errors["persona.nationality"]}
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="persona.additional_info">
                Additional Information
              </Label>
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
    }
  };

  return (
    <div className="min-h-[calc(100vh-129px)] flex flex-col items-center justify-center">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <PlusCircle className="h-16 w-16 text-gray-400" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          No positions yet
        </h2>
        <p className="text-gray-500 max-w-md mx-auto">
          Create your first position to start finding the perfect candidate.
          Fill in the details below to get started.
        </p>
      </div>
      <Card className="md:w-1/3 my-8">
        <CardHeader>
          <CardTitle className="text-center block mb-4">
            Create a new position
          </CardTitle>
          <div className="flex justify-center space-x-4">
            {[1, 2, 3].map(stepNumber => (
              <div
                key={stepNumber}
                className={`w-2 h-2 rounded-full ${
                  step >= stepNumber ? "bg-primary" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            {renderStep()}
            <div className="flex justify-between mt-6">
              {step > 1 && (
                <Button type="button" variant="outline" onClick={prevStep}>
                  Previous
                </Button>
              )}
              {step < 3 ? (
                <Button
                  type="button"
                  className={`${step === 1 ? "w-full" : ""}`}
                  onClick={nextStep}
                >
                  Next
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={processing}
                  className={`${step === 1 ? "w-full" : ""}`}
                >
                  Create Position
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

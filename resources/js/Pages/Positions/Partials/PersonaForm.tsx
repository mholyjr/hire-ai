import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import React from "react";

type Props = {
  data: any;
  setData: any;
};

export const PersonaForm = ({ data, setData }: Props) => (
  <>
    <Input
      type="text"
      name="title"
      label="Position"
      value={data.persona.position}
      onChange={e =>
        setData("persona", { ...data.persona, position: e.target.value })
      }
    />
    <Input
      type="text"
      name="work_experience"
      label="Work Experience"
      value={data.persona.work_experience}
      onChange={e =>
        setData("persona", {
          ...data.persona,
          work_experience: e.target.value,
        })
      }
    />
    <Input
      type="text"
      name="education"
      label="Education"
      value={data.persona.education}
      onChange={e =>
        setData("persona", { ...data.persona, education: e.target.value })
      }
    />
    <Input
      type="text"
      name="seniority"
      label="Seniority"
      value={data.persona.seniority}
      onChange={e =>
        setData("persona", { ...data.persona, seniority: e.target.value })
      }
    />
    <Input
      type="text"
      name="nationality"
      label="Nationality"
      value={data.persona.nationality}
      onChange={e =>
        setData("persona", { ...data.persona, nationality: e.target.value })
      }
    />
    <Input
      type="text"
      name="languages_spoken"
      label="Languages Spoken"
      value={data.persona.languages_spoken}
      onChange={e =>
        setData("persona", {
          ...data.persona,
          languages_spoken: e.target.value,
        })
      }
    />
    <Input
      type="text"
      name="additional_info"
      label="Additional Info"
      value={data.persona.additional_info}
      onChange={e =>
        setData("persona", {
          ...data.persona,
          additional_info: e.target.value,
        })
      }
    />
  </>
);

import { useForm } from "@inertiajs/react";
import React from "react";
import useRoute from "@/Hooks/useRoute";
import useTypedPage from "@/Hooks/useTypedPage";
import ActionMessage from "@/Components/ActionMessage";
import FormSection from "@/Components/FormSection";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import classNames from "classnames";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";

export default function CreateTeamForm() {
  const route = useRoute();
  const page = useTypedPage();
  const form = useForm({
    name: "",
  });

  function createTeam() {
    form.post(route("teams.store"), {
      errorBag: "createTeam",
      preserveScroll: true,
    });
  }

  return (
    <FormSection
      onSubmit={createTeam}
      title={"Team Details"}
      description={"Create a new team to collaborate with others on projects."}
      renderActions={() => (
        <>
          <ActionMessage on={form.recentlySuccessful}>Saved.</ActionMessage>

          <Button disabled={form.processing}>Save</Button>
        </>
      )}
    >
      <div className="col-span-6">
        <InputLabel value="Team Owner" />

        <div className="flex items-center mt-2">
          <img
            className="w-12 h-12 rounded-full object-cover"
            src={page.props.auth.user?.profile_photo_url}
            alt={page.props.auth.user?.name}
          />

          <div className="ml-4 leading-tight">
            <div className="text-gray-900 dark:text-white">
              {page.props.auth.user?.name}
            </div>
            <div className="text-gray-700 dark:text-gray-300 text-sm">
              {page.props.auth.user?.email}
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-6 sm:col-span-4">
        <Input
          id="name"
          label="Team Name"
          type="text"
          className="mt-1 block w-full"
          value={form.data.name}
          onChange={e => form.setData("name", e.currentTarget.value)}
          error={form.errors.name}
          autoFocus
        />
      </div>
    </FormSection>
  );
}

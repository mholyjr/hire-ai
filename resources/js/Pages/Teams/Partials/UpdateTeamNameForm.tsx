import useRoute from "@/Hooks/useRoute";
import ActionMessage from "@/Components/ActionMessage";
import FormSection from "@/Components/FormSection";
import InputLabel from "@/Components/InputLabel";
import { JetstreamTeamPermissions, Team, User } from "@/types";
import { useForm } from "@inertiajs/react";
import classNames from "classnames";
import React from "react";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";

interface Props {
  team: Team & { owner: User };
  permissions: JetstreamTeamPermissions;
}

export default function UpdateTeamNameForm({ team, permissions }: Props) {
  const route = useRoute();
  const form = useForm({
    name: team.name,
  });

  function updateTeamName() {
    form.put(route("teams.update", [team]), {
      errorBag: "updateTeamName",
      preserveScroll: true,
    });
  }

  return (
    <FormSection
      onSubmit={updateTeamName}
      title={"Team Name"}
      description={`The team's name and owner information.`}
      renderActions={
        permissions.canUpdateTeam
          ? () => (
              <div className="flex gap-3 items-center">
                {form.recentlySuccessful && (
                  <ActionMessage on={form.recentlySuccessful}>
                    Saved.
                  </ActionMessage>
                )}

                <Button
                  className={classNames({ "opacity-25": form.processing })}
                  disabled={form.processing}
                >
                  Save
                </Button>
              </div>
            )
          : undefined
      }
    >
      {/* <!-- Team Owner Information --> */}
      <div className="col-span-6">
        <InputLabel value="Team Owner" />

        <div className="flex items-center mt-2">
          <img
            className="w-12 h-12 rounded-full object-cover"
            src={team.owner.profile_photo_url}
            alt={team.owner.name}
          />

          <div className="ml-4 leading-tight">
            <div className="text-gray-900 dark:text-white">
              {team.owner.name}
            </div>
            <div className="text-gray-700 dark:text-gray-300 text-sm">
              {team.owner.email}
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Team Name --> */}
      <div className="col-span-6 sm:col-span-4">
        <Input
          label="Team Name"
          id="name"
          type="text"
          className="mt-1 block w-full"
          value={form.data.name}
          onChange={e => form.setData("name", e.currentTarget.value)}
          disabled={!permissions.canUpdateTeam}
          error={form.errors.name}
        />
      </div>
    </FormSection>
  );
}

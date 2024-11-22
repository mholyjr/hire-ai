import CreateTeamForm from "@/Pages/Teams/Partials/CreateTeamForm";
import AppLayout from "@/Layouts/AppLayout";
import React from "react";
import { Header } from "@/Components/Header";

export default function Create() {
  return (
    <AppLayout
      title="Create Team"
      renderHeader={() => (
        <Header title="Create Team" />
      )}
    >
      <div>
        <div className="mx-auto py-10 ">
          <CreateTeamForm />
        </div>
      </div>
    </AppLayout>
  );
}

import React from "react";
import AppLayout from "@/Layouts/AppLayout";
import { usePage } from "@inertiajs/react";
import { Project } from "@/types";
import { ProjectList } from "@/features/Dashboard/components/ProjectList";

export default function Dashboard() {
  const { projects = [] } = usePage().props as { projects?: Project[] };

  console.log(projects);

  return (
    <AppLayout
      title="Dashboard"
      renderHeader={() => (
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Dashboard
        </h2>
      )}
    >
      <ProjectList projects={projects} />
    </AppLayout>
  );
}

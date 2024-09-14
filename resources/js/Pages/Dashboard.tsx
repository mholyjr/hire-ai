import React from "react";
import AppLayout from "@/Layouts/AppLayout";
import { usePage } from "@inertiajs/react";
import { Project } from "@/types";
import { ProjectList } from "@/features/Dashboard/components/ProjectList";
import { Header } from "@/Components/Header";
import { NewProjectDialog } from "@/features/Dashboard/components/ProjectList/parts/NewProjectDialog";


export default function Dashboard() {
  const { projects = [] } = usePage().props as { projects?: Project[] };

  const [view, setView] = React.useState("table");
  const [search, setSearch] = React.useState("");
  const [filters, setFilters] = React.useState({
    state: null,
  });

  React.useEffect(() => {
    const storedView = localStorage.getItem("projectsView") || "table";
    const storedFilters = JSON.parse(
      localStorage.getItem("projectsFilters") || "{}",
    );
    setView(storedView as "table" | "grid");
    setFilters(storedFilters);
  }, []);

  React.useEffect(() => {
    localStorage.setItem("projectsView", view);
    localStorage.setItem("projectsFilters", JSON.stringify(filters));
  }, [view, filters]);

  const filteredProjects = projects.filter(project => {
    if (filters.state !== undefined && filters.state !== null) {
      const stateFilter = Number(filters.state);
      if (project.state !== stateFilter) return false;
    }

    // Search filter
    if (search.trim() !== "") {
      const searchLower = search.toLowerCase().trim();
      return (
        project.title.toLowerCase().includes(searchLower) ||
        (project.description &&
          project.description.toLowerCase().includes(searchLower))
      );
    }

    return true;
  });

  return (
    <AppLayout
      title="Dashboard"
      renderHeader={() => (
        <Header
          view={view}
          setView={setView}
          search={search}
          setSearch={setSearch}
          filters={filters}
          setFilters={setFilters}
          newItemModal={<NewProjectDialog />}
          title="Projects"
        />
      )}
    >
      <ProjectList filteredProjects={filteredProjects} view={view} />
    </AppLayout>
  );
}

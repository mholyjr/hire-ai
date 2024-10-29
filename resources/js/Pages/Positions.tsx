import React from "react";
import AppLayout from "@/Layouts/AppLayout";
import { usePage } from "@inertiajs/react";
import { Position } from "@/types";
import { ProjectList } from "@/features/Dashboard/components/ProjectList";
import { Header } from "@/Components/Header";
import { NewPositionDialog } from "@/features/Positions/Partials/NewPositionDialog";

export default function Positions() {
  const { positions = [] } = usePage().props as { positions?: Position[] };

  const [view, setView] = React.useState("table");
  const [search, setSearch] = React.useState("");
  const [filters, setFilters] = React.useState({
    state: null,
  });

  React.useEffect(() => {
    const storedView = localStorage.getItem("positionsView") || "table";
    const storedFilters = JSON.parse(
      localStorage.getItem("positionsFilters") || "{}",
    );
    setView(storedView as "table" | "grid");
    setFilters(storedFilters);
  }, []);

  React.useEffect(() => {
    localStorage.setItem("positionsView", view);
    localStorage.setItem("positionsFilters", JSON.stringify(filters));
  }, [view, filters]);

  const filteredPositions = positions.filter(position => {
    if (filters.state !== undefined && filters.state !== null) {
      const stateFilter = Number(filters.state);
      if (position.state !== stateFilter) return false;
    }

    // Search filter
    if (search.trim() !== "") {
      const searchLower = search.toLowerCase().trim();
      return (
        position.title.toLowerCase().includes(searchLower) ||
        (position.description &&
          position.description.toLowerCase().includes(searchLower))
      );
    }

    return true;
  });

  return (
    <AppLayout
      title="Positions"
      renderHeader={() => (
        <Header
          type="list"
          view={view}
          setView={setView}
          search={search}
          setSearch={setSearch}
          filters={filters}
          setFilters={setFilters}
          newItemModal={<NewPositionDialog />}
          title="Positions"
        />
      )}
    >
      <ProjectList filteredProjects={filteredPositions} view={view} />
    </AppLayout>
  );
}

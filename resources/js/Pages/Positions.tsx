import React from "react";
import AppLayout from "@/Layouts/AppLayout";
import { usePage } from "@inertiajs/react";
import { Position } from "@/types";
import { ProjectList } from "@/features/Dashboard/components/ProjectList";
import { Header } from "@/Components/Header";
import { NewPositionDialog } from "@/features/Positions/Partials/NewPositionDialog";
import { EmptyPositions } from "./Positions/Partials/EmptyPositions";

export default function Positions() {
  const { positions = [] } = usePage().props as { positions?: Position[] };

  const [view, setView] = React.useState("table");
  const [search, setSearch] = React.useState("");
  const [filters, setFilters] = React.useState({
    state: null,
  });

  return (
    <AppLayout
      title="Positions"
      renderHeader={() =>
        positions.length !== 0 ? (
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
        ) : (
          <></>
        )
      }
    >
      {positions.length === 0 && <EmptyPositions />}
      {positions.length !== 0 && (
        <ProjectList filteredProjects={positions} view={view} />
      )}
    </AppLayout>
  );
}

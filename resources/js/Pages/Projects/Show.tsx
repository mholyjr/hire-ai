import React from "react";
import AppLayout from "@/Layouts/AppLayout";
import { Project, Position } from "@/types";
import { Link } from "@inertiajs/react";
import { Header } from "@/Components/Header";
import { NewPositionDialog } from "@/features/Positions/Partials/NewPositionDialog";

type Props = {
  project: Project & { positions: Position[] };
};

export default function Index({ project }: Props) {
  const [search, setSearch] = React.useState("");
  const [filters, setFilters] = React.useState({
    state: null,
  });

  return (
    <AppLayout
      title={`${project.title} Positions`}
      renderHeader={() => (
        <Header
          title={`${project.title} Positions`}
          view={"table"}
          search={search}
          setSearch={setSearch}
          filters={filters}
          setFilters={setFilters}
          newItemModal={<NewPositionDialog project={project} />}
        />
      )}
    >
      <div className="py-12 px-6 grid grid-cols-4 gap-6">
        {project.positions.map(position => (
          <Link href={route("positions.show", position.slug)}>
            <div
              key={position.id}
              className="bg-white dark:bg-dark rounded-lg p-6 "
            >
              <h2 className="text-xl font-semibold">{position.title}</h2>
              <p>{position.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </AppLayout>
  );
}

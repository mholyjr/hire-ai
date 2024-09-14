import React from "react";
import AppLayout from "@/Layouts/AppLayout";
import { Project, Position } from "@/types";
import { Link } from "@inertiajs/react";
import { Header } from "@/Components/Header";

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
        />
      )}
    >
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg p-6">
            <h1 className="text-2xl font-bold mb-4">Positions</h1>
            {/* {project.positions.map(position => (
              <div key={position.id} className="mb-4">
                <Link href={route("positions.show", position.slug)}>
                  <h2 className="text-xl font-semibold">{position.title}</h2>
                </Link>
                <p className="text-gray-600">{position.description}</p>
              </div>
            ))} */}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

import React from "react";
import AppLayout from "@/Layouts/AppLayout";
import { usePage } from "@inertiajs/react";
import { Position } from "@/types";
import { ProjectList } from "@/features/Dashboard/components/ProjectList";
import { Header } from "@/Components/Header";
import { NewPositionDialog } from "@/features/Positions/Partials/NewPositionDialog";
import { EmptyPositions } from "./Positions/Partials/EmptyPositions";
import { TeamStatsCharts } from "./Positions/Partials/TeamStatsCharts";

interface PositionsProps {
  positions: Position[];
  teamStats: {
    candidates_data: Array<{ name: string; total: number }>;
    ratings_data: Array<{ name: string; rating: number }>;
  };
}

export default function Positions({ positions, teamStats }: PositionsProps) {
  // const { positions = [] } = usePage().props as { positions?: Position[] };

  return (
    <AppLayout
      title="Positions"
      renderHeader={() => <Header title="Your daily stats" />}
    >
      <div className="grid gap-8">
        <TeamStatsCharts
          candidatesData={teamStats.candidates_data}
          ratingsData={teamStats.ratings_data}
        />
        {positions.length === 0 && <EmptyPositions />}
        {positions.length !== 0 && <ProjectList positions={positions} />}
      </div>
    </AppLayout>
  );
}

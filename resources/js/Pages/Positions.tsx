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

  return (
    <AppLayout
      title="Positions"
      renderHeader={() => (
        <Header title="Your open positions" action={<NewPositionDialog />} />
      )}
    >
      {positions.length === 0 && <EmptyPositions />}
      {positions.length !== 0 && <ProjectList positions={positions} />}
    </AppLayout>
  );
}

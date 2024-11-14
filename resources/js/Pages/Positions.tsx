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
    <AppLayout title="Positions" renderHeader={() => <></>}>
      {positions.length === 0 && <EmptyPositions />}
      {positions.length !== 0 && (
        <div className="px-32 pt-20">
          <div className="flex justify-between items-center mb-12">
            <h1 className="text-2xl font-bold ">Your Open Positions</h1>
            <NewPositionDialog />
          </div>
          <ProjectList positions={positions} />
        </div>
      )}
    </AppLayout>
  );
}

import React from "react";
import { Head } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import { Candidate, PageProps } from "@/types";
import { CandidateDetail } from "./Partials/CandidateDetail";
import { NotesPanel } from "./Partials/NotesPanel";

interface Props extends PageProps {
  candidate: Candidate;
}

export default function Show({ candidate }: Props) {
  return (
    <AppLayout title="Candidate">
      <Head title={`Candidate: ${candidate.name}`} />

      <div className="py-12 grid grid-cols-1 gap-2 lg:grid-cols-4 lg:gap-8">
        <div>
          <NotesPanel
            candidateId={candidate.id}
            initialNotes={candidate.notes}
          />
        </div>
        <div className="lg:col-span-3">
          <CandidateDetail candidate={candidate} />
        </div>
      </div>
    </AppLayout>
  );
}

import React from "react";
import { Head, Link } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import { Candidate, PageProps } from "@/types";
import { CandidateDetail } from "./Partials/CandidateDetail";
import { NotesPanel } from "./Partials/NotesPanel";
import { Button } from "@/Components/ui/button";

interface Props extends PageProps {
  candidate: Candidate;
}

export default function Show({ candidate }: Props) {
  return (
    <AppLayout title="Candidate">
      <Head title={`Candidate: ${candidate.name}`} />
      <div className="mt-12 mb-8 flex gap-4 items-center justify-start">
        <Link href={route("positions.show", candidate.position.slug)}>
          <Button>Back to position</Button>
        </Link>
        <h2 className="font-bold m-0 text-xl">{candidate.position.title}</h2>
      </div>
      <div className="pb-12 grid grid-cols-1 gap-2 lg:grid-cols-4 lg:gap-8">
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

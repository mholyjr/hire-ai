import React from "react";
import { Head } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import { Candidate, PageProps } from "@/types";
import { CandidateDetail } from "./Partials/CandidateDetail";

interface Props extends PageProps {
  candidate: Candidate;
}

export default function Show({ candidate }: Props) {
  return (
    <AppLayout title="Candidate">
      <Head title={`Candidate: ${candidate.name}`} />

      <div className="py-12">
        <CandidateDetail candidate={candidate} />
      </div>
    </AppLayout>
  );
}

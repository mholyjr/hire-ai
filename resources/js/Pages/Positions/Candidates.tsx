import React from "react";
import { Position, Candidate } from "@/types";
import PositionLayout from "@/Layouts/PositionLayout";
import { LayoutSidebar } from "./Partials/LayoutSidebar";
import { Input } from "@/Components/ui/input";
import { router, useForm } from "@inertiajs/react";
import { CandidateItem } from "./Partials/CandidateItem";

interface Props {
  position: Position;
  candidatesByState: {
    SHORT_LIST: Candidate[];
    MAYBE: Candidate[];
    REJECTED: Candidate[];
  };
  filters: {
    search: string;
    state: string | null;
  };
}

export default function Candidates({
  position,
  candidatesByState,
  filters,
}: Props) {
  const { data, setData } = useForm({
    search: filters.search || "",
  });

  const handleFiltersChange = (newData: typeof data) => {
    setData(newData);
    router.get(
      route("positions.candidates", position.slug),
      { ...newData },
      { preserveState: true, preserveScroll: true },
    );
  };

  return (
    <PositionLayout
      title={`${position.title} - Candidates`}
      sidebar={<LayoutSidebar positions={[]} position={position} />}
    >
      <div className="space-y-8 p-8">
        <div className="flex gap-4">
          <Input
            placeholder="Search candidates..."
            value={data.search}
            onChange={e =>
              handleFiltersChange({ ...data, search: e.target.value })
            }
            className="max-w-sm"
          />
        </div>

        {/* Short List Section */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Short List</h2>
          <div className="grid gap-8 grid-cols-2">
            {candidatesByState.SHORT_LIST.map(candidate => (
              <CandidateItem key={candidate.id} candidate={candidate} />
            ))}
          </div>
        </div>

        {/* Maybe Section */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Maybe</h2>
          <div className="grid gap-8 grid-cols-2">
            {candidatesByState.MAYBE.map(candidate => (
              <CandidateItem key={candidate.id} candidate={candidate} />
            ))}
          </div>
        </div>

        {/* Rejected Section */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Rejected</h2>
          <div className="grid gap-8 grid-cols-2">
            {candidatesByState.REJECTED.map(candidate => (
              <CandidateItem key={candidate.id} candidate={candidate} />
            ))}
          </div>
        </div>
      </div>
    </PositionLayout>
  );
}

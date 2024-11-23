import { FilterSelect } from "@/Components/ui/filter-select";
import { Input } from "@/Components/ui/input";
import { candidateStateValues } from "@/Constants";
import { useQueryFilter } from "@/Hooks/useQueryFilter";
import React from "react";

type Props = {
  filters: {
    search: string;
    position: string;
    state: string;
  };
  positions: { id: number; title: string }[];
};

export const FiltersRow: React.FC<Props> = ({ filters, positions }) => {
  const { updateQueryParam } = useQueryFilter();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 gap-2 lg:gap-8 mb-4">
      <div className="lg:col-span-4">
        <Input
          placeholder="Search by name or email..."
          defaultValue={filters.search}
          onChange={e => updateQueryParam("search", e.target.value)}
          className="w-full"
        />
      </div>
      <FilterSelect
        options={positions.map(position => ({
          id: position.id,
          value: position.id.toString(),
          label: position.title,
        }))}
        placeholder="Filter by position"
        filterKey="position"
        defaultValue={filters.position || "all"}
      />
      <FilterSelect
        options={candidateStateValues.map(state => ({
          value: state,
          label: state,
        }))}
        placeholder="Filter by state"
        filterKey="state"
        defaultValue={filters.state || "all"}
      />
    </div>
  );
};

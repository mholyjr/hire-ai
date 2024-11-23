import React from "react";
import { router } from "@inertiajs/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { useQueryFilter } from "@/Hooks/useQueryFilter";

interface FilterSelectProps {
  options: Array<{ id?: string | number; value: string; label: string }>;
  placeholder: string;
  filterKey: string;
  defaultValue?: string;
}

export function FilterSelect({
  options,
  placeholder,
  filterKey,
  defaultValue = "all",
}: FilterSelectProps) {
  const { updateQueryParam } = useQueryFilter();

  return (
    <Select
      defaultValue={defaultValue}
      onValueChange={value =>
        updateQueryParam(filterKey, value === "all" ? "" : value)
      }
    >
      <SelectTrigger className="border-gray-200 h-10 bg-white px-3 py-2 text-sm ring-offset-white dark:border-gray-800 dark:bg-gray-950 dark:ring-offset-gray-950">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">{placeholder}</SelectItem>
        {options.map(option => (
          <SelectItem
            key={option.id || option.value}
            value={option.id?.toString() || option.value}
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

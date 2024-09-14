import React from "react";
import { Input } from "@/Components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/Components/ui/dropdown-menu";
import { Button } from "@/Components/ui/button";
import { FilterIcon, SearchIcon, ViewIcon } from "lucide-react";
import { TODO } from "@/types";

type Props = {
  view: string;
  setView?: (view: string) => void;
  search: string;
  setSearch: (search: string) => void;
  filters: TODO;
  setFilters: (filters: TODO) => void;
  newItemModal?: React.ReactNode;
  title: string;
};

export const Header: React.FC<Props> = ({
  view,
  setView,
  search,
  setSearch,
  filters,
  setFilters,
  newItemModal,
  title,
}) => (
  <header className="flex items-center justify-between h-16 px-6 border-b bg-background">
    <h1 className="text-lg font-semibold">{title}</h1>
    <div className="flex items-center gap-4">
      {setView && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <ViewIcon className="h-4 w-4" />
              <span className="sr-only sm:not-sr-only">
                {view === "table" ? "Grid" : "Table"} View
              </span>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem onSelect={() => setView("table")}>
              Table View
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setView("grid")}>
              Grid View
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      <div className="relative flex-1 max-w-md">
        <Input
          type="search"
          placeholder="Search projects..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full rounded-lg bg-background pl-8"
        />
        <SearchIcon className="absolute left-2 top-2 h-4 w-4 text-muted-foreground" />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="h-8 gap-1">
            <FilterIcon className="h-4 w-4" />
            <span className="sr-only sm:not-sr-only">Filter</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuLabel>Filter by status</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={String(filters.state)}
            onValueChange={value =>
              setFilters({
                ...filters,
                state: value === "all" ? null : Number(value),
              })
            }
          >
            <DropdownMenuRadioItem value="all">All</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="1">Active</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="0">Archived</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      {newItemModal && newItemModal}
    </div>
  </header>
);

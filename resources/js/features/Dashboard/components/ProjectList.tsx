"use client";

import React, { useState, useEffect } from "react";
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
import { Input } from "@/Components/ui/input";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/Components/ui/dialog";
import { Textarea } from "@/Components/ui/textarea";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/Components/ui/table";
import { Badge } from "@/Components/ui/badge";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/Components/ui/card";
import { TODO } from "@/types";

export const ProjectList = () => {
  const [view, setView] = useState("table");
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    status: "all",
  });

  useEffect(() => {
    const storedView = localStorage.getItem("projectsView") || "table";
    const storedFilters = JSON.parse(
      localStorage.getItem("projectsFilters") || "{}",
    );
    setView(storedView as "table" | "grid");
    setFilters(storedFilters);
  }, []);

  useEffect(() => {
    localStorage.setItem("projectsView", view);
    localStorage.setItem("projectsFilters", JSON.stringify(filters));
  }, [view, filters]);

  const projects = [
    {
      id: 1,
      name: "Acme Website",
      status: "active",
      description: "Redesign and rebuild the Acme company website.",
      dueDate: "2023-12-31",
    },
    {
      id: 2,
      name: "Marketing Campaign",
      status: "active",
      description:
        "Plan and execute a new marketing campaign for the product launch.",
      dueDate: "2023-11-15",
    },
    {
      id: 3,
      name: "Mobile App Development",
      status: "in-progress",
      description: "Develop a new mobile app for the company.",
      dueDate: "2024-03-01",
    },
    {
      id: 4,
      name: "Analytics Dashboard",
      status: "in-progress",
      description: "Build a new analytics dashboard for the sales team.",
      dueDate: "2024-02-28",
    },
    {
      id: 5,
      name: "HR System Upgrade",
      status: "archived",
      description: "Upgrade the HR management system to the latest version.",
      dueDate: "2023-09-30",
    },
    {
      id: 6,
      name: "Customer Support Portal",
      status: "active",
      description: "Develop a new customer support portal for the company.",
      dueDate: "2024-01-15",
    },
  ];

  const filteredProjects = projects.filter(project => {
    if (filters.status !== "all" && project.status !== filters.status) {
      return false;
    }
    if (
      search.trim() !== "" &&
      !project.name.toLowerCase().includes(search.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="flex flex-col w-full min-h-screen bg-muted/40">
      <header className="flex items-center justify-between h-16 px-6 border-b bg-background">
        <h1 className="text-lg font-semibold">Projects</h1>
        <div className="flex items-center gap-4">
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
                value={filters.status}
                onValueChange={value =>
                  setFilters({ ...filters, status: value })
                }
              >
                <DropdownMenuRadioItem value="all">All</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="active">
                  Active
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="in-progress">
                  In Progress
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="archived">
                  Archived
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className="h-8">
                <PlusIcon className="h-4 w-4" />
                <span className="sr-only sm:not-sr-only">New Project</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Project</DialogTitle>
                <DialogDescription>
                  Fill out the form to create a new project.
                </DialogDescription>
              </DialogHeader>
              <div>
                <form className="grid gap-4">
                  <Input
                    label="Project Name"
                    placeholder="Enter project name"
                  />
                  <Textarea
                    label="Description"
                    placeholder="Enter project description"
                  />
                  <Input label="Due Date" type="date" />
                </form>
              </div>
              <DialogFooter>
                <div>
                  <Button variant="ghost">Cancel</Button>
                </div>
                <Button>Create Project</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </header>
      <main className="flex-1 p-6">
        {view === "table" ? (
          <div className="border rounded-lg bg-background">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden sm:table-cell">
                    Description
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Due Date
                  </TableHead>
                  <TableHead className="hidden sm:table-cell">Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProjects.map(project => (
                  <TableRow key={project.id}>
                    <TableCell className="font-medium">
                      {project.name}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {project.description}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {project.dueDate}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge
                        variant={
                          project.status === "active" ? "secondary" : "outline"
                        }
                      >
                        {project.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="ml-auto"
                          >
                            <MoveHorizontalIcon className="h-4 w-4" />
                            <span className="sr-only">Project actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Open</DropdownMenuItem>
                          {project.status !== "archived" && (
                            <DropdownMenuItem>Archive</DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProjects.map(project => (
              <Card key={project.id}>
                <CardHeader className="flex items-center justify-between">
                  <div className="font-medium">{project.name}</div>
                  <Badge
                    variant={
                      project.status === "active" ? "secondary" : "outline"
                    }
                  >
                    {project.status}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-2">{project.description}</p>
                  <div className="text-sm text-muted-foreground">
                    Due: {project.dueDate}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon">
                    <FilePenIcon className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button variant="ghost" size="icon">
                    <DoorOpenIcon className="h-4 w-4" />
                    <span className="sr-only">Open</span>
                  </Button>
                  {project.status !== "archived" && (
                    <Button variant="ghost" size="icon">
                      <ArchiveIcon className="h-4 w-4" />
                      <span className="sr-only">Archive</span>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

function ArchiveIcon(props: TODO) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="5" x="2" y="3" rx="1" />
      <path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8" />
      <path d="M10 12h4" />
    </svg>
  );
}

function DoorOpenIcon(props: TODO) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M13 4h3a2 2 0 0 1 2 2v14" />
      <path d="M2 20h3" />
      <path d="M13 20h9" />
      <path d="M10 12v.01" />
      <path d="M13 4.562v16.157a1 1 0 0 1-1.242.97L5 20V5.562a2 2 0 0 1 1.515-1.94l4-1A2 2 0 0 1 13 4.561Z" />
    </svg>
  );
}

function FilePenIcon(props: TODO) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
    </svg>
  );
}

function FilterIcon(props: TODO) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );
}

function LayoutGridIcon(props: TODO) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="7" height="7" x="3" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="14" rx="1" />
      <rect width="7" height="7" x="3" y="14" rx="1" />
    </svg>
  );
}

function MoveHorizontalIcon(props: TODO) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="18 8 22 12 18 16" />
      <polyline points="6 8 2 12 6 16" />
      <line x1="2" x2="22" y1="12" y2="12" />
    </svg>
  );
}

function PlusIcon(props: TODO) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function SearchIcon(props: TODO) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function ViewIcon(props: TODO) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12s2.545-5 7-5c4.454 0 7 5 7 5s-2.546 5-7 5c-4.455 0-7-5-7-5z" />
      <path d="M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
      <path d="M21 17v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2" />
      <path d="M21 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2" />
    </svg>
  );
}

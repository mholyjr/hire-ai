"use client";

import * as React from "react";
import { Check, ChevronsUpDown, Briefcase } from "lucide-react";
import { Link } from "@inertiajs/react";
import { Position } from "@/types";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/Components/ui/sidebar";

interface Props {
  positions: Position[];
  currentPosition?: Position;
}

export function PositionSwitcher({ positions, currentPosition }: Props) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-sidebar-primary-foreground">
                <Briefcase className="size-4" />
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-semibold">Positions</span>
                <span className="text-sm truncate max-w-[150px]">
                  {currentPosition?.title || "Select a position"}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width]"
            align="start"
          >
            {positions.map(position => (
              <DropdownMenuItem key={position.id} asChild>
                <Link href={route("positions.show", position.slug)}>
                  <span className="flex items-center w-full">
                    {position.title}
                    {currentPosition?.id === position.id && (
                      <Check className="ml-auto h-4 w-4" />
                    )}
                  </span>
                </Link>
              </DropdownMenuItem>
            ))}

            <DropdownMenuItem asChild>
              <Link
                href={route("positions.list")}
                className="text-muted-foreground hover:text-foreground border-t mt-2 pt-2"
              >
                View all positions
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

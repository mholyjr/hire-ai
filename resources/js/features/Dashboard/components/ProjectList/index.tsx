"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/Components/ui/dropdown-menu";
import { Button } from "@/Components/ui/button";
import { Badge } from "@/Components/ui/badge";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/Components/ui/card";
import { Position, TODO } from "@/types";
import { useForm } from "@inertiajs/react";
import { Link } from "@inertiajs/react";
import { Settings, Star } from "lucide-react";

type Props = {
  positions: Position[];
};

const ItemCard = ({
  position,
  archivePosition,
}: {
  position: Position;
  archivePosition: (position: Position) => void;
}) => {
  return (
    <Card key={position.id} className="hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="capitalize text-2xl">
          <Link href={route("positions.show", position.slug)}>
            {position.title}
          </Link>
        </CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="m-0 !mt-0">
              <Settings size={20} />
              <span className="sr-only">Project actions</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={route("positions.show", position.slug)}>Open</Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => archivePosition(position)}>
              {position.state ? "Archive" : "Unarchive"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <Link href={route("positions.show", position.slug)}>
          <span className="text-sm text-muted-foreground block mb-6">
            {position.description}
          </span>
          {/* <span className="text-xs text-muted-foreground mb-4 block">
            Created: {new Date(position.created_at).toLocaleDateString()}
          </span> */}
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <Star className="w-5 h-5 text-yellow-400 mr-1 fill-current" />
              <span className="font-semibold">
                {position.avg_rating.toFixed(1)}
              </span>
              <span className="text-sm text-muted-foreground ml-1">
                avg. rating
              </span>
            </div>
            <Badge variant="secondary">
              {position.num_of_candidates} candidates
            </Badge>
          </div>
        </Link>
      </CardContent>
    </Card>
  );
};

export const ProjectList: React.FC<Props> = ({ positions }) => {
  const form = useForm();

  const archivePosition = (position: Position) => {
    form.patch(route("positions.archive", position.id), {
      preserveState: true,
      preserveScroll: true,
    });
  };

  return (
    <div className="flex flex-col w-full">
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {positions.map(position => {
          return (
            <ItemCard
              key={position.id}
              position={position}
              archivePosition={archivePosition}
            />
          );
        })}
      </main>
    </div>
  );
};

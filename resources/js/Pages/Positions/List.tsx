import React from "react";
import AppLayout from "@/Layouts/AppLayout";
import { Position } from "@/types";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/Components/ui/pagination";
import { Link, useForm } from "@inertiajs/react";
import { Header } from "@/Components/Header";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import dayjs from "dayjs";
import { NewPositionDialog } from "@/features/Positions/Partials/NewPositionDialog";
import { Button } from "@/Components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { EllipsisVerticalIcon } from "lucide-react";

interface PositionsProps {
  positions: {
    data: Position[];
    links: any[];
    current_page: number;
    last_page: number;
  };
}

export default function List({ positions }: PositionsProps) {
  const renderPaginationItems = React.useMemo(() => {
    return positions.links.map((link, index) => {
      if (!link.url && !link.active) return null;

      // Handle previous link
      if (index === 0) {
        return (
          <PaginationItem key={index}>
            <PaginationPrevious
              href={link.url}
              className={`${!link.url && "pointer-events-none opacity-50"}`}
            />
          </PaginationItem>
        );
      }

      // Handle next link
      if (index === positions.links.length - 1) {
        return (
          <PaginationItem key={index}>
            <PaginationNext
              href={link.url}
              className={`${!link.url && "pointer-events-none opacity-50"}`}
            />
          </PaginationItem>
        );
      }

      // Handle numbered pages with ellipsis
      const pageNumber = parseInt(link.label);
      const currentPage = positions.current_page;
      const lastPage = positions.last_page;

      // Always show first page, last page, current page, and pages around current page
      if (
        pageNumber === 1 ||
        pageNumber === lastPage ||
        Math.abs(pageNumber - currentPage) <= 1 ||
        link.active
      ) {
        return (
          <PaginationItem key={index}>
            <PaginationLink href={link.url} isActive={link.active}>
              {link.label}
            </PaginationLink>
          </PaginationItem>
        );
      }

      // Add ellipsis after first page if there's a gap
      if (pageNumber === 2 && currentPage > 4) {
        return <PaginationEllipsis key={index} />;
      }

      // Add ellipsis before last page if there's a gap
      if (pageNumber === lastPage - 1 && currentPage < lastPage - 3) {
        return <PaginationEllipsis key={index} />;
      }

      return null;
    });
  }, [positions.links, positions.current_page, positions.last_page]);

  const form = useForm();

  const archivePosition = (position: Position) => {
    form.patch(route("positions.archive", position.id), {
      preserveState: true,
      preserveScroll: true,
    });
  };

  const renderTableRows = React.useMemo(
    () =>
      positions.data.map(position => (
        <TableRow key={position.id}>
          <TableCell>
            <Link href={route("positions.show", position.slug)}>
              <span className="font-semibold block">{position.title}</span>
              <span className="text-muted-foreground">
                {position.description}
              </span>
            </Link>
          </TableCell>
          <TableCell>{position.avg_rating.toFixed(1)}</TableCell>
          <TableCell>{position.num_of_candidates}</TableCell>
          <TableCell>
            {dayjs(position.created_at).format("MMM D, YYYY h:mm A")}
          </TableCell>
          <TableCell className="flex justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="m-0 !mt-0">
                  <EllipsisVerticalIcon size={20} />
                  <span className="sr-only">Project actions</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href={route("positions.show", position.slug)}>
                    Show detail
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => archivePosition(position)}>
                  {position.state ? "Close position" : "Open position"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </TableRow>
      )),
    [positions],
  );

  return (
    <AppLayout
      title="Dashboard"
      renderHeader={() => (
        <Header title="Open positions" action={<NewPositionDialog />} />
      )}
    >
      <Card>
        <CardHeader>
          <CardTitle>List of all positions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50%]">Position</TableHead>
                <TableHead className="w-[10%]">Avg rating</TableHead>
                <TableHead className="w-[12%]"># of positions</TableHead>
                <TableHead className="w-[15%]">Created</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>{renderTableRows}</TableBody>
          </Table>
        </CardContent>
      </Card>
      <div className="mt-6">
        <Pagination>
          <PaginationContent>{renderPaginationItems}</PaginationContent>
        </Pagination>
      </div>
    </AppLayout>
  );
}

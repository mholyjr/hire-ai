import React from "react";
import { Candidate, Position } from "@/types";
import AppLayout from "@/Layouts/AppLayout";
import { PageProps } from "@inertiajs/inertia";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/Components/ui/pagination";
import { Link } from "@inertiajs/react";
import { Header } from "@/Components/Header";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import { Badge } from "@/Components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import dayjs from "dayjs";

interface CandidateData extends Candidate {
  position: Position;
}

interface Props extends PageProps {
  candidates: {
    data: CandidateData[];
    links: any[];
    current_page: number;
    last_page: number;
  };
}

type VariantProps = Record<
  string,
  "default" | "destructive" | "secondary" | "outline" | null | undefined
>;

const variantByState: VariantProps = {
  short_list: "default",
  no: "destructive",
  maybe: "secondary",
  hired: "default",
  rejected: "destructive",
};

export default function Index({ candidates }: Props) {
  const renderPaginationItems = React.useMemo(() => {
    return candidates.links.map((link, index) => {
      // Skip if it's a current page without URL and not the current page
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
      if (index === candidates.links.length - 1) {
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
      const currentPage = candidates.current_page;
      const lastPage = candidates.last_page;

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
  }, [candidates.links, candidates.current_page, candidates.last_page]);
  return (
    <AppLayout
      title="Candidates"
      renderHeader={() => <Header title="Candidates" />}
    >
      <Card>
        <CardHeader>
          <CardTitle>List of all candidates</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>State</TableHead>
                <TableHead>Created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {candidates.data.map(candidate => (
                <TableRow key={candidate.id}>
                  <TableCell>
                    <Link
                      href={route("positions.show", candidate.position.slug)}
                    >
                      {candidate.name}
                    </Link>
                  </TableCell>
                  <TableCell>{candidate.email}</TableCell>
                  <TableCell>
                    <Link
                      href={route("positions.show", candidate.position.slug)}
                    >
                      {candidate.position.title}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Badge variant={variantByState[candidate.state]}>
                      {candidate.state}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {dayjs(candidate.created_at).format("MMM D, YYYY h:mm A")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
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

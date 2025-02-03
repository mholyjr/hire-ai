import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import { Candidate, CandidateState } from "@/types";
import { Link } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useUpdateState } from "../../Hooks/useUpdateState";
import { useAiRating } from "../../Hooks/useAiRating";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Badge } from "@/Components/ui/badge";

type Props = {
  data: Candidate[];
};

const ToggleState = ({
  candidate,
  refetch,
}: {
  candidate: Candidate;
  refetch: any;
}) => {
  const { mutate: updateState } = useUpdateState(candidate.id);

  const values = [
    {
      value: "rejected",
      label: "Reject",
    },
    {
      value: "maybe",
      label: "Maybe",
    },
    {
      value: "short_list",
      label: "Short list",
    },
  ];

  const handleChange = (value: string) => {
    updateState(
      {
        state: value as CandidateState,
      },
      {
        onSuccess: () => {
          refetch();
        },
      },
    );
  };

  const activeOption = values.find(opt => opt.value === candidate.state);
  const activeLabel = activeOption ? activeOption.label : "Select State";

  const getVariant = (value: string) => {
    switch (value) {
      case "rejected":
        return "destructive";
      case "maybe":
        return "secondary";
      case "short_list":
        return "default";
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Badge variant={getVariant(candidate.state)}>
          {activeLabel} <ChevronDown className="ml-2 h-3 w-3" />
        </Badge>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Candidate State</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {values.map(opt => (
          <DropdownMenuItem
            key={opt.value}
            onClick={() => handleChange(opt.value)}
          >
            {opt.label}
            {candidate.state === opt.value && (
              <span className="ml-2 text-green-500 font-bold">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const Row = ({ data }: { data: Candidate }) => {
  const { data: freshData, refetch } = useAiRating(data.id, data);

  return (
    <TableRow>
      <TableCell>
        <span className="font-semibold ">{data.name}</span>
        <br />
        {/* {data.ai_rating?.summary} */}
      </TableCell>
      <TableCell className="">{data.email}</TableCell>
      <TableCell className="font-semibold text-xl">
        {data.ai_rating?.rating}
      </TableCell>
      <TableCell>
        <ToggleState candidate={freshData} refetch={refetch} />
      </TableCell>
      <TableCell className="text-right">
        <Button variant="outline" className="w-full" asChild>
          <Link href={route("candidates.show", data.slug)}>
            View Details
            <ChevronRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </TableCell>
    </TableRow>
  );
};

export const CandidatesTable: React.FC<Props> = ({ data }) => {
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-1/4">Candidate</TableHead>
          <TableHead className="w-1/4">Email</TableHead>
          <TableHead className="w-1/12">Rating</TableHead>
          <TableHead className="w-1/3">Actions</TableHead>
          <TableHead className="text-right w-3"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map(candidate => (
          <Row key={candidate.id} data={candidate} />
        ))}
      </TableBody>
    </Table>
  );
};

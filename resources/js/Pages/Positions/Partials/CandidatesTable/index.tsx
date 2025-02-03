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
import { StarFilledIcon } from "@radix-ui/react-icons";
import { AIProcessing } from "./AIProcessing";

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
        return "maybe";
      case "short_list":
        return "short_list";
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Badge variant={getVariant(candidate.state)} className="truncate">
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
  const truncateText = (text: string, maxLength: number) =>
    text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;

  return (
    <TableRow>
      <TableCell>
        <span className="font-semibold">{data.name}</span>
      </TableCell>
      <TableCell className="truncate">{data.email}</TableCell>
      <TableCell title={data?.ai_rating?.summary}>
        {data.ai_rating?.summary ? (
          truncateText(data.ai_rating.summary, 130)
        ) : (
          <span className="italic">No summary available</span>
        )}
      </TableCell>
      <TableCell className="font-semibold text-xl">
        <span className="flex items-center gap-1">
          <StarFilledIcon /> {data.ai_rating?.rating}
        </span>
      </TableCell>
      <TableCell>
        <ToggleState candidate={freshData} refetch={refetch} />
      </TableCell>
      <TableCell>
        <span className="flex items-center gap-2 w-full justify-end">
          <Button variant="outline" className="w-[100px]" asChild>
            <Link href={route("candidates.show", data.slug)}>View Details</Link>
          </Button>
        </span>
      </TableCell>
    </TableRow>
  );
};

export const CandidatesTable: React.FC<Props> = ({ data }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-1/6">Candidate</TableHead>
          <TableHead className="w-1/6">Email</TableHead>
          <TableHead className="w-1/2">Summary</TableHead>
          <TableHead className="w-1/12">Rating</TableHead>
          <TableHead className="w-1/12">State</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map(candidate => {
          if (!candidate.ai_rating) {
            return (
              <AIProcessing processingMessage="AI is processing the file" />
            );
          }

          return <Row key={candidate.id} data={candidate} />;
        })}
      </TableBody>
    </Table>
  );
};

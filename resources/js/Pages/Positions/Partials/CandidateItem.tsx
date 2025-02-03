import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import { ChevronRight, Loader2, Star } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { Candidate, CandidateState } from "@/types";
import { useAiRating } from "../Hooks/useAiRating";
import { ToggleGroup, ToggleGroupItem } from "@/Components/ui/toggle-group";
import { useUpdateState } from "../Hooks/useUpdateState";
import { Link, router } from "@inertiajs/react";

const CandidateItemSkeleton = () => {
  return (
    <Card className="flex flex-col justify-center items-center p-6">
      <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
      <p className="text-sm text-center text-muted-foreground">
        AI is processing the file
      </p>
    </Card>
  );
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
    console.log("test", value);
    updateState(
      {
        state: value as CandidateState,
      },
      {
        onSuccess: () => {
          refetch();
          router.reload({
            only: ["candidatesByState"],
          });
        },
      },
    );
  };

  return (
    <ToggleGroup
      type="single"
      variant="outline"
      className="justify-start"
      value={candidate.state}
      onValueChange={value => handleChange(value)}
    >
      {values.map(({ value, label }) => (
        <ToggleGroupItem
          key={value}
          value={value}
          className="data-[state=on]:bg-primary data-[state=on]:text-white"
        >
          {label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
};

export const CandidateItem = ({ candidate }: { candidate: Candidate }) => {
  const { data: freshData, refetch } = useAiRating(candidate.id, candidate);

  if (!freshData.ai_rating) {
    return <CandidateItemSkeleton />;
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>{candidate.name}</CardTitle>
        <div className="mt-1 flex items-center">
          <Star className="mr-1 h-4 w-4 fill-primary text-primary" />
          <span className="text-2xl font-medium">
            {candidate.ai_rating?.rating ?? 0}/100
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-xs text-muted-foreground">{candidate.email}</div>
        <div className="mt-2 text-sm">
          <CardDescription>{candidate.ai_rating?.summary}</CardDescription>
        </div>
      </CardContent>
      <CardFooter className="grid grid-cols-2 gap-4">
        <div>
          <ToggleState candidate={freshData} refetch={refetch} />
        </div>
        <div>
          <Link href={route("candidates.show", candidate.slug)}>
            <Button variant="outline" className="w-full">
              View Details
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

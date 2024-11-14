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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/ui/dialog";
import { Button } from "@/Components/ui/button";
import { Candidate } from "@/types";
import { useAiRating } from "../Hooks/useAiRating";
import { CandidateDetail } from "./CandidateDetail";

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

export const CandidateItem = ({ candidate }: { candidate: Candidate }) => {
  const {
    data: freshData,
    isLoading,
    isError,
  } = useAiRating(candidate.id, candidate);

  if (!freshData.ai_rating) {
    return <CandidateItemSkeleton />;
  }
console.log(freshData)
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
      <CardFooter>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full">
              View Details
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>{candidate.name}</DialogTitle>
            </DialogHeader>
            <CandidateDetail candidate={candidate} />
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

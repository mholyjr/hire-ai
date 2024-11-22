import React from "react";
import { Button } from "@/Components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";

type PricingOption = {
  title: string;
  credits: number;
  pricePerCredit: string;
  totalPrice: number;
  purchaseUrl: string;
};

export const PricingCard = ({ option }: { option: PricingOption }) => {
  return (
    <Card className="flex flex-col transition-all duration-200 hover:shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          {option.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-center text-lg mb-2">
          ${option.pricePerCredit} per credit
        </p>
        <p className="text-center text-3xl font-bold">${option.totalPrice}</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full" asChild>
          <a href={option.purchaseUrl}>Buy Now</a>
        </Button>
      </CardFooter>
    </Card>
  );
};

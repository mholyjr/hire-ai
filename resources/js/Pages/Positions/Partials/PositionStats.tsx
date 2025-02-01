import { Card, CardContent, CardHeader } from "@/Components/ui/card";
import clsx from "clsx";
import React from "react";

interface StatItem {
  name: string;
  value: number;
  change: number;
  changeType: "positive" | "negative" | "neutral";
  href: string;
  id: string;
  color: string;
}

interface PositionStatsProps {
  data: StatItem[];
}

export const PositionStats: React.FC<PositionStatsProps> = ({ data }) => {
  return (
    <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {data.map(item => (
        <Card key={item.name}>
          <CardHeader className="flex space-x-3 flex-row">
            <div className={clsx(item.color, "w-1 shrink-0 rounded")} />
            <dt className="flex w-full !mt-0 items-center justify-between truncate text-tremor-default text-tremor-content dark:text-dark-tremor-content">
              <span className="truncate font-medium">{item.name}</span>
            </dt>
          </CardHeader>
          <CardContent>
            <dd className="font-semibold text-3xl pl-4">{item.value}</dd>
          </CardContent>
        </Card>
      ))}
    </dl>
  );
};

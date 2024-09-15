import React from "react";

type Props = {
  title: string;
  message: string;
  action: React.ReactNode;
};

export const Empty = ({ title, message, action }: Props) => {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center gap-6">
      <div className="max-w-md text-center">
        <h2 className="mt-4 text-2xl font-bold">{title}</h2>
        <p className="text-muted-foreground">{message}</p>
      </div>
      {action}
    </div>
  );
};

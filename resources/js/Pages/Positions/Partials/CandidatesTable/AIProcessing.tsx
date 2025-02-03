import { TableCell, TableRow } from "@/Components/ui/table";
import React from "react";

type Props = {
  processingMessage: string;
};

export const AIProcessing: React.FC<Props> = ({ processingMessage }) => {
  return (
    <TableRow className="bg-secondary">
      <TableCell colSpan={6} className="text-center py-4">
        <div className="flex items-center justify-center">
          <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          {processingMessage}
        </div>
      </TableCell>
    </TableRow>
  );
};

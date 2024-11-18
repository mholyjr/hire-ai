import React, { useEffect } from "react";
import { PageProps } from "@/types";

interface Props extends PageProps {
  portalUrl: string;
}

export default function Portal({ portalUrl }: Props) {
  useEffect(() => {
    window.location.href = portalUrl;
  }, [portalUrl]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-gray-500">
        Redirecting to Stripe billing portal...
      </div>
    </div>
  );
}

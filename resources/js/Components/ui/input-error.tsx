import React from "react";

export const InputError = ({ message }: { message: string }) => (
  <p className="mt-2 text-sm text-red-600" role="alert">
    {message}
  </p>
);

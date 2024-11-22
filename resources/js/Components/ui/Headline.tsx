import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export const Headline: React.FC<Props> = ({ children, className }) => {
  return (
    <h1 className={`text-2xl font-bold text-center md:text-left ${className}`}>
      {children}
    </h1>
  );
};

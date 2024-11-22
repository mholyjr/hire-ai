import React from "react";
import { Headline } from "./ui/Headline";

type Props = {
  title: string;
  action?: React.ReactNode;
};

export const Header: React.FC<Props> = props => {
  const { title, action } = props;

  return (
    <header className="px-4 sm:px-6 md:px-12 lg:px-32 pt-8 md:pt-20">
      <div className="flex flex-col md:flex-row md:justify-between items-center mb-12 gap-4 md:gap-0">
        <Headline>{title}</Headline>
        {action && action}
      </div>
    </header>
  );
};

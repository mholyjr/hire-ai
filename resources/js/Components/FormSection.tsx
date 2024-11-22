import classNames from "classnames";
import React, { PropsWithChildren } from "react";
import SectionTitle from "@/Components/SectionTitle";
import { Card, CardContent, CardFooter } from "./ui/card";

interface Props {
  title: string;
  description: string;
  renderActions?(): JSX.Element;
  onSubmit(): void;
}

export default function FormSection({
  onSubmit,
  renderActions,
  title,
  description,
  children,
}: PropsWithChildren<Props>) {
  const hasActions = !!renderActions;

  return (
    <div className="md:grid md:grid-cols-3 md:gap-6">
      <SectionTitle title={title} description={description} />

      <Card className="mt-5 md:mt-0 md:col-span-2">
        <form
          onSubmit={e => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <CardContent className="grid grid-cols-6 gap-6 pt-6">
            {children}
          </CardContent>

          {hasActions && <CardFooter>{renderActions?.()}</CardFooter>}
        </form>
      </Card>
    </div>
  );
}

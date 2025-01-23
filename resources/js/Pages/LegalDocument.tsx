import React from "react";
import AuthenticationCardLogo from "@/Components/AuthenticationCardLogo";
import { Head } from "@inertiajs/react";
import PublicLayout from "@/Layouts/PublicLayout";

interface Props {
  content: string;
}

const metadata = {
  title: "Terms of Service",
  description: "Terms of Service",
  image: "/og-image.jpg",
};

export default function LegalDocument({ content }: Props) {
  return (
    <PublicLayout metadata={metadata} container="mx-auto mt-36 max-w-6xl">
      <div
        className="lg:w-[50%] mx-auto mt-6 p-6 overflow-hidden sm:rounded-lg prose dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </PublicLayout>
  );
}

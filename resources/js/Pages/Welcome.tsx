import React from "react";

import Hero from "@/features/Welcome/Hero";
import { Globe } from "@/features/Welcome/Globe";
import Features from "@/features/Welcome/Features";
import PublicLayout from "@/Layouts/PublicLayout";

const metadata = {
  title: "AI Candidate Evaluation | Make Better Hiring Decisions",
  description:
    "Transform your hiring process with AI-powered candidate evaluation. Our platform analyzes skills and experience to help you make data-driven recruitment decisions with confidence.",
  image: "/og-image.jpg",
};

export default function Welcome() {
  return (
    <PublicLayout metadata={metadata} container="flex flex-col overflow-hidden">
      <Hero />
      <Features />
      <Globe />
    </PublicLayout>
  );
}

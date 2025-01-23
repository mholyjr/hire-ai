"use server";

import React from "react";
import useRoute from "@/Hooks/useRoute";
import useTypedPage from "@/Hooks/useTypedPage";
import { Head } from "@inertiajs/react";
import Bento from "@/features/Welcome/Bento";
import { Navbar } from "@/features/Welcome/Navbar";
import Hero from "@/features/Welcome/Hero";
import { Globe } from "@/features/Welcome/Globe";
import Features from "@/features/Welcome/Features";
import { Navigation } from "@/features/Welcome/Navigation";
import Footer from "@/features/Welcome/Footer";

export default function Welcome() {
  const route = useRoute();
  const page = useTypedPage();

  return (
    <>
      <Head>
        <title>AI Candidate Evaluation | Make Better Hiring Decisions</title>
        <meta
          name="description"
          content="Transform your hiring process with AI-powered candidate evaluation. Our platform analyzes skills and experience to help you make data-driven recruitment decisions with confidence."
        />
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="AI Candidate Evaluation | Make Better Hiring Decisions"
        />
        <meta
          property="og:description"
          content="Transform your hiring process with AI-powered candidate evaluation. Our platform analyzes skills and experience to help you make data-driven recruitment decisions with confidence."
        />
        <meta property="og:image" content="/og-image.jpg" />
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="AI Candidate Evaluation | Make Better Hiring Decisions"
        />
        <meta
          name="twitter:description"
          content="Transform your hiring process with AI-powered candidate evaluation. Our platform analyzes skills and experience to help you make data-driven recruitment decisions with confidence."
        />
        <meta name="twitter:image" content="/og-image.jpg" />
      </Head>
      <Navigation />
      <main className="flex flex-col overflow-hidden">
        <Hero />
        <Features />
        <Globe />
        {/* <LogoCloud />
      <GlobalDatabase />
      <CodeExample />
      <Cta /> */}
      </main>
      <Footer />
    </>
    // <>
    //   <Head title="Welcome" />
    //   <div className="bg-white">
    //     <Navbar page={page} />

    //     <div className="relative isolate px-6 pt-14 lg:px-8">
    //       <div
    //         aria-hidden="true"
    //         className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
    //       >
    //         <div
    //           style={{
    //             clipPath:
    //               "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
    //           }}
    //           className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
    //         />
    //       </div>
    //       <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
    //         <div className="hidden sm:mb-8 sm:flex sm:justify-center">
    //           <div className="relative rounded-full px-3 py-1 text-sm/6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
    //             Don't be shy, try it out.{" "}
    //             <Link
    //               href={route("login")}
    //               className="font-semibold text-indigo-600"
    //             >
    //               <span aria-hidden="true" className="absolute inset-0" />
    //               Create your account <span aria-hidden="true">&rarr;</span>
    //             </Link>
    //           </div>
    //         </div>
    //         <div className="text-center">
    //           <h1 className="text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
    //             Find Your Perfect Candidates with AI Precision
    //           </h1>
    //           <p className="mt-8 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
    //             Transform your hiring process with intelligent candidate
    //             evaluation. Our AI-driven platform analyzes skills, experience,
    //             and potential to help you make data-driven recruitment decisions
    //             with confidence.
    //           </p>
    //           <div className="mt-10 flex items-center justify-center gap-x-6">
    //             <Link
    //               href={route("login")}
    //               className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    //             >
    //               Get started
    //             </Link>
    //             <a href="#" className="text-sm/6 font-semibold text-gray-900">
    //               Learn more <span aria-hidden="true">→</span>
    //             </a>
    //           </div>
    //         </div>
    //       </div>
    //       <div
    //         aria-hidden="true"
    //         className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
    //       >
    //         <div
    //           style={{
    //             clipPath:
    //               "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
    //           }}
    //           className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
    //         />
    //       </div>
    //     </div>
    //   </div>
    //   <Bento />
    // </>
  );
}

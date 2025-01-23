"use client";

import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { ArrowAnimated } from "@/features/Pricing/ArrowAnimated";
import Testimonial from "@/features/Pricing/Testimonial";
import PublicLayout from "@/Layouts/PublicLayout";
import { Link } from "@inertiajs/react";
import {
  RiCheckLine,
  RiCloudLine,
  RiInformationLine,
  RiSubtractLine,
  RiUserLine,
} from "@remixicon/react";

import React from "react";

interface Plan {
  name: string;
  price: string;
  description: string;
  capacity: string[];
  features: string[];
  isStarter: boolean;
  isRecommended: boolean;
  buttonText: string;
  buttonLink: string;
}

const plans: Plan[] = [
  {
    name: "10 Credits",
    price: "$7.99",
    description: "$0.80 per credit",
    capacity: [],
    features: [],
    isStarter: true,
    isRecommended: false,
    buttonText: "Create account",
    buttonLink: "login",
  },
  {
    name: "100 Credits",
    price: "$44.99",
    description: "$0.45 per credit",
    capacity: [],
    features: [],
    isStarter: false,
    isRecommended: true,
    buttonText: "Create account",
    buttonLink: "login",
  },
  {
    name: "1000 Credits",
    price: "$349",
    description: "$0.35 per credit",
    capacity: [],
    features: [],
    isStarter: false,
    isRecommended: false,
    buttonText: "Create account",
    buttonLink: "login",
  },
];

export default function Pricing() {
  const [billingFrequency, setBillingFrequency] = React.useState<
    "monthly" | "annually"
  >("monthly");
  return (
    <PublicLayout
      metadata={{
        title: "Pricing",
        description: "Pricing",
        image: "/og-image.jpg",
      }}
      container="mx-auto mt-36 max-w-6xl"
    >
      <div className="px-3">
        <section
          aria-labelledby="pricing-title"
          className="animate-slide-up-fade"
          style={{
            animationDuration: "600ms",
            animationFillMode: "backwards",
          }}
        >
          <Badge>Pricing</Badge>
          <h1 className="mt-2 block bg-gradient-to-br from-gray-900 to-gray-800 bg-clip-text py-2 text-4xl font-bold tracking-tighter text-transparent sm:text-6xl md:text-6xl dark:from-gray-50 dark:to-gray-300">
            Our plans scale with you
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-gray-700 dark:text-gray-400">
            Simple, credit-based pricing that scales with your hiring needs.
            Evaluate candidates with our AI technology at your own pace, with
            plans designed to fit any recruitment volume.
          </p>
        </section>
        <section
          id="pricing-overview"
          className="mt-20 animate-slide-up-fade"
          aria-labelledby="pricing-overview"
          style={{
            animationDuration: "600ms",
            animationDelay: "200ms",
            animationFillMode: "backwards",
          }}
        >
          <div className="grid grid-cols-1 gap-x-14 gap-y-8 lg:grid-cols-3">
            {plans.map((plan, planIdx) => (
              <div key={planIdx} className="mt-6">
                {plan.isRecommended ? (
                  <div className="flex h-4 items-center">
                    <div className="relative w-full">
                      <div
                        className="absolute inset-0 flex items-center"
                        aria-hidden="true"
                      >
                        <div className="w-full border-t border-indigo-600 dark:border-indigo-400" />
                      </div>
                      <div className="relative flex justify-center">
                        <span className="bg-white px-3 text-xs font-medium text-indigo-600 dark:bg-gray-950 dark:text-indigo-400">
                          Most popular
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex h-4 items-center">
                    <div className="h-px w-full bg-gray-200 dark:bg-gray-800" />
                  </div>
                )}
                <div className="mx-auto max-w-md">
                  <h2 className="mt-6 text-sm font-semibold text-gray-900 dark:text-gray-50">
                    {plan.name}
                  </h2>
                  <div className="mt-3 flex items-center gap-x-3">
                    <span className="text-5xl font-semibold tabular-nums text-gray-900 dark:text-gray-50">
                      {plan.price}
                    </span>
                  </div>
                  <div className="mt-6 flex flex-col justify-between">
                    <p className="text-sm leading-6 text-gray-600 dark:text-gray-400">
                      {plan.description}
                    </p>
                    <div className="mt-6">
                      {plan.isStarter ? (
                        <Button variant="secondary" asChild className="group">
                          <Link href={plan.buttonLink}>
                            {plan.buttonText}
                            <ArrowAnimated />
                          </Link>
                        </Button>
                      ) : (
                        <Button asChild className="group">
                          <Link href={plan.buttonLink}>
                            {plan.buttonText}
                            <ArrowAnimated />
                          </Link>
                        </Button>
                      )}
                    </div>
                  </div>
                  <ul
                    role="list"
                    className="mt-8 text-sm text-gray-700 dark:text-gray-400"
                  >
                    {plan.capacity.map((feature, index) => (
                      <li
                        key={feature}
                        className="flex items-center gap-x-3 py-1.5"
                      >
                        {index === 0 && (
                          <RiUserLine
                            className="size-4 shrink-0 text-gray-500"
                            aria-hidden="true"
                          />
                        )}
                        {index === 1 && (
                          <RiCloudLine
                            className="size-4 shrink-0 text-gray-500"
                            aria-hidden="true"
                          />
                        )}
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <ul
                    role="list"
                    className="mt-4 text-sm text-gray-700 dark:text-gray-400"
                  >
                    {plan.features.map(feature => (
                      <li
                        key={feature}
                        className="flex items-center gap-x-3 py-1.5"
                      >
                        <RiCheckLine
                          className="size-4 shrink-0 text-indigo-600 dark:text-indigo-400"
                          aria-hidden="true"
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          id="testimonial"
          className="mx-auto mt-20 max-w-xl sm:mt-32 lg:max-w-6xl"
          aria-labelledby="testimonial"
        >
          <Testimonial />
        </section>

        {/* plan details (lg+) */}

        {/* <Faqs /> */}
      </div>
    </PublicLayout>
  );
}

import React from "react";
import Balancer from "react-wrap-balancer";

export default function Testimonial() {
  return (
    <section id="testimonial" aria-label="Testimonial">
      <figure className="mx-auto">
        <blockquote className="mx-auto max-w-2xl text-center text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9 dark:text-gray-50">
          <p>
            <Balancer>
              "The AI evaluation platform has transformed our hiring process.
              We're now able to objectively assess candidates' skills and
              experience, cutting down evaluation time by 70% while making more
              confident hiring decisions."
            </Balancer>
          </p>
        </blockquote>
        <figcaption className="mt-10 flex items-center justify-center gap-x-5">
          <img
            className="h-11 w-11 rounded-full object-cover shadow-lg shadow-indigo-500/50 ring-2 ring-white dark:ring-gray-700"
            width={200}
            height={200}
            src="/images/testimonial.webp"
            alt="Image of Dima Coil"
          />
          <div>
            <p className="font-semibold text-gray-900 dark:text-gray-50">
              Sarah Thompson
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Head of Talent Acquisition at TechForward
            </p>
          </div>
        </figcaption>
      </figure>
    </section>
  );
}

import React from "react";
import AppLayout from "@/Layouts/AppLayout";
import { usePage } from "@inertiajs/react";
import { Header } from "@/Components/Header";

interface BillingProps {
  checkoutUrl?: string;
}

export default function Billing({ checkoutUrl }: BillingProps) {
  return (
    <AppLayout
      title="Billing"
      renderHeader={() => <Header title="Subscription Plans" />}
    >
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg p-6">
            <div className="flex flex-col items-center">
              <h2 className="text-2xl font-bold mb-6">Choose Your Plan</h2>
              <button
                // @ts-expect-error
                onClick={() => (window.location.href = checkoutUrl)}
                className="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
              >
                Subscribe Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

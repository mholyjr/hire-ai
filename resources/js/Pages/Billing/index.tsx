import React from "react";
import AppLayout from "@/Layouts/AppLayout";
import { usePage } from "@inertiajs/react";
import { Header } from "@/Components/Header";
import { PricingCard } from "./Partials/Pricing/PricingCard";
import { BillingPageProps } from "@/types";
import { PurchaseHistory } from "./Partials/Pricing/PurchaseHistory";

export default function Billing({ plans, purchases }: BillingPageProps) {
  console.log(purchases)
  return (
    <AppLayout
      title="Billing"
      renderHeader={() => <Header title="Buy more credits" />}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        {plans.map(plan => (
          <PricingCard key={plan.title} option={plan} />
        ))}
      </div>
      <PurchaseHistory purchaseHistory={purchases} />
    </AppLayout>
  );
}

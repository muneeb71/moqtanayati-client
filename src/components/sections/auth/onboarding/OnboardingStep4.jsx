"use client";

import Image from "next/image";
import RoundedButton from "@/components/buttons/RoundedButton";
import { useState } from "react";

const Feature = ({ title, desc }) => (
  <div className="rounded-xl border border-gray-200 p-4">
    <h4 className="text-base font-semibold text-eerieBlack">{title}</h4>
    <p className="text-sm text-darkBlue/60">{desc}</p>
  </div>
);

const OnboardingStep4 = ({ onNext, onBack }) => {
  const [loading, setLoading] = useState(false);
  return (
    <div className="relative flex w-full flex-col items-center gap-6 p-6 md:p-12">
      {/* Back button provided by layout */}
      <div className="mx-auto max-w-xl">
        <h2 className="mb-2 text-3xl font-semibold text-eerieBlack">
          Boost Your Sales with Smart Marketing!
        </h2>
        <p className="text-darkBlue/60">
          Unlock tools to grow faster, reach more people and stand out in the
          market
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Feature
          title="Rank Listings"
          desc="We help your listings rank with built-in SEO boosts"
        />
        <Feature
          title="Drop Custom Discounts"
          desc="Create limited-time offers to increase clicks and buys"
        />
        <Feature
          title="Run Affiliate Programs"
          desc="Let creators promote your store and earn commission"
        />
        <Feature
          title="Plan Your Campaigns"
          desc="Boost your products across platforms to get engagement"
        />
        <Feature
          title="Advertise to Right Crowd"
          desc="Boost across platforms to reach more buyers"
        />
        <Feature
          title="Highlight Best Deals"
          desc="Pin exclusive offers and drive urgency"
        />
      </div>
      <div className="mx-auto mt-10">
        <RoundedButton
          title={loading ? "Loading..." : "Next"}
          onClick={() => {
            if (loading) return;
            setLoading(true);
            onNext();
          }}
          showIcon={!loading}
          loading={loading || undefined}
          className="px-20"
        />
      </div>
    </div>
  );
};

export default OnboardingStep4;

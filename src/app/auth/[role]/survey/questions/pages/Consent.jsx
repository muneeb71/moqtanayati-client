"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const Consent = ({ setStep, setFormData, goBack }) => {
  const handleAgree = () => {
    setFormData((prev) => ({
      ...prev,
      consent: true,
    }));
    setStep((prev) => prev + 1);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4">
      <img
        src="/static/auth/check.svg"
        className="mb-8 h-14 w-14 text-moonstone"
        strokeWidth={2.5}
      />
      <h1 className="mb-2 text-center text-2xl text-black">
        We Need Your Consent
      </h1>
      <p className="mb-10 w-full text-center text-lg text-darkBlue/50">
        A 0.5% fee will be added to each product listed under Business and
        Family Seller accounts.
      </p>
      <Link
        href="/survey/onboarding"
        className="mb-4 flex w-full max-w-xs items-center justify-center gap-2 rounded-full bg-moonstone py-3 text-base font-medium text-white transition hover:bg-moonstone/90"
      >
        Agree and Start Now
        <ChevronRight className="h-5 w-5" />
      </Link>
      <button className="flex w-full max-w-xs items-center justify-center rounded-full border border-moonstone py-3 text-base font-medium text-moonstone transition hover:bg-moonstone/10">
        Discover all Features
      </button>
    </div>
  );
};

export default Consent;

"use client";

import Image from "next/image";
import RoundedButton from "@/components/buttons/RoundedButton";

const OnboardingStep2 = ({ onNext, onBack }) => {
  return (
    <div className="relative flex w-full flex-col items-center gap-6 p-6 md:p-12">
      {/* Back button provided by layout */}
      <div className="self-center">
        <Image
          src="/static/onboard/onboard2.png"
          alt="onboarding"
          width={420}
          height={320}
          priority
        />
      </div>
      <div className="mx-auto max-w-xl">
        <h2 className="mb-2 text-2xl font-semibold text-eerieBlack">
          Tools that work for you
        </h2>
        <p className="text-darkBlue/60">
          Track orders, manage inventory, chat with buyers and gain insights -
          all from your dashboard.
        </p>
      </div>
      <div className="mx-auto mt-10">
        <RoundedButton
          title="Next"
          onClick={onNext}
          showIcon
          className="px-20"
        />
      </div>
    </div>
  );
};

export default OnboardingStep2;

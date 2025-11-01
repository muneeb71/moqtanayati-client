"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import OnboardingStep1 from "@/components/sections/auth/onboarding/OnboardingStep1";
import OnboardingStep2 from "@/components/sections/auth/onboarding/OnboardingStep2";
import OnboardingStep3 from "@/components/sections/auth/onboarding/OnboardingStep3";
import OnboardingStep4 from "@/components/sections/auth/onboarding/OnboardingStep4";

const OnBoardingPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialStep = Number(searchParams.get("step") || 0);
  const [step, setStep] = useState(isNaN(initialStep) ? 0 : initialStep);

  useEffect(() => {
    const qs = new URLSearchParams(window.location.search);
    qs.set("step", String(step));
    // replace state to avoid stacking history on step change
    router.replace(`?${qs.toString()}`);
  }, [step, router]);

  const goNext = () => {
    if (step < 3) setStep((s) => s + 1);
    else router.push("/seller/login");
  };
  const goBack = () => {
    if (step > 0) setStep((s) => s - 1);
    else router.back();
  };

  return (
    <div className="min-h-[80vh] w-full">
      {step === 0 && <OnboardingStep1 onNext={goNext} onBack={goBack} />}
      {step === 1 && <OnboardingStep2 onNext={goNext} onBack={goBack} />}
      {step === 2 && <OnboardingStep3 onNext={goNext} onBack={goBack} />}
      {step === 3 && <OnboardingStep4 onNext={goNext} onBack={goBack} />}
    </div>
  );
};

export default OnBoardingPage;

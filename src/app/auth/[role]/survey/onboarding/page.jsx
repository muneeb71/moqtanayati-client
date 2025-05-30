"use client";
import { useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { steps } from "@/lib/dummy-onboarding";

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const router = useRouter();

  const handleNext = () => {
    if (step < 2) setStep((prev) => prev + 1);
    else {
      router.push("/survey/onboarding/completion");
    }
  };

  const goBack = () => {
    if (step <= 1){
      router.back();
    }
    else {
      setStep(prev => prev-1);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4">
      {step < 3 && (
        <>
          <img
            src={steps[step]?.image}
            alt={steps[step]?.title}
            className="mb-8 w-64 max-w-full"
          />
          <h1 className="mb-2 w-full text-start text-[28px] font-medium text-black/80">
            {steps[step]?.title}
          </h1>
          <p className="mb-10 w-full text-xl text-black/50">
            {steps[step]?.desc}
          </p>
        </>
      )}

      <div className="flex w-full justify-center items-center mt-10 ">
        <button
          className="mr-2 flex items-center rounded-full bg-grayishWhite p-2 text-xs"
          onClick={goBack}
        >
          <ChevronLeft />
          Go Back
        </button>
        <button
          className=" flex w-full max-w-xs items-center justify-center gap-2 rounded-full bg-moonstone py-3 text-base font-medium text-white transition hover:bg-moonstone/90"
          onClick={handleNext}
          disabled={step === 4}
        >
          Next
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

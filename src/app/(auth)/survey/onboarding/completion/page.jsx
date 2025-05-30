"use client";

import { useRouter } from "next/navigation";
import { marketingFeatures, steps } from "@/lib/dummy-onboarding";
import { ChevronLeft, ChevronRight } from "lucide-react/dist/cjs/lucide-react";

const page = () => {
  const router = useRouter();

  const goBack = () => {
    router.back();
  }

  const handleNext = () => {
      router.push("/seller");
  };

  return (
    <>
      <div className="w-full  flex flex-col items-center justify-center">
        <h1 className="mb-2 text-[22px] font-semibold text-black/80 w-full text-start">
          Boost&nbsp; Your Sales with
          <br />
          Smart Marketing!
        </h1>
        <p className="mb-7 text-base text-black/50">
          Unlock tools to grow faster, reach more people and stand out in the
          market
        </p>
        <div className="mb-10 grid grid-cols-2 gap-3">
          {marketingFeatures.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className="flex flex-col gap-1 rounded-lg border border-silver bg-white px-3 py-3"
              >
                <div className="mb-1 flex items-center gap-2">
                  <Icon className="h-4 w-4 text-moonstone" />
                  <span className="text-sm font-medium text-davyGray">
                    {feat.title}
                  </span>
                </div>
                <span className="text-xs text-customGray">{feat.desc}</span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-10 flex w-full items-center justify-center">
        <button
          className="mr-2 flex items-center rounded-full bg-grayishWhite p-2 text-xs"
          onClick={goBack}
        >
          <ChevronLeft />
          Go Back
        </button>
        <button
          className="flex w-full max-w-xs items-center justify-center gap-2 rounded-full bg-moonstone py-3 text-base font-medium text-white transition hover:bg-moonstone/90"
          onClick={handleNext}
        >
          Finish
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </>
  );
};

export default page;

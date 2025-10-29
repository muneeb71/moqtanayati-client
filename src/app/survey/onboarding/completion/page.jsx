"use client";

import { useRouter } from "next/navigation";
import { marketingFeatures, steps } from "@/lib/dummy-onboarding";
import { ChevronLeft, ChevronRight } from "lucide-react/dist/cjs/lucide-react";
import { useSurveyStore } from "@/providers/survey-store-provider";
import { saveSurvey } from "@/lib/api/survey/saveSurvey";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const page = () => {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const {
    sellerEntity,
    haveProducts,
    haveExperience,
    goal,
    productsAndServices,
    homeSupplies,
    consent,
  } = useSurveyStore((state) => state);

  useEffect(() => {
    // Get user data from sessionStorage
    const storedUserData = sessionStorage.getItem("surveyUserData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    } else {
      // If no user data, redirect to login
      router.push("/seller/login");
    }
  }, [router]);

  const goBack = () => {
    router.back();
  };

  const handleNext = async () => {
    if (!userData) return;

    setSubmitting(true);
    try {
      const response = await saveSurvey({
        userId: userData.id,
        entity: sellerEntity,
        hasProducts: haveProducts,
        hasExperience: haveExperience,
        goal: goal,
        productAndServices: productsAndServices,
        homeSupplies: homeSupplies,
        consent: consent,
      });

      if (response.success) {
        toast.success("Survey completed successfully!");
        // Clear survey data from sessionStorage
        sessionStorage.removeItem("surveyUserData");
        // Redirect to login page
        router.push("/seller/login");
      } else {
        toast.error(response.message || "Failed to submit survey");
      }
    } catch (error) {
      console.error("Survey submission error:", error);
      toast.error("Failed to submit survey");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="flex w-full flex-col items-center justify-center">
        <h1 className="mb-2 w-full text-start text-[22px] font-semibold text-black/80">
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
          className="flex w-full max-w-xs items-center justify-center gap-2 rounded-full bg-moonstone py-3 text-base font-medium text-white transition hover:bg-moonstone/90 disabled:opacity-50"
          onClick={handleNext}
          disabled={submitting}
        >
          {submitting ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Submitting...
            </>
          ) : (
            <>
              Finish
              <ChevronRight className="h-5 w-5" />
            </>
          )}
        </button>
      </div>
    </>
  );
};

export default page;

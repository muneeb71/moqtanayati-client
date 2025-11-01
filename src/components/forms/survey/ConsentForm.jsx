"use client";

import RoundedButton from "@/components/buttons/RoundedButton";
import SecondaryButton from "@/components/buttons/SecondaryButton";
import { saveSellerSurvey } from "@/lib/api/seller-survey/save";
import { useSurveyStore } from "@/providers/survey-store-provider";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const ConsentForm = ({ userId, userData }) => {
  const {
    sellerEntity,
    haveProducts,
    haveExperience,
    goal,
    productsAndServices,
    homeSupplies,
    consent,
    setConsent,
  } = useSurveyStore((state) => state);

  const router = useRouter();

  const [agreeLoading, setAgreeLoading] = useState(false);
  const [discoverLoading, setDiscoverLoading] = useState(false);

  const submitSurvey = async (setLoading) => {
    if (agreeLoading || discoverLoading) return;
    if (!sellerEntity) {
      toast.error("Please select your seller entity first.");
      router.push("/survey/entity");
      return;
    }
    if (!goal) {
      toast.error("Please select your goal first.");
      router.push("/survey/goal");
      return;
    }
    if (!userId) {
      toast.error(
        "User data is missing. Please restart the registration process.",
      );
      router.push("/seller/login");
      return;
    }
    setLoading(true);
    setConsent(true);
    try {
      const surveyData = {
        userId: userId,
        entity: sellerEntity,
        hasProducts: haveProducts,
        hasExperience: haveExperience,
        goal,
        productAndServices: productsAndServices,
        homeSupplies,
        consent: true,
        iban: userData?.iban || "",
        cr: userData?.crNumber || "",
        vat: userData?.vatNumber || "",
      };
      const response = await saveSellerSurvey(surveyData);
      if (response.success) {
        router.push("/seller/onboarding");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Survey submission error:", error);
      toast.error("Failed to submit survey");
    } finally {
      setLoading(false);
    }
  };

  const handleAgreeButton = async () => submitSurvey(setAgreeLoading);
  const handleDiscoverButton = async () => submitSurvey(setDiscoverLoading);
  return (
    <div className="flex flex-col items-center justify-center bg-white px-4">
      <Image
        src="/static/auth/check.svg"
        width={56}
        height={56}
        alt="tick"
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
      <RoundedButton
        onClick={() => handleAgreeButton()}
        className="w-full"
        title={agreeLoading ? "Submitting..." : "Agree and Start Now"}
        showIcon={!agreeLoading}
        loading={agreeLoading || undefined}
        disabled={agreeLoading || discoverLoading}
      />
      <SecondaryButton
        onClick={() => handleDiscoverButton()}
        title={discoverLoading ? "Submitting..." : "Discover all Features"}
        className="mt-5 w-full rounded-full"
        showIcon={!discoverLoading}
        loading={discoverLoading || undefined}
        disabled={agreeLoading || discoverLoading}
      />
    </div>
  );
};

export default ConsentForm;

"use client";

import RoundedButton from "@/components/buttons/RoundedButton";
import SecondaryButton from "@/components/buttons/SecondaryButton";
import { saveSellerSurvey } from "@/lib/api/seller-survey/save";
import { useSurveyStore } from "@/providers/survey-store-provider";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import useTranslation from "@/hooks/useTranslation";

const ConsentForm = ({ userId, userData }) => {
  const { t } = useTranslation();
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
      toast.error(t("survey.errors.select_entity"));
      router.push("/survey/entity");
      return;
    }
    if (!goal) {
      toast.error(t("survey.errors.select_goal"));
      router.push("/survey/goal");
      return;
    }
    if (!userId) {
      toast.error(t("survey.errors.user_missing"));
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
        toast.error(response.message || t("survey.errors.submit_failed"));
      }
    } catch (error) {
      console.error("Survey submission error:", error);
      toast.error(t("survey.errors.submit_failed"));
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
        {t("survey.consent.title")}
      </h1>
      <p className="mb-10 w-full text-center text-lg text-darkBlue/50">
        {t("survey.consent.fee_note")}
      </p>
      <RoundedButton
        onClick={() => handleAgreeButton()}
        className="w-full"
        title={
          agreeLoading
            ? t("survey.common.submitting")
            : t("survey.consent.agree")
        }
        showIcon={!agreeLoading}
        loading={agreeLoading || undefined}
        disabled={agreeLoading || discoverLoading}
      />
      <SecondaryButton
        onClick={() => handleDiscoverButton()}
        title={
          discoverLoading
            ? t("survey.common.submitting")
            : t("survey.consent.discover")
        }
        className="mt-5 w-full rounded-full"
        showIcon={!discoverLoading}
        loading={discoverLoading || undefined}
        disabled={agreeLoading || discoverLoading}
      />
    </div>
  );
};

export default ConsentForm;

"use client";

import RoundedButton from "@/components/buttons/RoundedButton";
import SecondaryButton from "@/components/buttons/SecondaryButton";
import { saveSellerSurvey } from "@/lib/api/seller-survey/save";
import { useSurveyStore } from "@/providers/survey-store-provider";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const ConsentForm = ({ user }) => {
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

  const handleAgreeButton = async () => {
    setConsent(true);
    const surveyData = {
      userId: user.id,
      entity: sellerEntity,
      hasProducts: haveProducts,
      hasExperience: haveExperience,
      goal,
      productAndServices: productsAndServices,
      homeSupplies,
      consent,
    };
    const response = await saveSellerSurvey(surveyData);
    if (response.success) {
      router.push("/seller");
    } else {
      toast.error(response.message);
    }
  };
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
        title="Agree and Start Now"
        showIcon
      />
      <SecondaryButton
        title="Discover all Features"
        className="mt-5 w-full rounded-full"
      />
    </div>
  );
};

export default ConsentForm;

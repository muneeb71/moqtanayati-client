"use client";

import Image from "next/image";
import RoundedButton from "@/components/buttons/RoundedButton";
import useTranslation from "@/hooks/useTranslation";

const OnboardingStep2 = ({ onNext, onBack }) => {
  const { t } = useTranslation();
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
          {t("onboarding.step2.title")}
        </h2>
        <p className="text-darkBlue/60">{t("onboarding.step2.subtitle")}</p>
      </div>
      <div className="mx-auto mt-10">
        <RoundedButton
          title={t("onboarding.common.next")}
          onClick={onNext}
          showIcon
          className="px-20"
        />
      </div>
    </div>
  );
};

export default OnboardingStep2;

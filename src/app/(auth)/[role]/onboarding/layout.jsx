"use client";

import GoBackButton from "@/components/buttons/GoBackButton";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import useTranslation from "@/hooks/useTranslation";

const OnboardingLayout = ({ children }) => {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const stepParam = searchParams.get("step");
  const isStepFour = String(stepParam) === "3"; // 0-based index
  return (
    <>
      <GoBackButton className="absolute left-10 top-[150px]" />
      {isStepFour && (
        <div className="absolute left-10 top-[500px] flex flex-col gap-3 pl-1 text-sm text-battleShipGray">
          <span>{t("onboarding.connect_socials")}</span>
          <div className="flex items-center gap-3">
            <Image
              src="/static/onboard/instagram.png"
              alt="instagram"
              width={22}
              height={22}
            />
            <Image
              src="/static/onboard/whatsapp.png"
              alt="whatsapp"
              width={22}
              height={22}
            />
            <Image
              src="/static/onboard/tiktok.png"
              alt="tiktok"
              width={22}
              height={22}
            />
          </div>
        </div>
      )}
      {children}
    </>
  );
};

export default OnboardingLayout;

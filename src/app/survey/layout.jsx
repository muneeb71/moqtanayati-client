"use client";

import GoBackButton from "@/components/buttons/GoBackButton";
import { SurveyStoreProvider } from "@/providers/survey-store-provider";
import Image from "next/image";
import { useEffect, useState } from "react";
import useTranslation from "@/hooks/useTranslation";

const SurveyLayout = ({ children }) => {
  const { t } = useTranslation();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get user data from sessionStorage
    const storedUserData = sessionStorage.getItem("surveyUserData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-moonstone border-t-transparent" />
      </div>
    );
  }

  return (
    <>
      <div className="relative flex h-full w-full justify-center bg-[#FFFFFE]">
        <div className="absolute top-0 z-10 flex w-full flex-col items-start justify-between px-10 py-10">
          <Image
            src="/static/logo.png"
            width={161}
            height={81}
            loading="eager"
            alt="Logo"
            quality={100}
            className="rounded-[10px]"
          />
        </div>
        <div className="no-scrollbar z-20 flex h-full min-h-screen w-full max-w-[450px] flex-col justify-center overflow-auto px-5 py-10">
          <GoBackButton className="absolute left-10 top-[150px]" />
          <SurveyStoreProvider userData={userData}>
            {children}
          </SurveyStoreProvider>
        </div>

        <div className="absolute left-0 top-0 z-[1]">
          <Image
            src="/static/bg/blob.svg"
            width={500}
            height={500}
            alt="blob"
            loading="eager"
          />
        </div>

        <div className="absolute right-0 z-[1] hidden h-screen w-full max-w-[457px] items-end justify-end bg-[#D3EDF0] xl:flex">
          <Image
            src="/static/bg/login.svg"
            width={712}
            height={712}
            loading="lazy"
            alt="Logo"
            quality={100}
          />
        </div>
      </div>
    </>
  );
};

export default SurveyLayout;

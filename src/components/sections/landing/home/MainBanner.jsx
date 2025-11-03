"use client";

import SearchInput from "@/components/form-fields/SearchInput";
import Image from "next/image";
import useTranslation from "@/hooks/useTranslation";

const MainBanner = () => {
  const { t } = useTranslation();
  return (
    <div className="relative mb-[30px] flex w-full flex-col items-center justify-center md:mb-[38px]">
      <div className="grid min-h-[550px] w-full max-w-[87rem] overflow-hidden rounded-[30px] bg-moonstone/20 md:min-h-[647px] lg:grid-cols-[6fr_4fr]">
        <div className="relative z-10 flex h-full flex-col justify-center px-7 pt-20 md:px-16 lg:pb-32">
          <h1 className="text-4xl font-medium text-eerieBlack/80 md:text-[70px] md:leading-[105px]">
            {t("buyer.home.banner.title")}
          </h1>
          <span className="mt-3 max-w-[647px] text-eerieBlack/70 md:mt-0 md:text-[26px] md:leading-[39px]">
            {t("buyer.home.banner.subtitle")}
          </span>
          <div className="absolute left-0 top-0 z-[1]">
            <Image
              src="/static/bg/blob.svg"
              width={400}
              height={500}
              alt="blob"
              loading="lazy"
              style={{ width: "auto", height: "auto" }}
            />
          </div>
        </div>
        <div className="flex h-full w-full items-end justify-end lg:relative">
          <div className="right-5 lg:absolute">
            <Image
              src="/static/bg/home/main-banner.png"
              width={712}
              height={839}
              quality={100}
              alt="blob"
              loading="lazy"
              className="md:min-w-[50vw] lg:min-w-[600px]"
            />
          </div>
        </div>
      </div>
      <div className="relative flex h-full flex-col justify-center overflow-hidden"></div>
    </div>
  );
};

export default MainBanner;

"use client";
import PageHeading from "@/components/headings/PageHeading";
import HelpCenterBar from "@/components/sections/landing/help-center/HelpCenterBar";
import useTranslation from "@/hooks/useTranslation";

const HelpCenterLayout = ({ children }) => {
  const { t } = useTranslation();
  return (
    <div className="flex w-full flex-col items-center justify-center gap-5 px-3">
      <PageHeading>{t("seller.help_center.title")}</PageHeading>
      <div className="flex w-full max-w-7xl flex-col items-center justify-center">
        <HelpCenterBar />
        {children}
      </div>
    </div>
  );
};

export default HelpCenterLayout;

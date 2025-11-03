"use client";
import { arrowUpRightIcon } from "@/assets/icons/seller-icons";
import PageHeading from "@/components/headings/PageHeading";
import AnalyticsBanner from "@/components/sections/seller/analytics/AnalyticsBanner";
import useTranslation from "@/hooks/useTranslation";

const AnalyticsPage = () => {
  const { t } = useTranslation();
  return (
    <div className="flex w-full flex-col items-center justify-center px-3">
      <PageHeading>{t("analytics.page_title")}</PageHeading>
      <AnalyticsBanner />
    </div>
  );
};

export default AnalyticsPage;

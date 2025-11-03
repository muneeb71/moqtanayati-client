"use client";

import PageHeading from "@/components/headings/PageHeading";
import HistoryBar from "@/components/sections/landing/profile/purchase-history/HistoryBar";
import useTranslation from "@/hooks/useTranslation";

const PurchaseHistoryLayout = ({ children }) => {
  const { t } = useTranslation();
  return (
    <div className="flex w-full flex-col items-center justify-center gap-5 px-3">
      <PageHeading>{t("buyer.purchase_history.title")}</PageHeading>
      <div className="flex w-full max-w-lg flex-col">
        <HistoryBar />
        {children}
      </div>
    </div>
  );
};

export default PurchaseHistoryLayout;

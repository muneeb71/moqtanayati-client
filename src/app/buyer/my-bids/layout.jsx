"use client";

import PageHeading from "@/components/headings/PageHeading";
import BidsBar from "@/components/sections/landing/my-bids/BidsBar";
import useTranslation from "@/hooks/useTranslation";

const MyBidsLayout = ({ children }) => {
  const { t } = useTranslation();
  return (
    <div className="flex w-full flex-col items-center justify-center gap-5 px-3">
      <PageHeading>{t("nav.dropdown.my_bids")}</PageHeading>
      <div className="flex w-full max-w-7xl flex-col gap-5">
        <BidsBar />
        {children}
      </div>
    </div>
  );
};

export default MyBidsLayout;

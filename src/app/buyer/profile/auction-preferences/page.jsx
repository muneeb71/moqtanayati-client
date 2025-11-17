"use client";

import PageHeading from "@/components/headings/PageHeading";
import PreferencesSection from "@/components/sections/landing/profile/auction-preferences/PreferencesSection";
import useTranslation from "@/hooks/useTranslation";

const AuctionPreferencesPage = () => {
  const { t } = useTranslation();
  return (
    <div className="flex w-full flex-col items-center justify-center gap-5 px-3">
      <PageHeading>{t("buyer.auction_preferences.title")}</PageHeading>
      <PreferencesSection />
    </div>
  );
};

export default AuctionPreferencesPage;

import PageHeading from "@/components/headings/PageHeading";
import PreferencesSection from "@/components/sections/landing/profile/auction-preferences/PreferencesSection";

const AuctionPreferencesPage = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-5 px-3">
      <PageHeading>Profile {">"} Auction Preferences</PageHeading>
      <PreferencesSection />
    </div>
  );
};

export default AuctionPreferencesPage;

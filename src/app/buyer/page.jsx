import MainBanner from "@/components/sections/landing/home/MainBanner";

import CategoriesSliderSection from "@/components/sections/landing/home/CategoriesSliderSection";
import RecommendedSection from "@/components/sections/landing/home/RecommendedSection";
import FurnitureSection from "@/components/sections/landing/home/FurnitureSection";
import AuctionSection from "@/components/sections/landing/home/AuctionSection";
import { io } from "socket.io-client";
import { getAllAuctions } from "@/lib/api/auctions/getAll";
import AuctionSectionSkeleton from "@/components/loaders/AuctionSectionSkeleton";

const socket = io("http://localhost:8000", {});
let loading = true;
const auctions = await getAllAuctions();
const auction = auctions.find(a => a.status === "LIVE");
loading = false;

const BuyerPage = async () => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-5 px-3 pb-20">
      <MainBanner />
      <CategoriesSliderSection />
      {loading ? <AuctionSectionSkeleton />: <AuctionSection auction={auction} />}
      <RecommendedSection />
      <FurnitureSection />
    </div>
  );
};

export default BuyerPage;

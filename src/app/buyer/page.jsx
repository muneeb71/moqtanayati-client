import MainBanner from "@/components/sections/landing/home/MainBanner";

import CategoriesSliderSection from "@/components/sections/landing/home/CategoriesSliderSection";
import RecommendedSection from "@/components/sections/landing/home/RecommendedSection";
import FurnitureSection from "@/components/sections/landing/home/FurnitureSection";
import AuctionSection from "@/components/sections/landing/home/AuctionSection";
import { io } from "socket.io-client";

// Replace with your backend URL and port
const socket = io("http://localhost:8000", {
  // You can pass auth tokens or userId here if needed
  // query: { userId: "USER_ID" }
});

const BuyerPage = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-5 px-3 pb-20">
      <MainBanner />
      <CategoriesSliderSection />
      <AuctionSection />
      <RecommendedSection />
      <FurnitureSection />
    </div>
  );
};

export default BuyerPage;

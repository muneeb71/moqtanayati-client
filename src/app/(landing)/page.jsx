import MainBanner from "@/components/sections/landing/home/MainBanner";
import React from "react";
import CategoriesSliderSection from "@/components/sections/landing/home/CategoriesSliderSection";
import RecommendedSection from "@/components/sections/landing/home/RecommendedSection";
import FurnitureSection from "@/components/sections/landing/home/FurnitureSection";
import AuctionSection from "@/components/sections/landing/home/AuctionSection";
import AuctionRegisterSlider from "@/components/slider/AuctionRegisterSlider";

const BuyerPage = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-5 px-3 pb-20">
      <MainBanner />
      <CategoriesSliderSection />
      <AuctionSection />
      <RecommendedSection />
      <FurnitureSection />
      <AuctionRegisterSlider />
    </div>
  );
};

export default BuyerPage;

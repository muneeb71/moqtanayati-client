import MainBanner from "@/components/sections/landing/home/MainBanner";

import CategoriesSliderSection from "@/components/sections/landing/home/CategoriesSliderSection";
import RecommendedSection from "@/components/sections/landing/home/RecommendedSection";
import PopularSection from "@/components/sections/landing/home/FurnitureSection";
import AuctionSection from "@/components/sections/landing/home/AuctionSection";
import { io } from "socket.io-client";
import { getAllAuctions } from "@/lib/api/auctions/getAll";

const socket = io("http://localhost:5000", {});

const BuyerPage = async () => {
  // Fetch auctions data
  const response = await getAllAuctions();
  console.log("🔍 [BuyerPage] Full API response:", response);
  console.log("🔍 [BuyerPage] Response data:", response.data);

  const auctions = response.auctions || [];
  console.log("🔍 [BuyerPage] All auctions:", auctions);
  console.log("🔍 [BuyerPage] Total auctions count:", auctions.length);

  // Log each auction's status
  auctions.forEach((auction, index) => {
    console.log(`🔍 [BuyerPage] Auction ${index}:`, {
      id: auction.id,
      status: auction.status,
      productName: auction.product?.name,
      productId: auction.productId,
    });
  });

  const liveAuctions = auctions.filter((a) => a.status === "LIVE");
  console.log("🔍 [BuyerPage] Live auctions found:", liveAuctions.length);
  console.log("🔍 [BuyerPage] Live auctions:", liveAuctions);

  const liveAuction = auctions.find((a) => a.status === "LIVE");
  console.log("🔍 [BuyerPage] Selected live auction:", liveAuction);

  const upcomingAuctions = auctions.filter((a) => a.status === "UPCOMING");
  console.log(
    "🔍 [BuyerPage] Upcoming auctions found:",
    upcomingAuctions.length,
  );

  const latestAuction =
    auctions.find((a) => a.status === "UPCOMING") || auctions[0];
  console.log("🔍 [BuyerPage] Selected latest auction:", latestAuction);

  return (
    <div className="flex w-full flex-col items-center justify-center gap-5 px-3 pb-20">
      <MainBanner />
      <CategoriesSliderSection />

      <div className="m-20">
        <div className="flex w-full flex-col gap-8">
          {/* Live Auction */}
          {liveAuction && (
            <div className="flex w-full flex-col">
              <h2 className="mb-4 text-center text-2xl font-bold text-moonstone">
                🔥 Live Auction
              </h2>
              <AuctionSection auction={liveAuction} />
            </div>
          )}

          {/* Latest/Upcoming Auction */}
          {latestAuction && !liveAuction && (
            <div className="flex w-full flex-col">
              <h2 className="mb-4 text-center text-2xl font-bold text-moonstone">
                ⏰ Latest Auction
              </h2>
              <AuctionSection auction={latestAuction} />
            </div>
          )}

          {/* Show message if no auctions */}
          {!liveAuction && !latestAuction && (
            <div className="flex w-full flex-col items-center justify-center py-12">
              <p className="text-lg text-gray-500">
                No auctions available at the moment
              </p>
            </div>
          )}
        </div>
      </div>
      <RecommendedSection />
      <PopularSection />
    </div>
  );
};

export default BuyerPage;

"use client";

import { useEffect, useState } from "react";
import { useMyBids } from "@/hooks/useMyBids";
import { getAllAuctions } from "@/lib/api/auctions/getAll";
import MainBanner from "@/components/sections/landing/home/MainBanner";
import CategoriesSliderSection from "@/components/sections/landing/home/CategoriesSliderSection";
import RecommendedSection from "@/components/sections/landing/home/RecommendedSection";
import PopularSection from "@/components/sections/landing/home/FurnitureSection";
import AuctionSection from "@/components/sections/landing/home/AuctionSection";

const BuyerPageClient = () => {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userBids, getBidAuctionIds } = useMyBids();

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        setLoading(true);
        const response = await getAllAuctions();
        setAuctions(response.auctions || []);
      } catch (error) {
        console.error("Error fetching auctions:", error);
        setAuctions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAuctions();
  }, []);

  // Get auction IDs where user has already placed bids
  const bidAuctionIds = getBidAuctionIds();

  console.log("🔍 [BuyerPageClient] User bids:", userBids);
  console.log("🔍 [BuyerPageClient] Bid auction IDs:", bidAuctionIds);
  console.log("🔍 [BuyerPageClient] Total auctions:", auctions.length);

  // Filter out auctions where user has already placed bids
  const availableAuctions = auctions.filter((auction) => {
    const auctionId = auction.id;
    const productId = auction.productId;
    const productProductId = auction.product?.id;

    // Check if any of these IDs match the bid auction IDs
    const hasBidOnAuction = bidAuctionIds.some(
      (bidId) =>
        bidId === auctionId ||
        bidId === productId ||
        bidId === productProductId,
    );

    console.log(`🔍 [BuyerPageClient] Auction ${auctionId}:`, {
      auctionId,
      productId,
      productProductId,
      hasBidOnAuction,
      auctionName: auction.product?.name,
    });

    return !hasBidOnAuction;
  });

  console.log(
    "🔍 [BuyerPageClient] Available auctions (after filtering):",
    availableAuctions.length,
  );

  // If no available auctions after filtering, fall back to original auctions
  const displayAuctions =
    availableAuctions.length > 0 ? availableAuctions : auctions;

  const liveAuctions = displayAuctions.filter((a) => a.status === "LIVE");
  const liveAuction = displayAuctions.find((a) => a.status === "LIVE");
  const upcomingAuctions = displayAuctions.filter(
    (a) => a.status === "UPCOMING",
  );
  const latestAuction =
    displayAuctions.find((a) => a.status === "UPCOMING") || displayAuctions[0];

  if (loading) {
    return (
      <div className="flex w-full flex-col items-center justify-center gap-5 px-3 pb-20">
        <div className="flex h-64 w-full items-center justify-center">
          <div className="text-lg text-gray-500">Loading...</div>
        </div>
      </div>
    );
  }

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

export default BuyerPageClient;

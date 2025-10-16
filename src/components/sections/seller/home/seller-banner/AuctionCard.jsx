"use client";

import { useProfileStore } from "@/providers/profile-store-provider";
import { useAuctionStore } from "@/providers/auction-store-provider";
import { useEffect, useState } from "react";
import { getAuctionsBySellerId } from "@/lib/api/auctions/getAllByStoreId";

const AuctionCard = () => {
  let auctions = [];
  try {
    auctions = useAuctionStore((state) => state.auctionProducts) || [];
  } catch (_) {
    auctions = [];
  }
  const store = useProfileStore((state) => state.store);

  const inventoryProducts = Array.isArray(store?.products)
    ? store.products
    : [];
  const derivedAuctionCount = inventoryProducts.filter((p) => {
    const format = String(p?.pricingFormat || "").toLowerCase();
    const status = String(p?.status || "").toLowerCase();
    const hasAuction = Boolean(
      p?.auctionDuration || p?.startingBid || p?.auctions || p?.isAuction,
    );
    return format === "auctions" || status === "auction" || hasAuction;
  }).length;

  const [fetchedCount, setFetchedCount] = useState(null);

  const totalAuctions = auctions?.length
    ? auctions.length
    : derivedAuctionCount || fetchedCount || 0;

  useEffect(() => {
    const loadAuctions = async () => {
      if (!store?.id) return;
      try {
        const res = await getAuctionsBySellerId();
        const list = res?.auctions || res?.data?.auctions || [];
        if (Array.isArray(list)) setFetchedCount(list.length);
      } catch (_) {
        // ignore
      }
    };
    if ((!auctions || auctions.length === 0) && derivedAuctionCount === 0) {
      loadAuctions();
    }
  }, [store?.id, auctions?.length, derivedAuctionCount]);

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[30px] bg-white px-5 py-4">
      <h1 className="z-10 text-xl font-medium text-davyGray lg:text-2xl">
        Auctions
      </h1>
      <div className="z-10 w-full pb-12 pt-7 text-center text-6xl font-medium text-russianViolet">
        {totalAuctions}
      </div>
      <div className="absolute -bottom-3 -left-2 size-10 rounded-full bg-[#D7D6ED]"></div>
      <div className="absolute -right-8 top-5 size-28 rounded-full bg-[#D7D6ED]"></div>
    </div>
  );
};

export default AuctionCard;

"use client";

import { useState, useEffect } from "react";
import { getMyBids } from "@/lib/api/auctions/getMyBid";

export const useMyBids = () => {
  const [userBids, setUserBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBids = async () => {
      try {
        setLoading(true);
        const bids = await getMyBids();
        console.log("🔍 [useMyBids] API response:", bids);

        const bidData = Array.isArray(bids?.data) ? bids.data : [];
        setUserBids(bidData);
        console.log("🔍 [useMyBids] User bids:", bidData);
      } catch (err) {
        console.error("🔍 [useMyBids] Error fetching bids:", err);
        setError(err);
        setUserBids([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBids();
  }, []);

  // Extract auction/product IDs from bids
  const getBidAuctionIds = () => {
    const auctionIds = userBids
      .map((bid) => {
        // Try multiple possible ID fields
        return (
          bid.auctionId ||
          bid.productId ||
          bid.auction?.id ||
          bid.product?.id ||
          bid.auction?.product?.id ||
          bid.id
        );
      })
      .filter(Boolean);

    console.log("🔍 [useMyBids] Extracted auction IDs:", auctionIds);
    return auctionIds;
  };

  return {
    userBids,
    loading,
    error,
    getBidAuctionIds,
  };
};

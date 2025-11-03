"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import BidCard from "@/components/sections/landing/my-bids/BidCard";
import { getMyBids } from "@/lib/api/auctions/getMyBid";
import { dummyBids } from "@/lib/dummy-bids";
import useTranslation from "@/hooks/useTranslation";

const MyBidsPage = () => {
  const { t } = useTranslation();
  const params = useParams();
  const category = params?.category?.toLowerCase();

  const [filteredBids, setFilteredBids] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBids = async () => {
      setLoading(true);
      try {
        const bids = await getMyBids();
        console.log("🔍 [MyBidsPage] API response:", bids);

        // Ensure we have a valid array
        const userBids = Array.isArray(bids?.data) ? bids.data : [];
        console.log("🔍 [MyBidsPage] User bids:", userBids);
        console.log("🔍 [MyBidsPage] User bids length:", userBids.length);

        // Filtering logic
        let filtered = userBids;
        if (category === "active") {
          filtered = userBids.filter(
            (bid) =>
              bid?.auction?.status === "LIVE" && bid?.status !== "OUTBID",
          );
        } else if (category === "won") {
          filtered = userBids.filter((bid) => bid?.status === "WON");
        } else if (category === "outbid") {
          filtered = userBids.filter((bid) => bid?.status === "OUTBID");
        }
        // 'all' or any other: show all

        console.log("🔍 [MyBidsPage] Category:", category);
        console.log("🔍 [MyBidsPage] Filtered bids:", filtered);
        console.log("🔍 [MyBidsPage] Filtered bids length:", filtered.length);

        // Debug: Show bid statuses for active category
        if (category === "active") {
          console.log("🔍 [MyBidsPage] Active bids debug:");
          userBids.forEach((bid, index) => {
            console.log(`Bid ${index}:`, {
              auctionStatus: bid?.auction?.status,
              bidStatus: bid?.status,
              included:
                bid?.auction?.status === "LIVE" && bid?.status !== "OUTBID",
            });
          });
        }
        setFilteredBids(filtered);
      } catch (error) {
        console.error("🔍 [MyBidsPage] Error fetching bids:", error);
        setFilteredBids([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBids();
  }, [category]);

  // Ensure filteredBids is always an array
  const safeFilteredBids = Array.isArray(filteredBids) ? filteredBids : [];

  return (
    <div className="flex min-h-[40rem] w-full flex-col gap-5">
      <div className="flex gap-1 text-xl">
        <span className="font-medium">{safeFilteredBids.length}</span>
        <span className="text-battleShipGray">
          {t("buyer.my_bids.results")}
        </span>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {safeFilteredBids.length === 0 ? (
          <div className="col-span-full py-10 text-center text-gray-400">
            {t("buyer.my_bids.no_bids_found")}
          </div>
        ) : (
          safeFilteredBids.map((item, index) => (
            <BidCard key={item.id || index} item={item} />
          ))
        )}
      </div>
    </div>
  );
};

export default MyBidsPage;

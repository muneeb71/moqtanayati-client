"use client";

import BidderCard from "@/components/cards/BidderCard";
import AutoBidDialog from "./dialogs/AutoBidDialog";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import UpdateBidDialog from "./dialogs/UpdateBidDialog";
import WithdrawBidDialog from "./dialogs/WithdrawBidDialog";
import { usePathname, useRouter } from "next/navigation";
import bidOnAuction from "@/lib/api/auctions/bid";
import toast from "react-hot-toast";
import withdrawBidOfUser from "@/lib/api/auctions/withdrawBid";
import { getAuctionById } from "@/lib/api/auctions/getById";
import useTranslation from "@/hooks/useTranslation";

function getCookie(name) {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
}

const BiddersSection = ({ data, fetchData, item }) => {
  const { t } = useTranslation();
  const path = usePathname();
  const router = useRouter();
  const userId = getCookie("userId");
  const [selectedBidder, setSelectedBidder] = useState(null);
  const [bidAmount, setBidAmount] = useState(0);
  const [auctionBids, setAuctionBids] = useState([]);
  const [loading, setLoading] = useState(false);
  const id = path.split("/").splice(-1)[0];
  const [requestLoading, setRequestLoading] = useState(false);

  // Debug logging
  console.log("🔍 [BiddersSection] Bids count:", data?.length || 0);
  console.log("🔍 [BiddersSection] Item pricing format:", item?.pricingFormat);
  console.log("🔍 [BiddersSection] Item auction data:", item?.auction);

  // Fetch auction data with bids
  const fetchAuctionData = async () => {
    if (item?.pricingFormat === "Auctions") {
      setLoading(true);
      try {
        console.log(
          "🔍 [BiddersSection] Fetching auction data for product:",
          id,
        );

        const auctionData = await getAuctionById(item?.id);
        console.log("🔍 [BiddersSection] Auction data response:", auctionData);

        if (auctionData?.success && auctionData?.data) {
          const bids = Array.isArray(auctionData.data) ? auctionData.data : [];
          setAuctionBids(bids);
          console.log("🔍 [BiddersSection] Auction bids found:", bids.length);
        } else if (Array.isArray(auctionData)) {
          setAuctionBids(auctionData);
          console.log(
            "🔍 [BiddersSection] Auction bids found (direct array):",
            auctionData.length,
          );
        }
      } catch (error) {
        console.error(
          "🔍 [BiddersSection] Error fetching auction data:",
          error,
        );
        // Fallback to using the passed data if API fails
        if (data && data.length > 0) {
          setAuctionBids(data);
          console.log("🔍 [BiddersSection] Using fallback data:", data.length);
        }
      } finally {
        setLoading(false);
      }
    }
  };

  // Use auction bids if available, otherwise use passed data
  const bidsToDisplay = auctionBids.length > 0 ? auctionBids : data;

  useEffect(() => {
    if (item?.pricingFormat === "Auctions") {
      fetchAuctionData();
    }
  }, [item?.pricingFormat, id]);

  const handlePlaceBid = async (bypass) => {
    if (!userId) {
      toast.error(t("buyer.bidders.sign_in_to_bid"));
      router.push(`/buyer/login?returnUrl=${encodeURIComponent(path)}`);
      return;
    }
    if (!bypass && userId !== selectedBidder?.bidder?.id)
      return toast.error(t("buyer.bidders.not_your_bid"));
    try {
      setRequestLoading(true);
      const res = await bidOnAuction({
        productId: id,
        amount: Number(bidAmount),
      });
      if (res.success) {
        setRequestLoading(false);
        toast.success(res.message || t("buyer.bidders.bid_placed_success"));
        fetchData();
      } else {
        setRequestLoading(false);
        toast.error(res.message || t("buyer.bidders.bid_place_failed"));
      }
    } catch (err) {
      setRequestLoading(false);
      toast.error(
        err?.response?.data?.message || err.message || t("buyer.bidders.bid_place_failed"),
      );
      console.log("Failed to place bid:", err);
    }
  };

  useEffect(() => {
    if (selectedBidder) {
      setBidAmount(selectedBidder.amount);
    }
  }, [selectedBidder]);

  const withdrawBid = async () => {
    if (userId !== selectedBidder?.bidder?.id)
      return toast.error(t("buyer.bidders.not_your_bid"));
    try {
      const res = await withdrawBidOfUser(selectedBidder?.auctionId);
      if (res?.success) {
        toast.success(res?.data?.message || t("buyer.bidders.bid_withdraw_success"));
        fetchData();
      } else {
        toast.error(res?.message || t("buyer.bidders.bid_withdraw_failed"));
      }
    } catch (error) {
      toast.error(error?.message || t("buyer.bidders.bid_withdraw_error"));
    }
  };

  if (requestLoading) {
    return (
      <div className="fixed inset-0 z-50 flex h-[100vh] w-full items-center justify-center bg-black/80">
        <svg
          className="h-10 w-10 animate-spin text-moonstone"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8z"
          ></path>
        </svg>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col items-center justify-center bg-[#F8F7FB] px-3">
      {selectedBidder && (
        <div className="flex w-full items-center justify-center py-10">
          <div className="flex w-full max-w-[421px] flex-col items-center justify-center gap-4 rounded-[20px] bg-white p-5">
            <h1 className="text-[17px] font-medium leading-[23px] text-darkBlue">
              {t("buyer.bidders.place_your_bid")}
            </h1>
            <div className="flex w-full justify-between rounded-[11px] bg-[#FBFBFB] px-3 py-2.5">
              <div className="flex flex-col">
                <span className="text-lg text-battleShipGray">{t("buyer.bidders.my_bid")}</span>
                <span className="text-[22px] font-medium text-eerieBlack">
                  ${bidAmount}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-[13px] font-medium">{t("buyer.bidders.status")}</span>
                <div
                  className={`rounded-[9px] px-3.5 py-1 text-[15px] ${selectedBidder?.status === "HIGHEST" ? "bg-moonstone/10 text-moonstone" : "bg-faluRed/10 text-faluRed"}`}
                >
                  {selectedBidder?.status}
                </div>
              </div>
            </div>
            <div className="flex w-full items-center gap-3">
              <AutoBidDialog
                className="w-full text-sm"
                bidAmount={bidAmount}
                setBidAmount={setBidAmount}
              />
              <UpdateBidDialog
                className="w-full text-nowrap text-sm"
                bidAmount={bidAmount}
                setBidAmount={setBidAmount}
                updateBid={handlePlaceBid}
              />
            </div>
            <WithdrawBidDialog
              item={selectedBidder}
              handleConfirm={withdrawBid}
            />
          </div>
        </div>
      )}
      <div
        className={cn(
          "flex w-full max-w-7xl flex-col border-black/10 py-10",
          selectedBidder ? "border-t" : "border-b",
        )}
      >
        <div className="flex flex-col gap-8">
          <h1 className="text-[32px] font-medium text-black/80">
            {"Bidders"}{" "}
            <span className="text-[18px] text-moonstone">
              ({bidsToDisplay?.length || 0})
            </span>
          </h1>
          <div className="grid gap-2 sm:grid-cols-2 sm:gap-3 md:grid-cols-3 md:gap-5 lg:grid-cols-5">
            {loading ? (
              <div className="col-span-full flex justify-center py-8">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-moonstone border-t-transparent" />
              </div>
            ) : bidsToDisplay?.length > 0 ? (
              bidsToDisplay?.map((bidder, index) => (
                <BidderCard
                  key={index}
                  bidder={bidder}
                  selectedBidder={selectedBidder}
                  setSelectedBidder={setSelectedBidder}
                />
              ))
            ) : (
              <div className="col-span-full py-12 text-center">
                <div className="mx-auto max-w-md">
                  <div className="mb-4 text-6xl">🏆</div>
                  <h3 className="mb-2 text-xl font-semibold text-gray-700">
                    {t("buyer.bidders.no_bids_yet_title")}
                  </h3>
                  <p className="text-gray-500">
                    {t("buyer.bidders.no_bids_yet_sub")}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {!selectedBidder && (
        <div className="flex w-full items-center justify-center py-10">
          <div className="flex w-full max-w-[421px] flex-col items-center justify-center gap-4 rounded-[20px] bg-white px-5 pb-10 pt-5">
            <h1 className="text-[17px] font-medium leading-[23px] text-darkBlue">
              {t("buyer.bidders.place_your_bid")}
            </h1>
            <div className="flex w-full items-center gap-2">
              <input
                type="number"
                name="yourBid"
                id="yourBid"
                placeholder={t("buyer.bidders.enter_your_bid")}
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                className="h-[55px] w-full rounded-[6.7px] bg-[#F8F7FB] px-4 focus:outline-moonstone"
              />
              <button
                type="button"
                className="flex h-[55px] items-center justify-center rounded-[6.7px] bg-moonstone px-8 text-[17px] font-medium text-white transition-all duration-200 ease-in hover:bg-delftBlue"
                onClick={() => handlePlaceBid(true)}
              >
                {t("buyer.bidders.bid")}
              </button>
            </div>
            <AutoBidDialog
              bidAmount={bidAmount}
              setBidAmount={setBidAmount}
              handlePlaceBid={() => {}}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BiddersSection;

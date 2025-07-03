"use client";

import BidderCard from "@/components/cards/BidderCard";
import AutoBidDialog from "./dialogs/AutoBidDialog";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import UpdateBidDialog from "./dialogs/UpdateBidDialog";
import WithdrawBidDialog from "./dialogs/WithdrawBidDialog";
import { usePathname } from "next/navigation";
import bidOnAuction from "@/lib/api/auctions/bid";
import toast from "react-hot-toast";
import withdrawBidOfUser from "@/lib/api/auctions/withdrawBid";

function getCookie(name) {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
}
const userId = getCookie("userId");

const BiddersSection = ({ data, fetchData }) => {
  const [selectedBidder, setSelectedBidder] = useState(null);
  const [bidAmount, setBidAmount] = useState(0);
  const path = usePathname();
  const id = path.split("/").splice(-1)[0];
  const [requestLoading, setRequestLoading] = useState(false);

  const handlePlaceBid = async (bypass) => {
    if (!bypass && userId !== selectedBidder?.bidder?.id) return toast.error("This is not your bid.");
    try {
      setRequestLoading(true)
      const res = await bidOnAuction({
        productId: id,
        amount: Number(bidAmount),
      });
      if (res.success) {
        setRequestLoading(false)
        toast.success(res.message || "Bid placed successfully!");
        fetchData();
      } else {
        setRequestLoading(false)
        toast.error(res.message || "Failed to place bid.");
      }
    } catch (err) {
      setRequestLoading(false)
      toast.error(
        err?.response?.data?.message || err.message || "Failed to place bid.",
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
    if (userId !== selectedBidder?.bidder?.id) return toast.error("This is not your bid.")
    try {
      const res = await withdrawBidOfUser(selectedBidder?.auctionId);
      if (res?.success) {
        toast.success(res?.data?.message || "Bid withdrawn successfully.");
        fetchData();
      } else {
        toast.error(res?.message || "Failed to withdraw bid.");
      }
    } catch (error) {
      toast.error(error?.message || "An error occurred while withdrawing bid.");
    }
  };

  if (requestLoading) {
    return (
      <div className="w-full h-[100vh] z-50 bg-black/80 inset-0 fixed flex justify-center items-center">
        <svg className="animate-spin h-10 w-10 text-moonstone" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
        </svg>
      </div>
    )
  }

  return (
    <div className="flex w-full flex-col items-center justify-center bg-[#F8F7FB] px-3">
      {selectedBidder && (
        <div className="flex w-full items-center justify-center py-10">
          <div className="flex w-full max-w-[421px] flex-col items-center justify-center gap-4 rounded-[20px] bg-white p-5">
            <h1 className="text-[17px] font-medium leading-[23px] text-darkBlue">
              Place Your Bid
            </h1>
            <div className="flex w-full justify-between rounded-[11px] bg-[#FBFBFB] px-3 py-2.5">
              <div className="flex flex-col">
                <span className="text-lg text-battleShipGray">My Bid</span>
                <span className="text-[22px] font-medium text-eerieBlack">
                  ${bidAmount}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-[13px] font-medium">Status:</span>
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
            Bidders{" "}
            <span className="text-[18px] text-moonstone">
              ({data?.length || 0})
            </span>
          </h1>
          <div className="grid gap-2 sm:grid-cols-2 sm:gap-3 md:grid-cols-3 md:gap-5 lg:grid-cols-5">
            {data?.length > 0 ? (
              data?.map((bidder, index) => (
                <BidderCard
                  key={index}
                  bidder={bidder}
                  selectedBidder={selectedBidder}
                  setSelectedBidder={setSelectedBidder}
                />
              ))
            ) : (
              <p className="w-full text-red-400">No Bids Yet!</p>
            )}
          </div>
        </div>
      </div>
      {!selectedBidder && (
        <div className="flex w-full items-center justify-center py-10">
          <div className="flex w-full max-w-[421px] flex-col items-center justify-center gap-4 rounded-[20px] bg-white px-5 pb-10 pt-5">
            <h1 className="text-[17px] font-medium leading-[23px] text-darkBlue">
              Place Your Bid
            </h1>
            <div className="flex w-full items-center gap-2">
              <input
                type="number"
                name="yourBid"
                id="yourBid"
                placeholder="Enter your bid"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                className="h-[55px] w-full rounded-[6.7px] bg-[#F8F7FB] px-4 focus:outline-moonstone"
              />
              <button
                type="button"
                className="flex h-[55px] items-center justify-center rounded-[6.7px] bg-moonstone px-8 text-[17px] font-medium text-white transition-all duration-200 ease-in hover:bg-delftBlue"
                onClick={() => handlePlaceBid(true)}
              >
                Bid
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

"use client";

import BidderCard from "@/components/cards/BidderCard";
import AutoBidDialog from "./dialogs/AutoBidDialog";
import { dummyBidders } from "@/lib/dummy-bidders";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import UpdateBidDialog from "./dialogs/UpdateBidDialog";
import WithdrawBidDialog from "./dialogs/WithdrawBidDialog";

const BiddersSection = () => {
  const [selectedBidder, setSelectedBidder] = useState(null);
  const [bidAmount, setBidAmount] = useState(0);

  useEffect(() => {
    if (selectedBidder) {
      setBidAmount(selectedBidder.amount);
    }
  }, [selectedBidder]);

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
                <div className="rounded-[9px] bg-faluRed/10 px-3.5 py-1 text-[15px] text-faluRed">
                  Outbid
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
              />
            </div>
            <WithdrawBidDialog />
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
              ({dummyBidders.length})
            </span>
          </h1>
          <div className="grid gap-2 sm:grid-cols-2 sm:gap-3 md:grid-cols-3 md:gap-5 lg:grid-cols-5">
            {dummyBidders.map((bidder, index) => (
              <BidderCard
                key={index}
                bidder={bidder}
                selectedBidder={selectedBidder}
                setSelectedBidder={setSelectedBidder}
              />
            ))}
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
              <button className="flex h-[55px] items-center justify-center rounded-[6.7px] bg-moonstone px-8 text-[17px] font-medium text-white transition-all duration-200 ease-in hover:bg-delftBlue">
                Bid
              </button>
            </div>
            <AutoBidDialog bidAmount={bidAmount} setBidAmount={setBidAmount} />
          </div>
        </div>
      )}
    </div>
  );
};

export default BiddersSection;

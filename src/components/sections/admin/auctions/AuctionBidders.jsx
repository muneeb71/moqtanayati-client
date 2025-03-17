"use client";

import BidderCard from "@/components/cards/BidderCard";
import { dummyBidders } from "@/lib/dummy-bidders";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const AuctionBidders = () => {
  const [selectedBidder, setSelectedBidder] = useState(null);
  return (
    <div className="flex w-full flex-col items-center justify-center bg-[#F8F7FB] px-3">
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
    </div>
  );
};

export default AuctionBidders;

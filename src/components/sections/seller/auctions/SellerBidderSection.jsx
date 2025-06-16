"use client";

import BidderCard from "@/components/cards/BidderCard";
import { dummyBidders } from "@/lib/dummy-bidders";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import BidRetractionRequestsDialog from "./BidRetractionRequestsDialog";

const SellerBiddersSection = ({ bids }) => {
  const [selectedBidder, setSelectedBidder] = useState(null);
  const [bidAmount, setBidAmount] = useState(0);

  useEffect(() => {
    if (selectedBidder) {
      setBidAmount(selectedBidder.amount);
    }
  }, [selectedBidder]);

  return (
    <div className="flex w-full flex-col items-center justify-center bg-[#F8F7FB] px-3">
      <div className="flex w-full max-w-7xl flex-col border-black/10 py-10">
        <div className="flex flex-col gap-8">
          <div className="flex w-full flex-col items-center justify-between gap-3 md:flex-row">
            <h1 className="text-[32px] font-medium text-black/80">
              Bidders{" "}
              <span className="text-[18px] text-moonstone">
                ({bids.length})
              </span>
            </h1>
            <BidRetractionRequestsDialog />
          </div>
          {bids.length === 0 ? (
            <span className="text-[15px] leading-[23px] text-black/30">
              No Bids Yet
            </span>
          ) : (
            <div className="grid gap-2 sm:grid-cols-2 sm:gap-3 md:grid-cols-3 md:gap-5 lg:grid-cols-5">
              {bids.map((bidder, index) => (
                <BidderCard
                  key={index}
                  bidder={bidder}
                  selectedBidder={selectedBidder}
                  setSelectedBidder={setSelectedBidder}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SellerBiddersSection;

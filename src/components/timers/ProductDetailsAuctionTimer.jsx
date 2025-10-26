"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

const ProductDetailsAuctionTimer = ({ type = "", item }) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isAuctionEnded, setIsAuctionEnded] = useState(false);
  const [isAuctionInvalid, setIsAuctionInvalid] = useState(false);

  useEffect(() => {
    if (
      !item ||
      !item.auctionLaunchDate ||
      !item.auctionDuration ||
      isNaN(new Date(item.auctionLaunchDate).getTime())
    ) {
      setIsAuctionInvalid(true);
      return;
    }

    const launchDate = new Date(item.auctionLaunchDate);
    const endDate = new Date(
      launchDate.getTime() + item.auctionDuration * 24 * 60 * 60 * 1000,
    );

    const updateTimer = () => {
      const now = new Date();
      const diff = endDate - now;

      if (diff <= 0) {
        setIsAuctionEnded(true);
        return 0;
      }

      return Math.floor(diff / 1000); // seconds
    };

    setTimeLeft(updateTimer());

    const timer = setInterval(() => {
      const remaining = updateTimer();
      setTimeLeft(remaining);
      if (remaining <= 0) {
        clearInterval(timer);
        setIsAuctionEnded(true);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [item]);

  const formatTime = (time) => String(time).padStart(2, "0");

  const days = Math.floor(timeLeft / (24 * 3600));
  const hours = Math.floor((timeLeft % (24 * 3600)) / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  if (isAuctionInvalid) {
    return (
      <div className="flex flex-col gap-3">
        <span className="text-sm font-medium leading-[21px] text-orange-600">
          Auction details not available
        </span>
      </div>
    );
  }

  if (isAuctionEnded) {
    return (
      <div className="flex flex-col gap-3">
        <span className="text-sm font-medium leading-[21px] text-red-600">
          Auction Ended
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <span className="text-[14.4px] font-medium leading-[21px] text-[#484848]">
        Auction Ending In
      </span>
      <div className="flex items-center gap-2">
        {days > 0 && (
          <div className="flex flex-col items-center gap-1">
            <div className="grid size-[45.6px] place-items-center rounded-[6px] bg-moonstone/20 font-semibold text-moonstone">
              {formatTime(days)}
            </div>
            <span className="text-xs">Day</span>
          </div>
        )}
        <div className="flex flex-col items-center gap-1">
          <div className="grid size-[45.6px] place-items-center rounded-[6px] bg-moonstone/20 font-semibold text-moonstone">
            {formatTime(hours)}
          </div>
          <span className="text-xs">Hour</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="grid size-[45.6px] place-items-center rounded-[6px] bg-moonstone/20 font-semibold text-moonstone">
            {formatTime(minutes)}
          </div>
          <span className="text-xs">Min</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="grid size-[45.6px] place-items-center rounded-[6px] bg-moonstone/20 font-semibold text-moonstone">
            {formatTime(seconds)}
          </div>
          <span className="text-xs">Sec</span>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsAuctionTimer;

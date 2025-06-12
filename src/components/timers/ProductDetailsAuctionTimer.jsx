"use client";

import { cn } from "@/lib/utils";
import React, { useState, useEffect } from "react";

const ProductDetailsAuctionTimer = ({ type = "", item }) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isAuctionEnded, setIsAuctionEnded] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const createdAt = new Date(item.createdAt);
      const endTime = new Date(createdAt.getTime() + (item.auctionDuration * 24 * 60 * 60 * 1000));
      const now = new Date();
      const difference = endTime - now;

      if (difference <= 0) {
        setIsAuctionEnded(true);
        return 0;
      }

      return Math.floor(difference / 1000);
    };

    setTimeLeft(calculateTimeLeft());

    if (!isAuctionEnded) {
      const timer = setInterval(() => {
        const remaining = calculateTimeLeft();
        setTimeLeft(remaining);
        if (remaining <= 0) {
          setIsAuctionEnded(true);
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [item.createdAt, item.auctionDuration, isAuctionEnded]);

  const formatTime = (time) => String(time).padStart(2, "0");

  const days = Math.floor(timeLeft / (24 * 3600));
  const hours = Math.floor((timeLeft % (24 * 3600)) / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  if (isAuctionEnded) {
    return (
      <div className="flex flex-col gap-3">
        <span className={cn("text-sm font-medium leading-[21px] text-red-600")}>
          Auction Ended
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <span className={cn("text-[14.4px] font-medium leading-[21px] text-[#484848]")}>
        Auction Ending In
      </span>
      <div className="flex items-center gap-2">
        {days > 0 && (
          <div className="flex flex-col items-center gap-1">
            <div className={cn("grid size-[45.6px] place-items-center rounded-[6px] bg-moonstone/20 font-semibold text-moonstone")}>
              {formatTime(days)}
            </div>
            <span className="text-xs">Day</span>
          </div>
        )}
        <div className="flex flex-col items-center gap-1">
          <div className={cn("grid size-[45.6px] place-items-center rounded-[6px] bg-moonstone/20 font-semibold text-moonstone")}>
            {formatTime(hours)}
          </div>
          <span className="text-xs">Hour</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className={cn("grid size-[45.6px] place-items-center rounded-[6px] bg-moonstone/20 font-semibold text-moonstone")}>
            {formatTime(minutes)}
          </div>
          <span className="text-xs">Min</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className={cn("grid size-[45.6px] place-items-center rounded-[6px] bg-moonstone/20 font-semibold text-moonstone")}>
            {formatTime(seconds)}
          </div>
          <span className="text-xs">Sec</span>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsAuctionTimer;

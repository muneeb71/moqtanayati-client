"use client";

import { cn } from "@/lib/utils";
import React, { useState, useEffect } from "react";

const AuctionTimer = ({ type = "" }) => {
  const [timeLeft, setTimeLeft] = useState(4 * 3600 + 12 * 60 + 30);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  const formatTime = (time) => String(time).padStart(2, "0");

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="flex flex-col gap-3">
      <span
        className={cn(
          "font-medium text-[#484848]",
          type == "productDetails"
            ? "text-[14.4px] leading-[21px]"
            : "text-[19px] leading-[29px]",
        )}
      >
        Auction Ending In
      </span>
      <div className="flex items-center gap-2">
        <div className="flex flex-col items-center gap-1">
          <div
            className={cn(
              "grid place-items-center rounded-[6px] bg-moonstone/20 font-semibold text-moonstone",
              type == "productDetails"
                ? "size-[45.6px]"
                : "size-[57.5px] text-[21px]",
            )}
          >
            {formatTime(hours)}
          </div>
          <span className={(type = "productDetails" ? "hidden" : "")}>Hr</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div
            className={cn(
              "grid place-items-center rounded-[6px] bg-moonstone/20 font-semibold text-moonstone",
              type == "productDetails"
                ? "size-[45.6px]"
                : "size-[57.5px] text-[21px]",
            )}
          >
            {formatTime(minutes)}
          </div>
          <span className={(type = "productDetails" ? "hidden" : "")}>Min</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div
            className={cn(
              "grid place-items-center rounded-[6px] bg-moonstone/20 font-semibold text-moonstone",
              type == "productDetails"
                ? "size-[45.6px]"
                : "size-[57.5px] text-[21px]",
            )}
          >
            {formatTime(seconds)}
          </div>
          <span className={(type = "productDetails" ? "hidden" : "")}>Sec</span>
        </div>
      </div>
    </div>
  );
};

export default AuctionTimer;

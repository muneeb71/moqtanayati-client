"use client";

import { cn } from "@/lib/utils";
import React, { useState, useEffect } from "react";

const AuctionTimer = ({ type = "", auctionLaunchDate, auctionDuration }) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted) return;

    const endTime = auctionLaunchDate && auctionDuration
      ? new Date(auctionLaunchDate).getTime() + auctionDuration * 24 * 60 * 60 * 1000
      : null;

    if (!endTime) return;

    const getInitialTimeLeft = () => Math.max(0, Math.floor((endTime - Date.now()) / 1000));
    setTimeLeft(getInitialTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [hasMounted, auctionLaunchDate, auctionDuration]);

  const formatTime = (time) => String(time).padStart(2, "0");

  const days = Math.floor(timeLeft / (3600 * 24));
  const hours = Math.floor((timeLeft % (3600 * 24)) / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  const renderPlaceholder = () => (
    <div className="flex items-center gap-2">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="flex flex-col items-center gap-1">
          <div
            className={cn(
              "grid place-items-center rounded-[6px] bg-moonstone/20 font-semibold text-moonstone",
              type == "productDetails"
                ? "size-[45.6px]"
                : "size-[57.5px] text-[21px]",
            )}
          >
            --
          </div>
          <span className={type == "productDetails" ? "hidden" : ""}>
            {i === 0 ? "Day" : i === 1 ? "Hr" : i === 2 ? "Min" : "Sec"}
          </span>
        </div>
      ))}
    </div>
  );

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
      {!hasMounted ? renderPlaceholder() : (
        <div className="flex items-center gap-2">
          {days > 0 && (
            <div className="flex flex-col items-center gap-1">
              <div
                className={cn(
                  "grid place-items-center rounded-[6px] bg-moonstone/20 font-semibold text-moonstone",
                  type == "productDetails"
                    ? "size-[45.6px]"
                    : "size-[57.5px] text-[21px]",
                )}
              >
                {formatTime(days)}
              </div>
              <span className={type == "productDetails" ? "hidden" : ""}>Day</span>
            </div>
          )}
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
            <span className={type == "productDetails" ? "hidden" : ""}>Hr</span>
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
            <span className={type == "productDetails" ? "hidden" : ""}>Min</span>
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
            <span className={type == "productDetails" ? "hidden" : ""}>Sec</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuctionTimer;

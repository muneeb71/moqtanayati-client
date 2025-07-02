"use client";

import ProductDetailsAuctionTimer from "@/components/timers/ProductDetailsAuctionTimer";
import QaSectionSheet from "../../landing/product-details/dialogs/qa-sheet/QaSectionSheet";
import Image from "next/image";
import { useState } from "react";

const AuctionProductDetailsCard = ({ auction }) => {
  const getHighestBid = () => {
    if (!auction.bids || auction.bids.length === 0) return null;
    return auction.bids.reduce(
      (highest, current) =>
        !highest || current.amount > highest.amount ? current : highest,
      null,
    );
  };

  
  
  const [highestBid, setHighestBid] = useState(getHighestBid());

  return (
    <div className="flex w-full flex-col md:px-10">
      <div className="flex w-full max-w-[404px] flex-col gap-[52px]">
        <div className="flex w-full flex-col gap-[42px]">
          <div className="flex w-full flex-col gap-6">
            <div className="flex w-full items-end justify-between md:gap-[33px]">
              <div className="flex flex-col">
                <h2 className="max-w-[258px] truncate font-medium md:text-[19.2px] md:leading-[29px]">
                  {auction?.product.name}
                </h2>
                <h1 className="text-[24px] font-medium leading-[40px] md:text-[28.8px] md:leading-[43px]">
                  ${auction?.product.buyItNow.toFixed(2)}
                </h1>
              </div>
              <div className="flex flex-col justify-end gap-2.5">
                <span className="text-right text-[14.4px] leading-[21px] text-battleShipGray">
                  1hr ago
                </span>
                <QaSectionSheet />
              </div>
            </div>
            <ProductDetailsAuctionTimer item={auction.product} />
          </div>
          <div className="flex w-full flex-col gap-2">
            <h1 className="font-medium text-black/70">Product Description</h1>
            <p className="text-[14.4px] leading-[21px] text-black/40">
              {auction.product.description}
            </p>
          </div>
          {auction.bids.length === 0 ? (
            <span className="text-[15px] leading-[23px] text-black/30">
              No Bids Yet
            </span>
          ) : (
            <div className="flex w-fit flex-col justify-between rounded-xl bg-moonstone/10 py-4 pl-3 pr-10">
              <span className="text-[15px] leading-[23px] text-black/30">
                Highest Bid
              </span>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-medium">${highestBid?.amount?.toFixed(2) ?? "0.00"}</span>
                <span className="text-xs text-black/30">by</span>
                <Image
                  src={highestBid?.bidder?.avatar || "/static/dummy-user/1.jpeg"}
                  width={20}
                  height={20}
                  alt="user"
                  quality={100}
                  loading="lazy"
                  className="rounded-full"
                />
                <span className="text-xs font-medium text-black/80">
                  {highestBid?.bidder?.name || "Unknown"}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuctionProductDetailsCard;

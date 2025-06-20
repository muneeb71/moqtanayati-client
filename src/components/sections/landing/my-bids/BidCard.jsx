"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

const BidCard = ({ item }) => {  
  const [favourite, setFavourite] = useState(item.isFavourite);
  const highestBid = Math.max(...item.auction.bids.map(bid => bid.amount));
  const myBidIsHighest = item.amount === highestBid;
  let displayStatus = item.bidStatus;
  if (item.auction.status === 'ENDED') {
    displayStatus = myBidIsHighest ? 'Won' : 'Ongoing';
  }
  return (
    <div
      className="grid h-full max-h-[138px] grid-cols-[96px_1fr] overflow-hidden rounded-[12px] bg-white sm:grid-cols-[126px_1fr]"
      style={{
        boxShadow: "0px 0px 29.85px 2.39px #0000001A",
      }}
    >
      <div className="h-full w-full overflow-hidden">
        <Image
          src={item?.auction?.product?.images[0]}
          width={200}
          height={200}
          className="h-full w-full object-cover"
          alt="Image"
        />
      </div>
      <div className="flex h-full w-full flex-col justify-between p-2">
        <div className="flex justify-between gap-2">
          <div className="flex flex-col px-1.5">
            <span className="max-w-[200px] truncate text-[16.72px] font-medium leading-[25px]">
              {item?.auction?.product?.name}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[11.9px] font-medium leading-[18px] text-black/30">
                by
              </span>
              <div className="flex items-center gap-1">
                <div className="size-[19.1px] min-h-[19.1px] min-w-[19.1px] overflow-hidden rounded-full">
                  <Image
                    src={item?.auction?.seller?.avatar || '/static/user.jpeg'}
                    width={100}
                    height={100}
                    className="h-full w-full object-cover"
                    alt="user"
                  />
                </div>
                <span className="text-[11.9px] font-medium leading-[18px] text-black/70">
                  {item?.auction?.seller?.name}
                </span>
              </div>
            </div>
          </div>
          <button
            className={cn(
              "grid size-[33px] place-items-center rounded-[4.6px] bg-black/10",
              favourite ? "text-[#F16D6F]" : "text-white",
            )}
            onClick={() => setFavourite(!favourite)}
          >
            {heartIcon}
          </button>
        </div>
        <div className="h-[1px] w-full bg-black bg-opacity-[0.02]"></div>
        <div className="flex items-center justify-between gap-5 px-1.5">
          <div className="flex flex-col">
            <span className="text-[11.9px] leading-[18px] text-black/40">
              Highest Bid
            </span>
            <span className="sm:text-lg font-medium">
              ${highestBid}
            </span>
          </div>
          <div
            className={cn(
              displayStatus == "Won"
                ? "bg-moonstone/10 text-moonstone"
                : displayStatus == "Active"
                  ? "bg-[#E8F5FF] text-[#1B97FC]"
                  : "bg-faluRed bg-faluRed/10",
              "h-fit rounded-[8px] px-3 py-1 sm:px-5 sm:py-2 text-sm font-medium leading-[21px]",
              "transition-all duration-150 ease-in",
            )}
          >
            {displayStatus}
          </div>
        </div>
      </div>
    </div>
  );
};

const heartIcon = (
  <svg
    width="25"
    height="20"
    viewBox="0 0 25 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0.984375 6.8226C0.984375 12.2192 5.78369 15.095 9.29689 17.6691C10.5366 18.5774 11.7306 19.4326 12.9247 19.4326C14.1187 19.4326 15.3127 18.5774 16.5525 17.6691C20.0657 15.095 24.865 12.2192 24.865 6.8226C24.865 1.42595 18.2976 -2.40125 12.9247 2.78702C7.55173 -2.40125 0.984375 1.42595 0.984375 6.8226Z"
      fill="currentColor"
    />
  </svg>
);

export default BidCard;

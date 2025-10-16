"use client";

import { ChevronRight, User as UserIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const AuctionCard = ({
  id = 1,
  title = "",
  bids = [],
  image,
  user = "test user",
  address = "",
  isFavourite = false,
}) => {
  const router = useRouter();

  const getHighestBid = () => {
    return bids.reduce(
      (highest, current) =>
        !highest || current.amount > highest.amount ? current : highest,
      null,
    );
  };

  const [highestBid, setHighestBid] = useState(getHighestBid());

  const [isNavigatingReview, setIsNavigatingReview] = useState(false);

  const handleReviewClick = () => {
    if (isNavigatingReview) return;
    setIsNavigatingReview(true);
    router.push("/seller/auctions/product-details/" + id);
  };

  return (
    <div
      className="relative flex w-full overflow-hidden rounded-[12px]"
      style={{
        boxShadow: "0px 0px 10px 2px #0000001A",
      }}
    >
      {isNavigatingReview && (
        <div className="absolute inset-0 z-10 grid place-items-center bg-black/5">
          <span className="rounded-md bg-moonstone px-3 py-1.5 text-xs text-white">
            Going to review auction
          </span>
        </div>
      )}
      <div className="rounded-top relative size-32 min-w-32 cursor-pointer">
        {typeof image === "string" && image.trim() !== "" ? (
          <Image
            src={image}
            width={800}
            height={200}
            alt={title}
            loading="lazy"
            className="h-full w-full object-cover"
            onClick={() =>
              router.push("/seller/auctions/product-details/" + id)
            }
          />
        ) : (
          <div
            className="h-full w-full bg-[#F3F3F6]"
            onClick={() =>
              router.push("/seller/auctions/product-details/" + id)
            }
          />
        )}
      </div>
      <div className="relative flex w-full cursor-pointer flex-col px-2.5 py-2">
        <div className="absolute right-0 top-0 flex items-baseline gap-1 rounded-bl-xl rounded-tr-xl bg-russianViolet/10 px-3 py-1.5 font-medium text-russianViolet">
          {bids?.length || 0}{" "}
          <span className="text-xs text-russianViolet/70">Bidders</span>
        </div>
        <p className="max-w-36 truncate text-nowrap text-black/70">{title}</p>
        {bids.length === 0 ? (
          <span className="text-[15px] leading-[23px] text-black/30">
            No Bids
          </span>
        ) : (
          <div className="flex flex-col justify-between">
            <span className="text-[15px] leading-[23px] text-black/30">
              Highest Bid
            </span>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-medium">
                ${highestBid.amount.toFixed(2)}
              </span>
              <span className="text-xs text-black/30">by</span>
              {typeof highestBid?.bidder?.avatar === "string" &&
              highestBid.bidder.avatar.trim() !== "" ? (
                <Image
                  src={highestBid.bidder.avatar}
                  width={20}
                  height={20}
                  alt={highestBid?.bidder?.name || "user"}
                  quality={100}
                  loading="lazy"
                  className="rounded-full object-cover"
                />
              ) : (
                <div className="grid size-5 place-items-center rounded-full bg-black/10">
                  <UserIcon className="size-3.5 text-black/40" />
                </div>
              )}
              <span className="text-xs font-medium text-black/80">
                {highestBid.bidder.name}
              </span>
            </div>
          </div>
        )}
        <button
          type="button"
          onClick={handleReviewClick}
          disabled={isNavigatingReview}
          className="flex w-full items-center justify-end gap-1 px-2 pt-3 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span className="text-sm font-medium text-russianViolet">
            Review Auction
          </span>
          <ChevronRight className="size-4 text-russianViolet" />
        </button>
      </div>
    </div>
  );
};

export default AuctionCard;

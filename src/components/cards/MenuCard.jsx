"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import BidPopup from "../popup/BidPopup";
import bidOnAuctionApi from "@/lib/api/auctions/bid";
import toast from "react-hot-toast";
import { getCookie } from "cookies-next";
import useTranslation from "@/hooks/useTranslation";

const MenuCard = ({
  title = "",
  price = 0,
  image,
  user = "",
  isFavourite = false,
  productId = "",
  highestBid,
  startingBid = 0,
  showBidButton = true,
  status = "",
  isAlreadyBidded = false,
}) => {
  const router = useRouter();
  const path = usePathname();
  const { t } = useTranslation();
  const [favourite, setFavourite] = useState(isFavourite);
  const [bidPopup, setBidPopup] = useState(false);
  const [bidAmount, setBidAmount] = useState(price);
  const [latestBid, setLatestBid] = useState(price);

  const getHourAgo = () => {
    const now = new Date();
    return now.getHours() - 1 + "hr ago";
  };

  const bidOnAuction = async () => {
    const userId = getCookie("userId");
    if (!userId) {
      toast.error(t("buyer.bidders.sign_in_to_bid"));
      router.push(`/buyer/login?returnUrl=${encodeURIComponent(path)}`);
      return;
    }
    try {
      // Enforce minimum allowed amount: startingBid > highestBid > price
      const minAllowed =
        (startingBid && startingBid > 0 && startingBid) ||
        (highestBid && highestBid > 0 && highestBid) ||
        (price && price > 0 && price) ||
        0;
      if (!bidAmount || Number(bidAmount) < Number(minAllowed)) {
        toast.error(
          `Your offer must be at least $${Number(minAllowed).toFixed(2)}.`,
        );
        return;
      }
      const res = await bidOnAuctionApi({ productId, amount: bidAmount });
      if (res.success) {
        setLatestBid(res.data.amount);
        setBidPopup(false);
        toast.success(res.message || "Bid placed successfully!");
      } else {
        toast.error(res.message || "Failed to place bid.");
      }
    } catch (err) {
      toast.error(
        err?.response?.data?.message || err.message || "Failed to place bid.",
      );
      console.log("Failed to place bid:", err);
    }
  };

  useEffect(() => {
    if (!bidPopup) setBidAmount(latestBid);
  }, [bidPopup, latestBid]);

  return (
    <>
      <div
        className="flex min-h-[96px] w-full cursor-pointer overflow-hidden rounded-[12px]"
        style={{
          boxShadow: "0px 0px 10px 2px #0000001A",
        }}
        onClick={() => router.push("/buyer/product-details/" + productId)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            router.push("/buyer/product-details/" + productId);
          }
        }}
      >
        <div className="rounded-top relative h-24 w-1/4">
          <Image
            src={image || "/static/dummy-items/1.jpeg"}
            width={800}
            height={200}
            alt={title}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex w-3/4 flex-col justify-between px-2.5 py-2">
          <div className="flex flex-col border-b border-black border-opacity-[0.02] pb-1">
            <p className="max-w-[241px] truncate text-nowrap text-[18px] leading-[27px] text-black/70">
              {title}
            </p>
            <div className="flex gap-2 text-xs">
              <p>By</p>
              <p>{user}</p>
            </div>
          </div>
          <div className="flex items-center justify-between pt-1">
            <div className="flex flex-col items-center justify-between">
              <span className="text-[15px] leading-[23px] text-black/30">
                {startingBid == highestBid ? "Starting Bid" : "Highest Bid"}
              </span>
              <span className="text-[21px] font-medium leading-[32px]">
                ${highestBid?.toFixed(2)}
              </span>
            </div>
            {status === "UPCOMING" ? (
              <div className="rounded-lg bg-gray-400 px-4 py-2 text-white">
                Upcoming
              </div>
            ) : status === "ENDED" ? (
              <div className="rounded-lg bg-gray-400 px-4 py-2 text-white">
                Auction Ended
              </div>
            ) : isAlreadyBidded ? (
              <button
                type="button"
                className="rounded-lg bg-moonstone px-4 py-2 text-white transition-colors hover:bg-moonstone/80"
                onClick={(e) => {
                  e.stopPropagation();
                  setBidPopup(true);
                }}
                tabIndex={0}
              >
                Bid Again
              </button>
            ) : showBidButton ? (
              <button
                type="button"
                className="rounded-lg bg-moonstone px-4 py-2 text-white transition-colors hover:bg-moonstone/80"
                onClick={(e) => {
                  e.stopPropagation();
                  setBidPopup(true);
                }}
                tabIndex={0}
              >
                Bid Now
              </button>
            ) : (
              <div className="rounded-lg bg-gray-400 px-4 py-2 text-white">
                Auction Ended
              </div>
            )}
          </div>
        </div>
      </div>
      {bidPopup && (
        <BidPopup
          open={bidPopup}
          handleBid={bidOnAuction}
          bidAmount={bidAmount}
          onBidChange={setBidAmount}
          onOpenChange={(open) => setBidPopup(open)}
        />
      )}
    </>
  );
};

const heartIcon = (
  <svg
    width="31"
    height="25"
    viewBox="0 0 31 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0.400391 8.3145C0.400391 15.2316 6.55189 18.9176 11.0549 22.2169C12.6439 23.3812 14.1744 24.4773 15.7048 24.4773C17.2353 24.4773 18.7657 23.3812 20.3547 22.2169C24.8578 18.9176 31.0092 15.2316 31.0092 8.3145C31.0092 1.39736 22.5915 -3.50813 15.7048 3.14192C8.81807 -3.50813 0.400391 1.39736 0.400391 8.3145Z"
      fill="currentColor"
    />
  </svg>
);

export default MenuCard;

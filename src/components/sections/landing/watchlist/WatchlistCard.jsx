"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useTranslation from "@/hooks/useTranslation";

const WatchlistCard = ({ item, removeFromWatchlist }) => {
  const { t } = useTranslation();
  const [favourite, setFavourite] = useState(true);
  const router = useRouter();

  // Debug: Log the item data to see the structure
  console.log("🔍 [WatchlistCard] Item data:", item);
  console.log(
    "🔍 [WatchlistCard] Product images:",
    item?.auction?.product?.images,
  );

  const handleCardClick = () => {
    const id = item?.auction?.product?.id;
    if (id) router.push(`/buyer/product-details/${id}`);
  };
  return (
    <div
      className="grid h-full max-h-[138px] cursor-pointer grid-cols-[96px_1fr] overflow-hidden rounded-[12px] bg-white sm:grid-cols-[126px_1fr]"
      style={{ boxShadow: "0px 0px 29.85px 2.39px #0000001A" }}
      onClick={handleCardClick}
    >
      <div className="h-full w-full overflow-hidden">
        {item?.auction?.product?.images &&
        item.auction.product.images.length > 0 &&
        item.auction.product.images[0] ? (
          <Image
            src={item.auction.product.images[0]}
            width={200}
            height={200}
            className="h-full w-full object-cover"
              alt={t("buyer.watchlist.product_image")}
            unoptimized={true} // Allow external images
            onError={(e) => {
              console.log("🔍 [WatchlistCard] Image load error:", e);
              // Hide the image and show fallback
              e.target.style.display = "none";
            }}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-100">
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-gray-400"
            >
              <path
                d="M4 16L8.5 10.5L13 14L20.5 4.5L21 5L13.5 15L9 11.5L4 16Z"
                fill="currentColor"
              />
              <path d="M3 19H21V21H3V19Z" fill="currentColor" />
            </svg>
          </div>
        )}
      </div>
      <div className="flex h-full w-full flex-col justify-between p-2">
        <div className="flex justify-between gap-2">
          <div className="flex flex-col px-1.5">
            <span className="max-w-[200px] truncate text-[16.72px] font-medium leading-[25px]">
              {item?.auction?.product?.name}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-black/30">
                {t("buyer.watchlist.by")}
              </span>
              <div className="flex items-center gap-1">
                <div className="size-[19.1px] min-h-[19.1px] min-w-[19.1px] overflow-hidden rounded-full">
                  {item?.auction?.seller?.avatar ? (
                    <Image
                      src={item.auction.seller.avatar}
                      width={100}
                      height={100}
                      className="h-full w-full object-cover"
                      alt={t("buyer.watchlist.user")}
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gray-200">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-gray-500"
                      >
                        <path
                          d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
                          fill="currentColor"
                        />
                        <path
                          d="M12 14C7.58172 14 4 17.5817 4 22H20C20 17.5817 16.4183 14 12 14Z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                  )}
                </div>
                <span className="text-xs font-medium text-black/70">
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
            onClick={(e) => {
              e.stopPropagation();

              removeFromWatchlist(item?.id);
            }}
          >
            {heartIcon}
          </button>
        </div>
        <div className="h-[1px] w-full bg-black bg-opacity-[0.02]"></div>
        <div className="flex items-center justify-between gap-5 px-1.5">
          <div className="flex flex-col">
            <span className="text-xs text-black/40">
              {t("buyer.watchlist.highest_bid")}
            </span>
            <span className="text-lg font-medium">
              ${item?.auction?.product?.minimumOffer}
            </span>
          </div>
          {/* <button
            className={cn(
              "h-fit rounded-[8px] bg-moonstone/10 px-3 py-1 text-sm font-medium leading-[21px] text-moonstone sm:px-5 sm:py-2",
              "transition-all duration-150 ease-in hover:bg-moonstone hover:text-white",
            )}
          >
            Bid Now
          </button> */}
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

export default WatchlistCard;

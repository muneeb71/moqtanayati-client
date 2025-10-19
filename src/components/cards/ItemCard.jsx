"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { handleFavoriteClient } from "@/lib/api/product/handleFavoriteClient";
import toast from "react-hot-toast";

const ItemCard = ({
  id = 1,
  title = "",
  price = 0,
  createdAt = "",
  image,
  address = "",
  isFavourite = false,
  pricingFormat,
  buyItNow,
}) => {
  const router = useRouter();
  const [favourite, setFavourite] = useState(isFavourite);
  const [loading, setLoading] = useState(false);

  const getHourAgo = () => {
    const now = new Date();
    return now.getHours() - 1 + "hr ago";
  };

  const handleFavoriteClick = async (e) => {
    e.stopPropagation(); // Prevent card click
    if (loading) return;

    setLoading(true);
    try {
      const response = await handleFavoriteClient(id, pricingFormat);

      console.log("response from handleFavouriteClient 0 : ", response);
      console.log("response from handleFavouriteClient 1 : ", response.data);
      console.log(
        "response from handleFavouriteClient 2: ",
        response.data?.data,
      );

      if (response?.success) {
        setFavourite(!favourite);
        if (response?.warning) {
          toast.success(
            "Favorite functionality not yet available for this product",
          );
        } else if (response?.data?.message === "Item already in watchlist") {
          // Item is already in watchlist, so it should be marked as favorite
          setFavourite(true);
          toast.success("Item is already in your watchlist");
        } else {
          toast.success(
            favourite ? "Removed from favorites" : "Added to favorites",
          );
        }
      } else {
        if (response?.warning) {
          toast.warning(response?.warning);
        } else {
          toast.error(response?.error || "Failed to update favorites");
        }
      }
    } catch (error) {
      console.error("Favorite error:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex h-72 w-full flex-col overflow-hidden rounded-[12px]"
      style={{
        boxShadow: "0px 0px 10px 2px #0000001A",
      }}
    >
      <div className="rounded-top relative h-[250px] cursor-pointer overflow-hidden sm:h-[188px]">
        {image && image.trim() !== "" ? (
          <Image
            src={image}
            width={800}
            height={200}
            alt={title}
            loading="lazy"
            onClick={() => router.push("/buyer/product-details/" + id)}
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center bg-gray-100"
            onClick={() => router.push("/buyer/product-details/" + id)}
          >
            <div className="flex flex-col items-center justify-center text-gray-400">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mb-2"
              >
                <path
                  d="M4 16L8.5 10.5L13 14L16.5 9.5L20 13V4H4V16Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <rect
                  x="2"
                  y="2"
                  width="20"
                  height="20"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
              <span className="text-sm">No Image</span>
            </div>
          </div>
        )}
        {pricingFormat == "Auctions" && (
          <button
            className={cn(
              "absolute right-3 top-3 grid size-[43px] place-items-center rounded-[4.6px] bg-black/10 transition-all duration-200",
              favourite ? "text-[#F16D6F]" : "text-white",
              loading && "cursor-not-allowed opacity-50",
            )}
            onClick={handleFavoriteClick}
            disabled={loading}
          >
            {loading ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            ) : (
              heartIcon
            )}
          </button>
        )}
      </div>
      <div
        className="flex w-full cursor-pointer flex-col px-2.5 py-2"
        onClick={() => router.push("/buyer/product-details/" + id)}
      >
        <div className="flex items-center justify-between">
          <span className="text-[21px] font-medium leading-[32px]">
            $
            {price !== 0
              ? price?.toFixed(2)
              : buyItNow
                ? buyItNow?.toFixed(2)
                : "0.00"}
          </span>
          <span className="text-[15px] leading-[23px] text-black/30">
            {getHourAgo(createdAt)}
          </span>
        </div>
        <span className="max-w-[241px] truncate text-nowrap text-[18px] leading-[27px] text-black/70">
          {title}
        </span>
        <span className="max-w-[241px] truncate text-nowrap text-[15px] leading-[23px] text-black/30">
          {address}
        </span>
      </div>
    </div>
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

export default ItemCard;

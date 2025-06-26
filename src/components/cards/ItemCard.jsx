"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ItemCard = ({
  id = 1,
  title = "",
  price = 0,
  createdAt = "",
  image,
  address = "",
  isFavourite = false,
  pricingFormat
}) => {
  const router = useRouter();
  const [favourite, setFavourite] = useState(isFavourite);

  const getHourAgo = () => {
    const now = new Date();
    return now.getHours() - 1 + "hr ago";
  };

  return (
    <div
      className="flex w-full flex-col overflow-hidden rounded-[12px] h-72"
      style={{
        boxShadow: "0px 0px 10px 2px #0000001A",
      }}
    >
      <div className="rounded-top relative h-[250px] cursor-pointer overflow-hidden sm:h-[188px]">
        <Image
          src={image}
          width={800}
          height={200}
          alt={title}
          loading="lazy"
          onClick={() => router.push("/buyer/product-details/" + id)}
        />
        {pricingFormat == "Auctions" && <button
          className={cn(
            "absolute right-3 top-3 grid size-[43px] place-items-center rounded-[4.6px] bg-black/10",
            favourite ? "text-[#F16D6F]" : "text-white",
          )}
          onClick={() => setFavourite(!favourite)}
        >
          {heartIcon}
        </button>}
      </div>
      <div
        className="flex w-full cursor-pointer flex-col px-2.5 py-2"
        onClick={() => router.push("/buyer/product-details/" + id)}
      >
        <div className="flex items-center justify-between">
          <span className="text-[21px] font-medium leading-[32px]">
            ${price.toFixed(2)}
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

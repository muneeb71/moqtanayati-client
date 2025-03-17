"use client";

import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const AuctionCard = ({
  id = 1,
  title = "",
  price = 0,
  image,
  user = "test user",
  address = "",
  isFavourite = false,
}) => {
  const router = useRouter();

  return (
    <div
      className="flex w-full overflow-hidden rounded-[12px]"
      style={{
        boxShadow: "0px 0px 10px 2px #0000001A",
      }}
    >
      <div className="rounded-top relative size-32 min-w-32 cursor-pointer">
        <Image
          src={image}
          width={800}
          height={200}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover"
          onClick={() => router.push("/seller/auctions/product-details/" + id)}
        />
      </div>
      <div
        className="relative flex w-full cursor-pointer flex-col px-2.5 py-2"
        onClick={() => router.push("/seller/auctions/product-details/" + id)}
      >
        <div className="absolute right-0 top-0 flex items-baseline gap-1 rounded-bl-xl rounded-tr-xl bg-russianViolet/10 px-3 py-1.5 font-medium text-russianViolet">
          12 <span className="text-xs text-russianViolet/70">Bidders</span>
        </div>
        <p className="max-w-36 truncate text-nowrap text-black/70">{title}</p>
        <div className="flex flex-col justify-between">
          <span className="text-[15px] leading-[23px] text-black/30">
            Highest Bid
          </span>
          <div className="flex items-center gap-1.5">
            <span className="text-xl font-medium">${price.toFixed(2)}</span>
            <span className="text-xs text-black/30">by</span>
            <Image
              src="/dummy-user/1.jpeg"
              width={20}
              height={20}
              alt="user"
              quality={100}
              loading="lazy"
              className="rounded-full"
            />
            <span className="text-xs font-medium text-black/80">
              Kathryn Murphy
            </span>
          </div>
        </div>
        <div className="flex w-full items-center justify-end gap-1 px-2 pt-3">
          <span className="text-sm font-medium text-russianViolet">
            Review Auction
          </span>
          <ChevronRight className="size-4 text-russianViolet" />
        </div>
      </div>
    </div>
  );
};

export default AuctionCard;

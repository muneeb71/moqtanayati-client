"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DraftCard = ({
  id = 1,
  title = "",
  price = 0,
  createdAt = "",
  image,
  address = "",
}) => {
  const router = useRouter();

  const getHourAgo = () => {
    const now = new Date();
    return now.getHours() - 1 + "hr ago";
  };

  return (
    <div
      className="flex w-full flex-col overflow-hidden rounded-[12px]"
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
          onClick={() => router.push("/product-details/" + id)}
        />
      </div>
      <div
        className="flex w-full cursor-pointer flex-col px-2.5 py-2"
        onClick={() => router.push("/product-details/" + id)}
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

export default DraftCard;

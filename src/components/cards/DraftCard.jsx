"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DraftCard = ({ draft }) => {
  const router = useRouter();

  const getHourAgo = () => {
    const now = new Date();
    return now.getHours() - 1 + "hr ago";
  };

  console.log(draft)

  return (
    <div
      className="flex w-full flex-col overflow-hidden rounded-[12px]"
      style={{
        boxShadow: "0px 0px 10px 2px #0000001A",
      }}
    >
      <div className="rounded-top relative h-[250px] cursor-pointer overflow-hidden sm:h-[188px]">
        <Image
          src={
            draft.images[0]
              ? process.env.NEXT_PUBLIC_BACKEND_BASE_URL + draft.images[0]
              : "/static/dummy-items/7.jpeg"
          }
          width={800}
          height={200}
          alt={draft.name}
          loading="lazy"
          onClick={() => router.push("/product-details/" + draft.id)}
        />
      </div>
      <div
        className="flex w-full cursor-pointer flex-col px-2.5 py-2"
        onClick={() => router.push("/product-details/" + draft.id)}
      >
        <div className="flex items-center justify-between">
          <span className="text-[21px] font-medium leading-[32px]">
            $
            {draft.price ? draft.price?.toFixed(2) : draft.buyItNow?.toFixed(2)}
          </span>
          <span className="text-[15px] leading-[23px] text-black/30">
            {getHourAgo(draft.createdAt)}
          </span>
        </div>
        <span className="max-w-[241px] truncate text-nowrap text-[18px] leading-[27px] text-black/70">
          {draft.name}
        </span>
        <span className="max-w-[241px] truncate text-nowrap text-[15px] leading-[23px] text-black/30">
          {draft.address}
        </span>
      </div>
    </div>
  );
};

export default DraftCard;

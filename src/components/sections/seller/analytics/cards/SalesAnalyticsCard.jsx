import { arrowUpRightIcon } from "@/assets/icons/seller-icons";
import React from "react";

const SalesAnalyticsCard = () => {
  return (
    <div
      className="flex w-full flex-col rounded-[30px] px-6 py-10"
      style={{
        background: "linear-gradient(96.27deg, #BEF4E6 0.6%, #DEF3E5 97.11%)",
      }}
    >
      <h1 className="text-2xl font-semibold">Sale</h1>
      <div className="grid w-full grid-cols-2">
        <span className="flex h-full items-end text-4xl font-semibold">
          $3000.00
        </span>
        <div className="flex w-fit flex-col items-end gap-5 text-[#329B57]">
          {arrowUpRightIcon}
          <div className="rounded-lg bg-white px-2 py-0.5 text-xl">+11.01%</div>
        </div>
      </div>
    </div>
  );
};

export default SalesAnalyticsCard;

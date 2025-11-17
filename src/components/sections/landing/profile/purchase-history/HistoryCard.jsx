"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import LeaveFeedbackDialog from "./LeaveFeedbackDialog";
import toast from "react-hot-toast";
import useTranslation from "@/hooks/useTranslation";

const HistoryCard = ({ item }) => {
  const { t } = useTranslation();
  const formattedDate = new Date(
    item.createdAt || item.purchaseTime,
  ).toLocaleString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "UTC",
  });

  return (
    <div className="grid h-full min-h-fit grid-cols-[120px_1fr] gap-2 overflow-hidden sm:min-h-[138px] sm:place-items-center">
      <div className="aspect-square min-w-[120px] overflow-hidden rounded-2xl border border-black/5">
        <Image
          src={
            item.product?.images?.[0] ||
            item.image ||
            "/api/static/dummy-items/1.jpeg"
          }
          width={200}
          height={200}
          className="h-full w-full object-cover"
          alt="Image"
        />
      </div>
      <div className="flex h-full w-full flex-col justify-between gap-2 sm:flex-row sm:items-center">
        <div className="flex flex-col px-1.5">
          <span className="truncate text-black/70 sm:max-w-[200px] sm:text-lg">
            {item.product?.name ||
              item.title ||
              t("buyer.purchase_history.no_name")}
          </span>
          <span className="font-medium sm:text-xl">
            ${item.totalAmount != null ? item.totalAmount : 350.0}
          </span>
          <span className="text-xs font-medium text-battleShipGray sm:text-sm">
            {formattedDate}
          </span>
          <div
            className={cn(
              item.status == "Delivered"
                ? "bg-moonstone/10 text-moonstone"
                : "bg-[#FAF3E9] text-[#CC8B20]",
              "mt-2 hidden h-fit w-fit rounded-[8px] px-5 py-2 text-sm font-medium sm:flex",
            )}
          >
            {item.status}
          </div>
        </div>
        <div className="flex h-full items-end gap-2 sm:flex-col sm:gap-5">
          <div
            className={cn(
              item.status == "Delivered"
                ? "bg-moonstone/10 text-moonstone"
                : "bg-[#FAF3E9] text-[#CC8B20]",
              "h-fit w-fit rounded-[8px] px-3 text-sm font-medium sm:hidden sm:px-5 sm:py-2",
            )}
          >
            {item.status}
          </div>
          {/* <button className="h-fit w-fit rounded-lg border-[1.5px] border-moonstone px-2 text-xs text-moonstone sm:px-6 sm:py-2 sm:text-sm" onClick={()=>toast.error("Invoice pdf not generated yet.")}>
            Invoice
          </button> */}
          {true && <LeaveFeedbackDialog item={item} />}
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

export default HistoryCard;

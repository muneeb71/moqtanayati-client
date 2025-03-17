import { sellerChatIcon } from "@/assets/icons/common-icons";
import Image from "next/image";
import React from "react";

const BidRetractionCard = () => {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-black/10 bg-[#FBFBFB] p-3">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="/dummy-user/1.jpeg"
            width={57}
            height={57}
            alt="Profile Image"
            loading="lazy"
            quality={100}
            className="rounded-full"
          />
          <span className="text-black/60">Kathryn Murphy</span>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="text-xl font-medium">$350.00</span>
          <span className="text-xs text-black/40">1 min ago</span>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <span className="font-medium">Reason</span>
        <span className="text-sm text-black/60">
          The payment method I intended to use is currently unavailable, so I
          cannot proceed with the bid.
        </span>
      </div>
      <div className="flex items-center flex-col sm:flex-row justify-between gap-5 pt-5">
        <div className="flex items-center gap-1 text-xs text-moonstone">
          {sellerChatIcon}
          Message
        </div>
        <div className="flex items-center gap-1">
          <button className="cursor-pointer rounded-lg bg-faluRed/10 px-10 py-2 text-sm font-medium text-faluRed transition-all duration-150 ease-in hover:bg-faluRed hover:text-white">
            Deny
          </button>
          <button className="cursor-pointer rounded-lg bg-moonstone/10 px-10 py-2 text-sm font-medium text-moonstone transition-all duration-150 ease-in hover:bg-moonstone hover:text-white">
            Approve
          </button>
        </div>
      </div>
    </div>
  );
};

export default BidRetractionCard;

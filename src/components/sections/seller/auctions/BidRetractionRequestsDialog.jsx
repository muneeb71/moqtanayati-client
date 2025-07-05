"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { sellerChatIcon, sendIcon } from "@/assets/icons/common-icons";
import BidRetractionCard from "./BidRetractionCard";

const BidRetractionRequestsDialog = ({ retractedBids = [] }) => {
  const count = retractedBids.length;
  return (
    <Sheet>
      <SheetTrigger
        className={cn(
          "flex items-center justify-between gap-10 rounded-xl border border-black/10 px-3 py-4 transition-all duration-100 ease-in hover:border-black/50",
          count === 0 && "opacity-50 cursor-not-allowed pointer-events-none"
        )}
        disabled={count === 0}
      >
        <div className="flex items-center gap-1">
          <div className="grid size-5 place-items-center rounded-full bg-[#FF9292] text-xs text-white">
            {count}
          </div>
          <span className="text-delftBlue">Bid Retraction Requests</span>
        </div>
        <ChevronRight className="text-[#6D6D6D]" />
      </SheetTrigger>
      <SheetContent className="mt-20 w-full rounded-tl-[30px] border-none p-0 py-5 md:min-w-[483px]">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between border-b border-[#F0F1F4] pb-5 text-center text-[21px] font-medium text-darkBlue">
            <div className="flex w-full flex-col gap-1 px-5">
              <SheetClose asChild>
                <X className="cursor-pointer" />
              </SheetClose>
              <span className="w-full text-center">
                Bid Retraction Requests
              </span>
            </div>
          </SheetTitle>
        </SheetHeader>
        <div className="flex h-full w-full flex-col gap-5 p-5">
          <div className="flex w-full items-center justify-between">
            <p className="flex items-center gap-1 text-[14.4px]">
              <span className="font-medium">{count}</span>
              <span className="text-davyGray">Requests</span>
            </p>
          </div>
          <div className="no-scrollbar flex h-full max-h-[73%] flex-col gap-5 overflow-auto">
            {retractedBids.map((bid) => (
              <BidRetractionCard key={bid.id} bid={bid} />
            ))}
            {count === 0 && <span className="text-center text-black/40">No retraction requests.</span>}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default BidRetractionRequestsDialog;

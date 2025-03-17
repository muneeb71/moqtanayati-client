"use client";

import RoundedButton from "@/components/buttons/RoundedButton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Label from "@/components/form-fields/Label";
import InputField from "@/components/form-fields/InputField";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { DialogClose } from "@radix-ui/react-dialog";
import Image from "next/image";

const WithdrawBidDialog = ({ className = "", bidAmount, setBidAmount }) => {
  const [retractionReason, setRetractionReason] = useState("");

  return (
    <Dialog>
      <DialogTrigger
        className={cn("text-sm font-medium text-faluRed", className)}
      >
        Withdraw Bid
      </DialogTrigger>
      <DialogContent className="max-w-[350px] rounded-[24px] sm:max-w-[471px] sm:rounded-[24px]">
        <DialogHeader>
          <DialogTitle className="border-b-[1.2px] border-[#F0F1F4] pb-4 text-center text-[21.6px] font-medium">
            Bid Retraction Request
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-5">
          <div className="flex w-full items-start gap-3">
            <div className="grid aspect-square size-[80px] min-w-[80px] place-items-center overflow-hidden rounded-[8px] border border-black/5 bg-black/10">
              <Image
                src="/dummy-items/2.jpeg"
                width={500}
                height={500}
                alt="item"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-xs text-black/70">
                Iphone 6s, 10/10 condition..
              </span>
              <p className="flex items-center gap-1 text-sm font-medium">
                <span className="text-[#CC8B20]">My Bid:</span>
                <span className="text">$500.00</span>
              </p>
            </div>
          </div>
          <div className="flex w-full flex-col gap-2">
            <Label
              text="Reason for retraction"
              className="text-sm text-darkBlue"
            />
            <textarea
              className="h-[144px] rounded-[8px] bg-[#F8F7FB] px-3 py-3 focus:outline-moonstone"
              onChange={(e) => setRetractionReason(e.target.value)}
              placeholder="Enter reason for retraction (0-150 words)"
            >
              {retractionReason}
            </textarea>
          </div>
          <DialogClose asChild>
            <RoundedButton
              title="Submit"
              className="px-20"
              onClick={() => handleConfirm()}
            />
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WithdrawBidDialog;

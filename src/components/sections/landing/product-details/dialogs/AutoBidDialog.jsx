"use client";

import RoundedButton from "@/components/buttons/RoundedButton";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Label from "@/components/form-fields/Label";
import InputField from "@/components/form-fields/InputField";
import { cn } from "@/lib/utils";
import { useState } from "react";

const AutoBidDialog = ({ className = "", bidAmount, setBidAmount }) => {
  const [newAmount, setNewAmount] = useState(0);
  const handleConfirm = () => {
    setBidAmount(newAmount);
  };
  return (
    <Dialog>
      <DialogTrigger
        className={cn(
          "flex h-[55px] items-center justify-center rounded-[6.7px] border border-moonstone px-5 text-moonstone hover:bg-moonstone hover:text-white",
          className,
        )}
      >
        Auto Bidding
      </DialogTrigger>
      <DialogContent className="max-w-[350px] rounded-[24px] sm:max-w-[471px] sm:rounded-[24px]">
        <DialogHeader>
          <DialogTitle className="border-b-[1.2px] border-[#F0F1F4] pb-4 text-center text-[21.6px] font-medium">
            Auto Bidding
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-20">
          <span className="text-[14.4px] leading-[24px] text-moonstone">
            Define a maximum bid amount, Moqtanayati will automatically bid on
            your behalf up to your limit, potentially keeping you competitive
            without constant monitoring
          </span>
          <div className="flex w-full flex-col gap-3">
            {/* <Label text="Max Bid Amount" className="text-[19.2px]" /> */}
            <InputField
              placeholder="Enter Bid Amount (SAR)"
              type="number"
              value={newAmount}
              onChange={(e) => setNewAmount(e.target.value)}
            />
          </div>
          <DialogClose asChild>
            <RoundedButton
              title="Confirm"
              className="px-20"
              onClick={() => handleConfirm()}
            />
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AutoBidDialog;

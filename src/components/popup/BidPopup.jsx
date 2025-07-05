"use client";

import RoundedButton from "@/components/buttons/RoundedButton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Label from "@/components/form-fields/Label";
import InputField from "@/components/form-fields/InputField";
import { cn } from "@/lib/utils";
import { DialogClose } from "@radix-ui/react-dialog";

const BidPopup = ({
  open,
  handleBid,
  bidAmount,
  onBidChange,
  onOpenChange,
  className = "",
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[350px] rounded-[24px] sm:max-w-[471px] sm:rounded-[24px]">
        <DialogHeader>
          <DialogTitle className="border-b-[1.2px] border-[#F0F1F4] pb-4 text-center text-[21.6px] font-medium">
            Bid An Amount
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-20 pt-20">
          <div className="flex w-full flex-col gap-3">
            <Label text="Bid Amount" className="text-[19.2px]" />
            <InputField
              placeholder="Enter New Amount"
              type="number"
              value={bidAmount === 0 ? "" : bidAmount}
              onChange={(e) => {
                const val = e.target.value;
                if (val === "") {
                  onBidChange("");
                } else {
                  onBidChange(Number(val));
                }
              }}
            />
          </div>
          <DialogClose asChild>
            <RoundedButton
              title="Confirm"
              className="px-20"
              onClick={()=>handleBid()}
            />
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BidPopup; 
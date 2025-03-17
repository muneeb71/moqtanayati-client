import { cardsIcon, shippingTruckIcon } from "@/assets/icons/common-icons";
import RoundedButton from "@/components/buttons/RoundedButton";
import { Plus } from "lucide-react";
import React from "react";

const AuctionTab = ({ setSelectedTab, tabs }) => {
  return (
    <div className="flex h-[66%] flex-col justify-between">
      <div className="flex w-full flex-col gap-4 px-5 py-8">
        <button
          className="flex w-full flex-col gap-5 rounded-[12px] border border-white p-4 hover:border-moonstone"
          style={{
            boxShadow: "0px 0px 30px 2.4px #0000001A",
          }}
          onClick={() => setSelectedTab(tabs[1])}
        >
          <div className="flex items-center gap-3">
            {shippingTruckIcon}
            <span className="text-[17.32px] font-medium leading-[23px] text-black/60">
              Ship To
            </span>
          </div>
          <div className="flex items-center gap-1 text-moonstone">
            <Plus className="h-4 w-4 text-moonstone" />
            Add Shipping Address
          </div>
        </button>
        <button
          className="flex w-full flex-col gap-5 rounded-[12px] border border-white p-4 hover:border-moonstone"
          style={{
            boxShadow: "0px 0px 30px 2.4px #0000001A",
          }}
        >
          <div className="flex items-center gap-3">
            {cardsIcon}
            <span className="text-[17.32px] font-medium leading-[23px] text-black/60">
              Payment Method
            </span>
          </div>
          <div className="flex items-center gap-1 text-moonstone">
            <Plus className="h-4 w-4 text-moonstone" />
            Add Payment Method
          </div>
        </button>
      </div>
      <RoundedButton
        className="w-fit self-center md:px-16"
        title="Submit Registeration"
      />
    </div>
  );
};

export default AuctionTab;

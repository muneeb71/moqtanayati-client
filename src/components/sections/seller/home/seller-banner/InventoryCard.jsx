import { houseIcon } from "@/assets/icons/seller-icons";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const InventoryCard = () => {
  return (
    <div className="flex h-full w-full flex-col gap-4 rounded-[30px] bg-[#FCF3F0] p-5">
      <div className="flex items-center gap-3">
        <div className="grid size-14 place-items-center rounded-[20px] bg-[#E6B9AA]">
          {houseIcon}
        </div>
        <h1 className="text-2xl font-medium text-davyGray">My Inventory</h1>
      </div>
      <div className="flex items-baseline justify-center py-2 font-medium text-russianViolet">
        <span className="text-5xl">10</span>
        <span className="text-lg">items</span>
      </div>
      <div className="flex w-full justify-end">
        <Link className="group flex flex-col text-[#C88C78]" href="/seller/my-store">
          <div className="flex items-center text-lg">
            Manage Inventory
            <ChevronRight className="text-xl" />
          </div>
          <span className="h-[1px] w-0 bg-[#C88C78] transition-all duration-200 ease-in group-hover:w-[95%]"></span>
        </Link>
      </div>
    </div>
  );
};

export default InventoryCard;

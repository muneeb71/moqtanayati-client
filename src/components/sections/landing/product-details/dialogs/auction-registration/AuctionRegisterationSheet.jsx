"use client";

import { shippingTruckIcon } from "@/assets/icons/common-icons";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { ChevronLeft, Plus, XIcon } from "lucide-react";
import { useState } from "react";
import AuctionTab from "./AuctionTab";
import ShippingAddressTab from "./ShippingAddressTab";

const AuctionRegisterationSheet = () => {
  const tabs = [
    "Auction Registration",
    "Select Shipping Address",
    "Select Payment Method",
  ];
  const addresses = [
    {
      title: "Home",
      address:
        "123 Imaginary Street, Fictitious City, Makebelieve County, Dreamland 56789",
    },
    {
      title: "Office",
      address:
        "456 Enchanted Avenue, Fantasyville, Wonderland State, Dreamland 98765",
    },
  ];
  const [selectedTab, setSelectedTab] = useState("Auction Registration");
  const [selectedAddress, setSelectedAddress] = useState(addresses[0]);

  return (
    <Sheet>
      <SheetTrigger
        className={cn(
          "flex h-[52px] w-[110px] items-center justify-center rounded-[8px] border-[1.2px] border-moonstone px-4 py-3 text-moonstone",
          "transition-all duration-100 ease-in hover:border-2",
        )}
      >
        Buy Now
      </SheetTrigger>
      <SheetContent className="mt-20 w-full rounded-tl-[30px] border-none md:min-w-[483px]">
        <SheetClose className="cursor-pointer" asChild>
          <XIcon className="absolute h-7 w-7" />
        </SheetClose>
        <SheetHeader>
          <SheetTitle className="mt-20 flex items-center justify-between border-b border-[#F0F1F4] pb-8 text-center text-[21px] font-medium text-darkBlue">
            {selectedTab != tabs[0] && (
              <button onClick={() => setSelectedTab(tabs[0])}>
                <ChevronLeft className="h-7 w-7" />
              </button>
            )}{" "}
            <div className="span w-full text-center">{selectedTab}</div>
            {selectedTab != tabs[0] && <div></div>}
          </SheetTitle>
        </SheetHeader>
        {selectedTab == tabs[0] ? (
          <AuctionTab setSelectedTab={setSelectedTab} tabs={tabs} />
        ) : selectedTab == tabs[1] ? (
          <ShippingAddressTab
            selectedAddress={selectedAddress}
            addresses={addresses}
            setSelectedAddress={setSelectedAddress}
          />
        ) : (
          <></>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default AuctionRegisterationSheet;

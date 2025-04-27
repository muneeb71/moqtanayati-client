"use client";

import {
  applePayIcon,
  masterCardIcon,
  payPalIcon,
  visaIcon,
} from "@/assets/icons/payment-icons";
import RoundedButton from "@/components/buttons/RoundedButton";
import InputField from "@/components/form-fields/InputField";
import Label from "@/components/form-fields/Label";
import CustomLink from "@/components/link/CustomLink";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { dummyCart } from "@/lib/dummyCart";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Cross, Minus, Plus, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import CreditCard from "../payment-methods/CreditCard";

const CheckoutSheet = ({ itemCount = 0, orderPlaced }) => {
  const tabs = [
    "Items",
    "Select Payment Methods",
    "Credit/Debit Cards",
    "New Card",
  ];
  const shippingOptions = ["Option 1", "Option 2", "Option 3"];
  const cards = ["Card 1", "Card 2", "Card 3"];
  const [selectedTab, setSelectedTab] = useState("Items");
  const [cart, setCart] = useState(dummyCart);
  const [selectedCard, setSelectedCard] = useState(cards[0]);
  const [selectedShippingOption, setSelectedShippingOption] = useState(
    shippingOptions[0],
  );

  const handlePayNow = () => {
    setSelectedTab(tabs[1]);
    orderPlaced(true);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="flex h-fit items-center gap-2 rounded-lg bg-moonstone/80 px-7 py-4 text-white hover:bg-moonstone">
          <span className="text-lg">Check Out</span>
          <span className="grid size-7 place-items-center rounded-full bg-white/80 text-moonstone">
            {itemCount}
          </span>
        </button>
      </SheetTrigger>
      <SheetContent className="min-w-screen w-full rounded-l-3xl p-0 sm:min-w-[480px]">
        <SheetHeader>
          <SheetTitle className="w-full border-b border-[#F0F1F4] py-7 text-center text-2xl font-medium text-darkBlue">
            Checkout
          </SheetTitle>
        </SheetHeader>
        <SheetClose asChild>
          <X className="absolute left-5 top-5 size-7 cursor-pointer" />
        </SheetClose>
        {selectedTab === tabs[0] ? (
          <div className="flex h-[93%] flex-col overflow-auto pb-10">
            <div className="flex flex-col gap-2 px-10 py-5">
              <h1 className="text-lg font-medium text-delftBlue">
                {selectedTab}
              </h1>
              {cart.map((item, index) => (
                <div
                  className="flex w-full items-center justify-between"
                  key={index}
                >
                  <div className="flex h-full w-full items-center gap-4">
                    <div className="size-[84px] overflow-hidden rounded-lg">
                      <Image
                        src={item.image}
                        width={160}
                        height={160}
                        alt="item"
                        loading="lazy"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex h-full flex-col justify-between py-3">
                      <div className="flex flex-col gap-1">
                        <h1 className="max-w-48 truncate text-sm font-medium">
                          {item.title}
                        </h1>
                        <div className="flex items-center gap-2 text-[10px]">
                          <span className="text-silver">by</span>
                          <div className="size-4 overflow-hidden rounded-full">
                            <Image
                              src={item.seller.image}
                              width={160}
                              height={160}
                              alt="item"
                              loading="lazy"
                              className="object-cover"
                            />
                          </div>
                          <span className="text-black/70">
                            {item.seller.name}
                          </span>
                        </div>
                      </div>
                      <span className="font-medium text-black/80">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <div className="flex h-full flex-col items-center justify-center">
                    <span className="grid size-8 place-items-center rounded-full bg-russianViolet text-xs text-white">
                      {item.quantity}x
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex w-full flex-col gap-2 px-10">
              <h1 className="text-lg font-medium text-delftBlue">
                Shipping Options
              </h1>
              <div className="flex w-full items-center gap-1">
                {shippingOptions.map((option, index) => (
                  <button
                    key={index}
                    className={cn(
                      "rounded-lg border border-silver px-4 py-1.5 text-xs text-davyGray",
                      "transition-all duration-200 ease-in",
                      selectedShippingOption === option
                        ? "border-moonstone bg-moonstone text-white"
                        : "hover:border-moonstone hover:bg-moonstone hover:text-white",
                    )}
                    onClick={() => setSelectedShippingOption(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
              <div className="mt-2 h-[1px] w-full bg-[#F0F1F4]"></div>
            </div>
            <div className="flex flex-col gap-2 px-10 py-5">
              <div className="flex items-center justify-between">
                <h1 className="text-lg font-medium text-delftBlue">
                  Delivery Address
                </h1>
                <CustomLink href="#" className="text-xs">
                  Change
                </CustomLink>
              </div>
              <div className="flex flex-col gap-1 rounded-2xl border border-black/10 px-5 py-5">
                <h1 className="text-sm font-medium">Home</h1>
                <div className="max-w-[90%] text-xs text-battleShipGray">
                  123 Imaginary Street, Fictitious City, Makebelieve County,
                  Dreamland 56789
                </div>
              </div>
              <p className="py-2 text-xs text-battleShipGray">
                Estimated Delivery Time:{" "}
                <span className="text-delftBlue">10 -15 Working Days</span>
              </p>
              <div className="flex w-full flex-col gap-1 text-[#4D4D4DE5]">
                <h1 className="font-medium text-delftBlue">Order Summary</h1>
                <div className="flex w-full items-center justify-between">
                  <span className="text-sm">Subtotal</span>
                  <span className="text-sm">$3040</span>
                </div>
                <div className="flex w-full items-center justify-between">
                  <span className="text-sm">Tax</span>
                  <span className="text-sm">$40</span>
                </div>
                <div className="flex w-full items-center justify-between">
                  <span className="text-sm">Delivery</span>
                  <span className="text-sm">Free</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between justify-self-end border-t border-[#F0F1F4] px-10 py-5">
              <div className="flex flex-col">
                <h2 className="text-xl text-battleShipGray">Grand Total</h2>
                <span className="text-3xl font-medium text-black/80">
                  $1240.00
                </span>
              </div>
              <button
                onClick={handlePayNow}
                className="rounded-lg bg-moonstone/80 px-10 py-3 text-white hover:bg-moonstone"
              >
                Pay Now
              </button>
            </div>
          </div>
        ) : selectedTab === tabs[1] ? (
          <div className="flex h-[93%] flex-col">
            <div className="flex justify-between gap-2 border-b border-[#F0F1F4] px-10 py-6">
              <button onClick={() => setSelectedTab(tabs[0])}>
                <ChevronLeft />
              </button>
              <h1 className="text-lg font-medium text-delftBlue">
                {selectedTab}
              </h1>
              <div></div>
            </div>
            <div className="flex w-full flex-col gap-2 px-10 py-10">
              <button
                onClick={() => setSelectedTab(tabs[2])}
                className={cn(
                  "flex items-center justify-between rounded-xl border border-delftBlue/10 bg-[#F8F7FB] px-4 py-5 text-start text-darkBlue",
                  "transition-all duration-200 ease-in hover:border-moonstone",
                )}
              >
                <div className="flex items-center gap-2">
                  Credit/Debit Card {visaIcon}
                  {masterCardIcon}
                </div>
                <ChevronRight />
              </button>
              <button
                onClick={() => setSelectedTab(tabs[2])}
                className={cn(
                  "flex items-center justify-between rounded-xl border border-delftBlue/10 bg-[#F8F7FB] px-4 py-5 text-start text-darkBlue",
                  "transition-all duration-200 ease-in hover:border-moonstone",
                )}
              >
                <div className="flex items-center gap-2">
                  Paypal {payPalIcon}
                </div>
                <ChevronRight />
              </button>
              <button
                onClick={() => setSelectedTab(tabs[2])}
                className={cn(
                  "flex items-center justify-between rounded-xl border border-delftBlue/10 bg-[#F8F7FB] px-4 py-5 text-start text-darkBlue",
                  "transition-all duration-200 ease-in hover:border-moonstone",
                )}
              >
                <div className="flex items-center gap-2">
                  Apple Pay {applePayIcon}
                </div>
                <ChevronRight />
              </button>
              <button
                onClick={() => setSelectedTab(tabs[2])}
                className={cn(
                  "flex items-center justify-between rounded-xl border border-delftBlue/10 bg-[#F8F7FB] px-4 py-5 text-start text-darkBlue",
                  "transition-all duration-200 ease-in hover:border-moonstone",
                )}
              >
                <div className="flex items-center gap-2">Cash on Delivery</div>
                <ChevronRight />
              </button>
            </div>
          </div>
        ) : selectedTab === tabs[2] ? (
          <div className="flex h-[90%] flex-col justify-between">
            <div className="flex w-full flex-col">
              <div className="flex justify-between gap-2 border-b border-[#F0F1F4] px-10 py-6">
                <button onClick={() => setSelectedTab(tabs[1])}>
                  <ChevronLeft />
                </button>
                <h1 className="text-lg font-medium text-delftBlue">
                  {selectedTab}
                </h1>
                <button
                  onClick={() => setSelectedTab(tabs[3])}
                  className="flex items-center gap-0.5 text-xs text-moonstone"
                >
                  <Plus className="size-5" />
                </button>
              </div>
              <div className="no-scrollbar flex max-w-full overflow-auto px-5">
                <div className="flex items-center justify-center gap-3 py-5">
                  {cards.map((card, index) => (
                    <div
                      className={cn(
                        "cursor-pointer",
                        selectedCard === card
                          ? "relative rounded-2xl bg-moonstone p-[1px]"
                          : "",
                      )}
                      onClick={() => setSelectedCard(card)}
                    >
                      <CreditCard
                        key={index}
                        onClick={() => setSelectedCard(card)}
                        hideDeleteIcon
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex w-full flex-col gap-1 border-t border-[#F0F1F4] px-10 py-5 text-[#4D4D4DE5]">
                <h1 className="font-medium text-delftBlue">Order Summary</h1>
                <div className="flex w-full items-center justify-between">
                  <span className="text-sm">Subtotal</span>
                  <span className="text-sm">$3040</span>
                </div>
                <div className="flex w-full items-center justify-between">
                  <span className="text-sm">Tax</span>
                  <span className="text-sm">$40</span>
                </div>
                <div className="flex w-full items-center justify-between">
                  <span className="text-sm">Delivery</span>
                  <span className="text-sm">Free</span>
                </div>
              </div>
              <div className="flex items-center justify-between justify-self-end border-t border-[#F0F1F4] px-10 py-5">
                <div className="flex flex-col">
                  <h2 className="text-xl text-battleShipGray">Grand Total</h2>
                  <span className="text-3xl font-medium text-black/80">
                    $1240.00
                  </span>
                </div>
                <SheetClose asChild>
                  <button
                    onClick={() => setSelectedTab(tabs[0])}
                    className="rounded-lg bg-moonstone/80 px-10 py-3 text-white hover:bg-moonstone"
                  >
                    Place Order
                  </button>
                </SheetClose>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex h-[88%] flex-col justify-between">
            <div className="flex w-full flex-col">
              <div className="flex justify-between gap-2 border-b border-[#F0F1F4] px-10 py-6">
                <button onClick={() => setSelectedTab(tabs[2])}>
                  <ChevronLeft />
                </button>
                <h1 className="text-lg font-medium text-delftBlue">
                  {selectedTab}
                </h1>
                <div></div>
              </div>
              <div className="flex w-full flex-col gap-3 px-10 py-5">
                <div className="flex w-full flex-col gap-1">
                  {/* <Label text="Card Number" /> */}
                  <InputField placeholder="Enter card number" />
                </div>
                <div className="flex w-full flex-col gap-1">
                  {/* <Label text="Cardholder Name" /> */}
                  <InputField placeholder="Enter cardholder name" />
                </div>
                <div className="flex w-full items-center gap-2">
                  <div className="flex w-full flex-col gap-1">
                    {/* <Label text="Expiry Date" /> */}
                    <InputField placeholder="01/01/2000" />
                  </div>
                  <div className="flex w-full flex-col gap-1">
                    {/* <Label text="CVV" /> */}
                    <InputField placeholder="CVV" />
                  </div>
                </div>
              </div>
            </div>
            <RoundedButton
              onClick={() => setSelectedTab(tabs[2])}
              title="Add Card"
              className="w-72 self-center"
            />
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CheckoutSheet;

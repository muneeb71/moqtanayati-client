"use client";
import PageHeading from "@/components/headings/PageHeading";
import { dummyCart } from "@/lib/dummyCart";
import { useState } from "react";
import Image from "next/image";

const page = () => {
  const [cart, setCart] = useState(dummyCart);
  const [isOrderPlaced, setOrderPlaced] = useState(true);

  const placeOrder = () => setOrderPlaced(!isOrderPlaced);

  const getItemsCount = () => {
    let count = 0;

    cart.forEach((item) => {
      count += item.quantity;
    });

    return count;
  };
  return (
    <div className="flex w-full flex-col items-center justify-center gap-10 px-3 pb-20">
      <PageHeading>
        <span className="text-">Track Order</span>
      </PageHeading>
      <div className="grid w-full max-w-7xl gap-10 md:grid-cols-2">
        <div className="flex w-full flex-col gap-10">
          {cart.map((item, index) => (
            <div
              className="flex w-full items-center justify-between"
              key={index}
            >
              <div className="flex h-full w-full items-center gap-4">
                <div className="size-[140px] overflow-hidden rounded-2xl">
                  <Image
                    src={item.image}
                    width={160}
                    height={160}
                    alt="item"
                    loading="lazy"
                    className="object-cover"
                  />
                </div>
                <div className="flex h-full flex-col justify-between py-2">
                  <div className="flex flex-col gap-1">
                    <h1 className="max-w-48 truncate text-2xl font-medium">
                      {item.title}
                    </h1>
                    <div className="flex items-center gap-2">
                      <span className="text-silver">by</span>
                      <div className="size-7 overflow-hidden rounded-full">
                        <Image
                          src={item.seller.image}
                          width={160}
                          height={160}
                          alt="item"
                          loading="lazy"
                          className="object-cover"
                        />
                      </div>
                      <span className="text-black/70">{item.seller.name}</span>
                    </div>
                  </div>
                  <span className="text-3xl font-medium text-black/80">
                    ${item.price.toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="flex h-full flex-col items-center justify-center">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-russianViolet text-lg font-medium text-white">
                  {item.quantity}x
                </span>
              </div>
            </div>
          ))}
        </div>
        <div>
          <div className="flex w-full flex-col justify-between rounded-3xl border border-black/10 bg-[#CCCCCC1F] px-5 py-8">
            <div className="flex w-full flex-col gap-3">
              <h1 className="text-3xl font-medium text-delftBlue">
                Order Summary
              </h1>
              <div className="flex w-full items-center justify-between">
                <span className="text-xl text-[#4D4D4DE5]">Subtotal</span>
                <span className="text-xl text-[#4D4D4DE5]">$3000</span>
              </div>
              <div className="flex w-full items-center justify-between">
                <span className="text-xl text-[#4D4D4DE5]">Tax</span>
                <span className="text-xl text-[#4D4D4DE5]">$40</span>
              </div>
              <div className="flex w-full items-center justify-between">
                <span className="text-xl text-[#4D4D4DE5]">Shipping</span>
                <span className="text-xl text-[#4D4D4DE5]">Free</span>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-xl text-black/40">Grand Total</span>
                <h1 className="text-4xl font-medium">$3040.00</h1>
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col justify-between rounded-3xl border border-black/10 bg-[#CCCCCC1F] px-5 py-8">
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;

"use client";
import PageHeading from "@/components/headings/PageHeading";
import { dummyCart } from "@/lib/dummyCart";
import { useState } from "react";
import Image from "next/image";
import FiltersPopup from "@/components/popup/FIlterPopup";
const page = () => {
  const [cart, setCart] = useState(dummyCart);
  const [orderProgress, setOrderProgress] = useState(2); 
  const address =
    "123 Imaginary Street, Fictitious City, Makebelieve County, Dreamland 56789";

  const getProgressBarColor = (step) => {
    return step <= orderProgress 
      ? "bg-moonstone" 
      : "bg-gray-300";
  };

  const getImageSrc = (step) => {
    const images = {
      1: "receive.svg",
      2: step <= orderProgress ? "processed.svg" : "processing.svg",
      3: step <= orderProgress ? "shipped.svg" : "shipping.svg",
      4: step <= orderProgress ? "delivered.svg" : "delivery.svg"
    };
    return images[step] || "receive.svg";
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
            <div className="mb-20 flex w-full flex-col gap-3">
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
          <div className="mt-5 flex w-full flex-col justify-between rounded-3xl border border-black/10 bg-[#CCCCCC1F] p-5">
            <h1 className="mb-2.5 text-3xl font-medium text-delftBlue">
              Shipping Address
            </h1>
            <div className="flex w-full items-center justify-between">
              <span className="text-xl text-[#4D4D4DE5]">{address}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-20 h-[1px] w-11/12 bg-black/10"></div>
      <div>
        <h1 className="mb-8 text-center text-4xl font-medium text-davyGray">
          Order Status
        </h1>
        <div className="flex flex-col md:flex-row items-center justify-center md:gap-4 gap-6">
          <div className="flex flex-col items-center justify-center space-y-2">
            <Image
              src={getImageSrc(1)}
              alt="Receive"
              width={32}
              height={32}
              className="w-16 h-16 md:h-32 md:w-32"
            />
            <p className="text-xs md:text-3xl font-medium">Received</p>
          </div>
          <div className={`h-5 md:h-1 w-1 md:w-[70px] rounded-full ${getProgressBarColor(1)}`}></div>
          <div className="flex flex-col items-center justify-center space-y-2">
            <Image
              src={getImageSrc(2)}
              alt="Processing"
              width={32}
              height={32}
              className="w-16 h-16 md:h-32 md:w-32"
            />
            <p className="text-xs md:text-3xl font-medium">Processing</p>
          </div>
          <div className={`h-5 md:h-1 w-1 md:w-[70px] rounded-full ${getProgressBarColor(2)}`}></div>
          <div className="flex flex-col items-center justify-center space-y-2">
            <Image
              src={getImageSrc(3)}
              alt="Shipped"
              width={32}
              height={32}
              className="w-16 h-16 md:h-32 md:w-32"
            />
            <p className="text-xs md:text-3xl font-medium">Shipped</p>
          </div>
          <div className={`h-5 md:h-1 w-1 md:w-[70px] rounded-full ${getProgressBarColor(3)}`}></div>
          <div className="flex flex-col items-center justify-center space-y-2">
            <Image
              src={getImageSrc(4)}
              alt="Delivered"
              width={32}
              height={32}
              className="w-16 h-16 md:h-32 md:w-32"
            />
            <p className="text-xs md:text-3xl font-medium">Delivered</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;

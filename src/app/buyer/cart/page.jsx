"use client";

import OrderPlacedPopup from "@/components/popup/OrderPlacedPopup";
import CheckoutSheet from "@/components/sections/landing/cart/CheckoutSheet";
import { getCart } from "@/lib/api/cart/getCart";
import { dummyCart } from "@/lib/dummyCart";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const CartPage = () => {
  const [cart, setCart] = useState(dummyCart);
  const [isOrderPlaced, setOrderPlaced] = useState(false);

  const getCartData = async () => {
    try {
      const res = await getCart();
      if (res.success) {
        setCart(res.data);
      } else {
        console.error('Failed to fetch cart:', res.error);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  }

  useEffect(() => {
    getCartData();
  }, []);
  
  const placeOrder = () => setOrderPlaced(!isOrderPlaced)

  const getItemsCount = () => {
    let count = 0;

    cart.forEach((item) => {
      count += item.quantity;
    });

    return count;
  };
  return (
    <div className="flex w-full max-w-7xl flex-col gap-10 py-10">
      <h1 className="text-4xl font-semibold text-davyGray">Your Cart</h1>
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
              <div className="flex h-full flex-col items-center justify-between">
                <button className="grid size-10 place-items-center rounded-md bg-moonstone/10 text-moonstone hover:bg-moonstone/20">
                  <Plus />
                </button>
                <span className="text-2xl font-medium text-russianViolet">
                  {item.quantity}
                </span>
                <button className="grid size-10 place-items-center rounded-md bg-moonstone/10 text-moonstone hover:bg-moonstone/20">
                  <Minus />
                </button>
              </div>
            </div>
          ))}
        </div>
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
              <CheckoutSheet itemCount={getItemsCount()} orderPlaced={placeOrder}/>
          </div>
        </div>
      </div>
      {isOrderPlaced && <OrderPlacedPopup orderPlaced={placeOrder}/>}
    </div>
  );
};

export default CartPage;

"use client";

import OrderPlacedPopup from "@/components/popup/OrderPlacedPopup";
import CheckoutSheet from "@/components/sections/landing/cart/CheckoutSheet";
import { getCart } from "@/lib/api/cart/getCart";
import { updateItemQuantity } from "@/lib/api/cart/updateItemQuantity";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import CartSkeleton from "@/components/loaders/CartSkeleton";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState();
  const [isOrderPlaced, setOrderPlaced] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const [showCheckoutSheet, setShowCheckoutSheet] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [loading, setLoading] = useState(true);

  const subtotal = cart.reduce((total, item) => {
    return total + item.quantity * item.price;
  }, 0);

  const tax = 40;

  const getCartData = async () => {
    try {
      setLoading(true);
      const res = await getCart();
      if (res.success) {
        setCart(res?.data?.data?.items);
        setUser(res?.data?.data?.user);
      } else {
        console.log("Failed to fetch cart:", res.error);
      }
    } catch (error) {
      console.log("Error fetching cart:", error);
    }
    setLoading(false);
  };

  const handleQuantityUpdate = async (item, increase) => {
    try {
      setDisableButton(true);
      const quant = increase ? item?.quantity + 1 : item?.quantity - 1;
      const res = await updateItemQuantity(item?.id, quant, item?.price);

      const updatedItem = res.data.data;

      setCart((prevCart) =>
        prevCart.map((cartItem) =>
          cartItem.id === updatedItem.id
            ? { ...cartItem, quantity: updatedItem.quantity }
            : cartItem,
        ),
      );
      setDisableButton(false);
      toast.success("Item Updated Successfully.");
    } catch (error) {
      setDisableButton(false);
      console.log("Update error:", error);
      toast.error(error?.data?.message || "Failed to Update.");
    }
  };

  useEffect(() => {
    getCartData();
  }, []);

  const placeOrder = () => setOrderPlaced(!isOrderPlaced);

  const getItemsCount = () => {
    let count = 0;

    cart?.forEach((item) => {
      count += item.quantity;
    });

    return count;
  };

  if (loading) return <CartSkeleton />;

  console.log(cart);
  

  return (
    <div className="flex w-full max-w-7xl flex-col gap-10 py-10">
      <h1 className="text-4xl font-semibold text-davyGray">Your Cart</h1>
      <div className="grid w-full max-w-7xl gap-10 md:grid-cols-2">
        <div className="flex h-80 w-full flex-col gap-10 overflow-y-auto">
          {cart?.length === 0 ? (
            <div className="flex items-center justify-center h-full w-full text-xl text-gray-400">No items in cart.</div>
          ) : (
            cart?.map((item, index) => (
              <div
                className="flex w-full items-center justify-between"
                key={index}
              >
                <div className="flex h-full w-full items-center gap-4">
                  <div className="size-[140px] overflow-hidden rounded-2xl">
                    <Image
                      src={item?.product?.images[0]}
                      width={160}
                      height={160}
                      alt="item"
                      loading="lazy"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex h-full flex-col justify-between py-2">
                    <div className="flex flex-col gap-1">
                      <h1 className="max-w-64 truncate text-2xl font-medium">
                        {item?.product?.name}
                      </h1>
                      <div className="flex items-center gap-2">
                        <span className="text-silver">by</span>
                        <div className="relative size-7 overflow-hidden rounded-full">
                          <Image
                            src={user?.avatar || "/static/user.jpeg"}
                            alt="item"
                            fill
                            className="object-cover"
                          />
                        </div>

                        <span className="text-black/70 text-xs">{item.product.store?.name || "Store"}</span>
                      </div>
                    </div>
                    <span className="text-3xl font-medium text-black/80">
                      ${item.price !== 0 ? item.price.toFixed(2) : item.buyItNow ? item.buyItNow.toFixed(2) : "0.00"}
                    </span>
                  </div>
                </div>
                <div className="flex h-full flex-col items-center justify-between">
                  <button
                    className="grid size-10 place-items-center rounded-md bg-moonstone/10 text-moonstone hover:bg-moonstone/20"
                    onClick={() => handleQuantityUpdate(item, true)}
                    disabled={disableButton}
                  >
                    <Plus />
                  </button>
                  <span className="text-2xl font-medium text-russianViolet">
                    {item.quantity}
                  </span>
                  <button
                    className="grid size-10 place-items-center rounded-md bg-moonstone/10 text-moonstone hover:bg-moonstone/20"
                    onClick={() => handleQuantityUpdate(item, false)}
                    disabled={disableButton}
                  >
                    <Minus />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="flex w-full flex-col justify-between rounded-3xl border border-black/10 bg-[#CCCCCC1F] px-5 py-8">
          <div className="flex w-full flex-col gap-3">
            <h1 className="text-3xl font-medium text-delftBlue">
              Order Summary
            </h1>
            <div className="flex w-full items-center justify-between">
              <span className="text-xl text-[#4D4D4DE5]">Subtotal</span>
              <span className="text-xl text-[#4D4D4DE5]">${subtotal}</span>
            </div>
            <div className="flex w-full items-center justify-between">
              <span className="text-xl text-[#4D4D4DE5]">Tax</span>
              <span className="text-xl text-[#4D4D4DE5]">${tax}</span>
            </div>
            <div className="flex w-full items-center justify-between">
              <span className="text-xl text-[#4D4D4DE5]">Shipping</span>
              <span className="text-xl text-[#4D4D4DE5]">Free</span>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-xl text-black/40">Grand Total</span>
              <h1 className="text-4xl font-medium">
                ${(subtotal + tax).toFixed(2)}
              </h1>
            </div>
            <div>
              <button
                className="flex gap-2 rounded-lg bg-moonstone px-8 py-5 disabled:opacity-50"
                onClick={() => setShowCheckoutSheet(true)}
                disabled={cart.length === 0}
              >
                <p className="text-white text-xl font-medium">Checkout</p>
                <div className="rounded-full w-6 h-6 flex justify-center items-center bg-white/80 text-moonstone">{getItemsCount()}</div>
              </button>
            </div>
            {showCheckoutSheet && (
              <CheckoutSheet
                itemCount={getItemsCount()}
                orderPlaced={placeOrder}
                cart={cart}
                user={user}
                open={showCheckoutSheet}
                onOpenChange={setShowCheckoutSheet}
                setOrderId={setOrderId}
              />
            )}
          </div>
        </div>
      </div>
      {isOrderPlaced && <OrderPlacedPopup orderPlaced={placeOrder} id={orderId}/>}
    </div>
  );
};

export default CartPage;

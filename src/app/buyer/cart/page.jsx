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
import useTranslation from "@/hooks/useTranslation";
import { calculateTax } from "@/lib/tax";

const CartPage = () => {
  const { t } = useTranslation();
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

  const tax = calculateTax(subtotal);

  const getCartData = async () => {
    try {
      setLoading(true);
      const res = await getCart();
      console.log("Cart data : ", res);
      if (res.success) {
        setCart(res?.data?.data?.items);
        setUser(res?.data?.data?.user);
        // Dispatch custom event to update header cart badge
        window.dispatchEvent(new CustomEvent("cartUpdated"));
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
      toast.success(t("common.updated") || "Item Updated Successfully.");
      // Dispatch custom event to update header cart badge
      window.dispatchEvent(new CustomEvent("cartUpdated"));
    } catch (error) {
      setDisableButton(false);
      console.log("Update error:", error);
      toast.error(
        error?.data?.message || t("common.failed") || "Failed to Update.",
      );
    }
  };

  useEffect(() => {
    getCartData();
  }, []);

  const placeOrder = () => {
    setOrderPlaced(!isOrderPlaced);
    // Refresh cart data when order is placed
    getCartData();
  };

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
      <h1 className="text-4xl font-semibold text-davyGray">
        {t("buyer.cart.title")}
      </h1>
      <div className="grid w-full max-w-7xl gap-10 md:grid-cols-2">
        <div className="flex h-80 w-full flex-col gap-10 overflow-y-auto">
          {cart?.length === 0 ? (
            <div className="flex h-full w-full items-center justify-center text-xl text-gray-400">
              {t("buyer.cart.empty")}
            </div>
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
                        <span className="text-silver">
                          {t("buyer.cart.by")}
                        </span>
                        <div className="relative size-7 overflow-hidden rounded-full">
                          {user?.avatar ? (
                            <Image
                              src={user.avatar}
                              alt="user"
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center bg-gray-200">
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="text-gray-500"
                              >
                                <path
                                  d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
                                  fill="currentColor"
                                />
                                <path
                                  d="M12 14C7.58172 14 4 17.5817 4 22H20C20 17.5817 16.4183 14 12 14Z"
                                  fill="currentColor"
                                />
                              </svg>
                            </div>
                          )}
                        </div>

                        <span className="text-xs text-black/70">
                          {item.product.store?.name || t("buyer.cart.store")}
                        </span>
                      </div>
                    </div>
                    <span className="text-3xl font-medium text-black/80">
                      $
                      {item.price !== 0
                        ? item.price.toFixed(2)
                        : item.buyItNow
                          ? item.buyItNow.toFixed(2)
                          : "0.00"}
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
              {t("buyer.cart.order_summary")}
            </h1>
            <div className="flex w-full items-center justify-between">
              <span className="text-xl text-[#4D4D4DE5]">
                {t("buyer.cart.subtotal")}
              </span>
              <span className="text-xl text-[#4D4D4DE5]">${subtotal}</span>
            </div>
            <div className="flex w-full items-center justify-between">
              <span className="text-xl text-[#4D4D4DE5]">
                {t("buyer.cart.tax")}
              </span>
              <span className="text-xl text-[#4D4D4DE5]">${tax}</span>
            </div>
            <div className="flex w-full items-center justify-between">
              <span className="text-xl text-[#4D4D4DE5]">
                {t("buyer.cart.shipping")}
              </span>
              <span className="text-xl text-[#4D4D4DE5]">
                {t("buyer.cart.free")}
              </span>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-xl text-black/40">
                {t("buyer.cart.grand_total")}
              </span>
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
                <p className="text-xl font-medium text-white">
                  {t("buyer.cart.checkout")}
                </p>
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/80 text-moonstone">
                  {getItemsCount()}
                </div>
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
                onRefreshCart={getCartData}
              />
            )}
          </div>
        </div>
      </div>
      {isOrderPlaced && (
        <OrderPlacedPopup
          orderPlaced={placeOrder}
          id={orderId}
          onClose={getCartData}
        />
      )}
    </div>
  );
};

export default CartPage;

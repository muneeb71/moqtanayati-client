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
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Cross, Minus, Plus, X } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import CreditCard from "../payment-methods/CreditCard";
import { createOrder } from "@/lib/api/orders/createOrder";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import AddressChangeDialog from "@/components/dialogs/AddressChangeDialog";
import useTranslation from "@/hooks/useTranslation";

const CheckoutSheet = ({
  itemCount = 0,
  orderPlaced,
  cart,
  user,
  open,
  onOpenChange,
  setOrderId,
  onRefreshCart,
}) => {
  const { t } = useTranslation();
  const tabs = [
    t("buyer.checkout.tabs.items"),
    t("buyer.checkout.tabs.select_methods"),
    t("buyer.checkout.tabs.cards"),
    t("buyer.checkout.tabs.new_card"),
  ];
  const shippingOptions = ["Option 1", "Option 2", "Option 3"];
  const cards = ["Card 1", "Card 2", "Card 3"];
  const [selectedTab, setSelectedTab] = useState(
    t("buyer.checkout.tabs.items"),
  );
  const [selectedCard, setSelectedCard] = useState(cards[0]);
  const [selectedShippingOption, setSelectedShippingOption] = useState(
    shippingOptions[0],
  );
  const [showOrderPlaced, setShowOrderPlaced] = useState(false);
  const [showAddressDialog, setShowAddressDialog] = useState(false);
  const [currentAddress, setCurrentAddress] = useState(user?.address || "");

  // Update currentAddress when user data changes
  useEffect(() => {
    if (user?.address) {
      setCurrentAddress(user.address);
    }
  }, [user?.address]);
  // Extra safety: if no address provided, try reading from localStorage profile
  useEffect(() => {
    if (!currentAddress) {
      try {
        const profile = JSON.parse(localStorage.getItem("profile") || "null");
        if (profile?.address) setCurrentAddress(profile.address);
      } catch {}
    }
  }, [currentAddress]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    t("buyer.checkout.methods.cod"),
  );
  const [showPaymentComingSoon, setShowPaymentComingSoon] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const router = useRouter();

  const handlePayNow = () => {
    setSelectedTab(tabs[1]);
  };

  const subtotal = cart.reduce((total, item) => {
    return total + item.quantity * item.price;
  }, 0);

  const tax = 40;

  const handleAddressUpdate = (newAddress) => {
    setCurrentAddress(newAddress);
    // Also update the user object to keep it in sync
    if (user) {
      user.address = newAddress;
    }
    // Refresh cart data to get updated user info
    if (onRefreshCart) {
      onRefreshCart();
    }
  };

  const handlePaymentMethodClick = (method) => {
    if (method === t("buyer.checkout.methods.cod")) {
      setSelectedPaymentMethod(method);
      setShowPaymentComingSoon(false);
      toast.success(t("buyer.checkout.cod_selected_toast"));
      // Navigate to the next step (Credit/Debit Cards tab)
      setSelectedTab(tabs[2]);
    } else {
      setShowPaymentComingSoon(true);
      toast(t("buyer.checkout.method_coming_soon", { method }), {
        icon: "ℹ️",
        style: {
          background: "#3B82F6",
          color: "#fff",
        },
      });
      // Auto-hide the message after 3 seconds
      setTimeout(() => {
        setShowPaymentComingSoon(false);
      }, 3000);
    }
  };

  const placeOrder = async () => {
    if (!user || !cart?.length) return;

    setIsPlacingOrder(true);

    const sellerId = cart[0]?.product?.sellerId;
    const productId = cart[0]?.product?.id;
    const orderBody = {
      userId: user.id,
      sellerId,
      productId,
      status: "PENDING",
      totalAmount: subtotal + tax,
      items: cart.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
        price: item.price,
        sellerId: item.product.sellerId,
      })),
    };

    try {
      const res = await createOrder(orderBody);

      if (res?.success && res?.data?.id) {
        setOrderId(res?.data?.id);
        setShowOrderPlaced(true);
        toast.success(t("buyer.checkout.success_order_placed"));
        setSelectedTab(tabs[0]);
        orderPlaced(true);
        // Refresh cart data after successful order
        if (onRefreshCart) {
          onRefreshCart();
        }
        // Only close the sheet after successful API response
        onOpenChange(false);
      } else {
        toast.error(t("buyer.checkout.success_order_no_id"));
      }
    } catch (err) {
      toast.error(err?.message || t("buyer.checkout.error_order_failed"));
      console.log("Order placement failed", err);
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={isPlacingOrder ? undefined : onOpenChange}>
      <SheetContent className="min-w-screen w-full rounded-l-3xl p-0 sm:min-w-[480px]">
        <SheetHeader>
          <SheetTitle className="w-full border-b border-[#F0F1F4] py-7 text-center text-2xl font-medium text-darkBlue">
            {t("buyer.checkout.title")}
          </SheetTitle>
        </SheetHeader>
        <SheetClose asChild disabled={isPlacingOrder}>
          <X
            className={`absolute left-5 top-5 size-7 ${isPlacingOrder ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
          />
        </SheetClose>
        {selectedTab === tabs[0] ? (
          <div className="flex h-[93%] flex-col overflow-auto pb-10">
            <div className="flex flex-col gap-2 px-10 py-5">
              <h1 className="text-lg font-medium text-delftBlue">
                {selectedTab}
              </h1>
              {cart?.map((item, index) => (
                <div
                  className="flex w-full items-center justify-between"
                  key={index}
                >
                  <div className="flex h-full w-full items-center gap-4">
                    <div className="size-[84px] overflow-hidden rounded-lg">
                      <Image
                        src={item?.product?.images[0]}
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
                          {item?.product?.name}
                        </h1>
                        <div className="flex items-center gap-2 text-[10px]">
                          <span className="text-silver">by</span>
                          <div className="size-4 overflow-hidden rounded-full">
                            <Image
                              src={user?.avatar || "/static/user.jpeg"}
                              width={160}
                              height={160}
                              alt="item"
                              loading="lazy"
                              className="h-40 w-40 rounded-full object-cover"
                            />
                          </div>
                          <span className="text-black/70">{user?.name}</span>
                        </div>
                      </div>
                      <span className="font-medium text-black/80">
                        $
                        {item.price !== 0
                          ? item.price.toFixed(2)
                          : item.buyItNow
                            ? item.buyItNow.toFixed(2)
                            : "0.00"}
                      </span>
                    </div>
                  </div>
                  <div className="flex h-full flex-col items-center justify-center">
                    <span className="grid size-8 place-items-center rounded-full bg-russianViolet text-xs text-white">
                      {item?.quantity}x
                    </span>
                  </div>
                </div>
              ))}
            </div>
            {/* <div className="flex w-full flex-col gap-2 px-10">
              <h1 className="text-lg font-medium text-delftBlue">
                {t("buyer.checkout.shipping_options")}
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
            </div> */}
            <div className="flex flex-col gap-2 px-10 py-5">
              <div className="flex items-center justify-between">
                <h1 className="text-lg font-medium text-delftBlue">
                  {t("buyer.checkout.delivery_address")}
                </h1>
                <button
                  onClick={() => setShowAddressDialog(true)}
                  className="text-xs text-moonstone hover:underline"
                >
                  {t("buyer.checkout.change")}
                </button>
              </div>
              <div className="flex flex-col gap-1 rounded-2xl border border-black/10 px-5 py-5">
                <h1 className="text-sm font-medium">
                  {t("buyer.checkout.home")}
                </h1>
                <div className="max-w-[90%] text-xs text-battleShipGray">
                  {currentAddress ||
                    user?.address ||
                    t("buyer.checkout.no_address")}
                </div>
              </div>
              <p className="py-2 text-xs text-battleShipGray">
                {t("buyer.checkout.estimated_delivery")}{" "}
                <span className="text-delftBlue">
                  {t("buyer.checkout.working_days")}
                </span>
              </p>
              <div className="flex w-full flex-col gap-1 text-[#4D4D4DE5]">
                <h1 className="font-medium text-delftBlue">
                  {t("buyer.checkout.order_summary")}
                </h1>
                <div className="flex w-full items-center justify-between">
                  <span className="text-sm">{t("buyer.cart.subtotal")}</span>
                  <span className="text-sm">${subtotal}</span>
                </div>
                <div className="flex w-full items-center justify-between">
                  <span className="text-sm">{t("buyer.cart.tax")}</span>
                  <span className="text-sm">${tax}</span>
                </div>
                <div className="flex w-full items-center justify-between">
                  <span className="text-sm">{t("buyer.cart.shipping")}</span>
                  <span className="text-sm">{t("buyer.cart.free")}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between justify-self-end border-t border-[#F0F1F4] px-10 py-5">
              <div className="flex flex-col">
                <h2 className="text-xl text-battleShipGray">
                  {t("buyer.cart.grand_total")}
                </h2>
                <span className="text-3xl font-medium text-black/80">
                  ${(subtotal + tax).toFixed(2)}
                </span>
              </div>
              <button
                onClick={handlePayNow}
                className="rounded-lg bg-moonstone/80 px-10 py-3 text-white hover:bg-moonstone"
              >
                {t("buyer.checkout.pay_now")}
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
              {selectedPaymentMethod && (
                <div className="mb-4 rounded-lg border border-moonstone/20 bg-moonstone/10 px-4 py-3">
                  <p className="text-sm font-medium text-moonstone">
                    {t("buyer.checkout.selected_label")} {selectedPaymentMethod}
                  </p>
                </div>
              )}
              <button
                onClick={() =>
                  handlePaymentMethodClick(
                    t("buyer.checkout.methods.credit_card"),
                  )
                }
                className={cn(
                  "flex items-center justify-between rounded-xl border border-delftBlue/10 bg-[#F8F7FB] px-4 py-5 text-start text-darkBlue",
                  "transition-all duration-200 ease-in hover:border-moonstone",
                  selectedPaymentMethod ===
                    t("buyer.checkout.methods.credit_card") &&
                    "border-moonstone bg-moonstone/10",
                )}
              >
                <div className="flex items-center gap-2">
                  {t("buyer.checkout.methods.credit_card")} {visaIcon}
                  {masterCardIcon}
                </div>
                <ChevronRight />
              </button>
              <button
                onClick={() =>
                  handlePaymentMethodClick(t("buyer.checkout.methods.paypal"))
                }
                className={cn(
                  "flex items-center justify-between rounded-xl border border-delftBlue/10 bg-[#F8F7FB] px-4 py-5 text-start text-darkBlue",
                  "transition-all duration-200 ease-in hover:border-moonstone",
                  selectedPaymentMethod ===
                    t("buyer.checkout.methods.paypal") &&
                    "border-moonstone bg-moonstone/10",
                )}
              >
                <div className="flex items-center gap-2">
                  {t("buyer.checkout.methods.paypal")} {payPalIcon}
                </div>
                <ChevronRight />
              </button>
              <button
                onClick={() =>
                  handlePaymentMethodClick(
                    t("buyer.checkout.methods.apple_pay"),
                  )
                }
                className={cn(
                  "flex items-center justify-between rounded-xl border border-delftBlue/10 bg-[#F8F7FB] px-4 py-5 text-start text-darkBlue",
                  "transition-all duration-200 ease-in hover:border-moonstone",
                  selectedPaymentMethod ===
                    t("buyer.checkout.methods.apple_pay") &&
                    "border-moonstone bg-moonstone/10",
                )}
              >
                <div className="flex items-center gap-2">
                  {t("buyer.checkout.methods.apple_pay")} {applePayIcon}
                </div>
                <ChevronRight />
              </button>
              <button
                onClick={() =>
                  handlePaymentMethodClick(t("buyer.checkout.methods.cod"))
                }
                className={cn(
                  "flex items-center justify-between rounded-xl border border-delftBlue/10 bg-[#F8F7FB] px-4 py-5 text-start text-darkBlue",
                  "transition-all duration-200 ease-in hover:border-moonstone",
                  selectedPaymentMethod === t("buyer.checkout.methods.cod") &&
                    "border-moonstone bg-moonstone/10",
                )}
              >
                <div className="flex items-center gap-2">
                  {t("buyer.checkout.methods.cod")}
                </div>
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
                  {selectedPaymentMethod === t("buyer.checkout.methods.cod")
                    ? t("buyer.checkout.payment_method")
                    : selectedTab}
                </h1>
                {selectedPaymentMethod !== t("buyer.checkout.methods.cod") && (
                  <button
                    onClick={() => setSelectedTab(tabs[3])}
                    className="flex items-center gap-0.5 text-xs text-moonstone"
                  >
                    <Plus className="size-5" />
                  </button>
                )}
              </div>

              {selectedPaymentMethod === t("buyer.checkout.methods.cod") ? (
                <div className="py- flex flex-col items-center justify-center px-10">
                  <div className="flex flex-col items-center gap-2 text-center">
                    <div className="rounded-full bg-green-100 p-6">
                      <svg
                        className="h-12 w-12 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-semibold text-delftBlue">
                      {t("buyer.checkout.cod_selected_title")}
                    </h2>
                    <p className="max-w-md text-gray-600">
                      {t("buyer.checkout.cod_selected_desc")}
                    </p>
                    <div className="mt-4 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3">
                      <p className="text-sm text-blue-800">
                        <strong>
                          {t("buyer.checkout.delivery_address_label")}
                        </strong>{" "}
                        {currentAddress ||
                          user?.address ||
                          t("buyer.checkout.no_address")}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="no-scrollbar flex max-w-full overflow-auto px-5">
                  <div className="flex items-center justify-center gap-3 py-5">
                    {cards.map((card, index) => (
                      <div
                        key={index}
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
              )}
            </div>
            <div className="flex flex-col">
              <div className="flex w-full flex-col gap-1 border-t border-[#F0F1F4] px-10 py-5 text-[#4D4D4DE5]">
                <h1 className="font-medium text-delftBlue">
                  {t("buyer.checkout.order_summary")}
                </h1>
                <div className="flex w-full items-center justify-between">
                  <span className="text-sm">{t("buyer.cart.subtotal")}</span>
                  <span className="text-sm">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex w-full items-center justify-between">
                  <span className="text-sm">{t("buyer.cart.tax")}</span>
                  <span className="text-sm">${tax.toFixed(2)}</span>
                </div>
                <div className="flex w-full items-center justify-between">
                  <span className="text-sm">{t("buyer.cart.shipping")}</span>
                  <span className="text-sm">{t("buyer.cart.free")}</span>
                </div>
              </div>
              <div className="flex items-center justify-between justify-self-end border-t border-[#F0F1F4] px-10 py-5">
                <div className="flex flex-col">
                  <h2 className="text-xl text-battleShipGray">
                    {t("buyer.cart.grand_total")}
                  </h2>
                  <span className="text-3xl font-medium text-black/80">
                    ${(subtotal + tax).toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={() => {
                    if (
                      selectedPaymentMethod !== t("buyer.checkout.methods.cod")
                    ) {
                      toast.error(t("buyer.checkout.cod_required_error"));
                      return;
                    }
                    placeOrder();
                  }}
                  disabled={isPlacingOrder}
                  className="rounded-lg bg-moonstone/80 px-10 py-3 text-white hover:bg-moonstone disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isPlacingOrder
                    ? t("buyer.checkout.placing_order")
                    : t("buyer.checkout.place_order")}
                </button>
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
                  <Label text={t("buyer.checkout.form.card_number")} />
                  <InputField
                    placeholder={t("buyer.checkout.form.enter_card_number")}
                  />
                </div>
                <div className="flex w-full flex-col gap-1">
                  <Label text={t("buyer.checkout.form.cardholder_name")} />
                  <InputField
                    placeholder={t("buyer.checkout.form.enter_cardholder_name")}
                  />
                </div>
                <div className="flex w-full items-center gap-2">
                  <div className="flex w-full flex-col gap-1">
                    <Label text={t("buyer.checkout.form.expiry_date")} />
                    <InputField
                      placeholder={t("buyer.checkout.form.expiry_placeholder")}
                    />
                  </div>
                  <div className="flex w-full flex-col gap-1">
                    <Label text={t("buyer.checkout.form.cvv")} />
                    <InputField placeholder={t("buyer.checkout.form.cvv")} />
                  </div>
                </div>
              </div>
            </div>
            <RoundedButton
              onClick={() => setSelectedTab(tabs[2])}
              title={t("buyer.checkout.form.add_card")}
              className="w-72 self-center"
            />
          </div>
        )}

        {/* Address Change Dialog */}
        <AddressChangeDialog
          open={showAddressDialog}
          onOpenChange={setShowAddressDialog}
          onAddressUpdate={handleAddressUpdate}
          currentAddress={currentAddress || user?.address}
          userId={user?.id}
        />
      </SheetContent>
    </Sheet>
  );
};

export default CheckoutSheet;

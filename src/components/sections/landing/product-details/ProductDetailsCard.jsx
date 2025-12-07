"use client";
import ProductDetailsAuctionTimer from "@/components/timers/ProductDetailsAuctionTimer";
import QaSectionSheet from "./dialogs/qa-sheet/QaSectionSheet";
import SellerQaSectionSheet from "./dialogs/qa-sheet/SellerQaSectionSheet";
import { addItemToCart } from "@/lib/api/cart/addItemToCart";
import { getCart } from "@/lib/api/cart/getCart";
import BidPopup from "@/components/popup/BidPopup";
import { useState, useEffect } from "react";
import bidOnAuction from "@/lib/api/auctions/bid";
import { usePathname } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";
import CheckoutSheet from "@/components/sections/landing/cart/CheckoutSheet";
import OrderPlacedPopup from "@/components/popup/OrderPlacedPopup";
import { getCookie } from "cookies-next";
import { useProfileStore } from "@/providers/profile-store-provider";
import useTranslation from "@/hooks/useTranslation";

const ProductDetailsCard = ({ item, totalBids, bids, fetchData }) => {
  const { t } = useTranslation();
  const [isBidPopupOpen, setIsBidPopupOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [showOrderPlaced, setShowOrderPlaced] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const path = usePathname();
  const id = path.split("/").splice(-1)[0];
  const [bidAmount, setBidAmount] = useState();
  const [orderId, setOrderId] = useState(null);
  const [requestLoading, setRequestLoading] = useState(false);
  const [isBuyNowLoading, setIsBuyNowLoading] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [cartQuantity, setCartQuantity] = useState(0);

  const checkCartStatus = async () => {
    try {
      const res = await getCart();
      if (res.success) {
        const cartItems = res?.data?.data?.items || [];
        const existingItem = cartItems.find(
          (cartItem) =>
            cartItem.product?.id === item?.id ||
            cartItem.productId === item?.id,
        );

        if (existingItem) {
          setIsInCart(true);
          setCartQuantity(existingItem.quantity || 0);
        } else {
          setIsInCart(false);
          setCartQuantity(0);
        }
      }
    } catch (error) {
      console.error("Error checking cart status:", error);
    }
  };

  useEffect(() => {
    checkCartStatus();
  }, [item?.id]);

  useEffect(() => {
    const role = getCookie("role");
    console.log("🔍 [ProductDetailsCard] User role detected:", role);
    setUserRole(role);
  }, []);

  const addItem = async () => {
    if (isInCart) {
      toast.error(t("buyer.product_details.already_in_cart_toast"));
      return;
    }

    setRequestLoading(true);
    const res = await addItemToCart({
      productId: item?.id,
      quantity: 1,
      price: item?.price,
    });
    if (res?.data?.success) {
      setRequestLoading(false);
      toast.success(t("buyer.product_details.add_to_cart_success"));
      // Update cart status
      checkCartStatus();
      // Dispatch custom event to update header cart badge
      window.dispatchEvent(new CustomEvent("cartUpdated"));
    } else {
      setRequestLoading(false);
      toast.error(t("buyer.product_details.add_to_cart_error"));
    }
  };

  const bid = async () => {
    try {
      // Validate minimum allowed bid based on the value shown above (highest or starting)
      const numericBid = Number(bidAmount);
      const minAllowed = Number(highestBidAmount) || 0;
      if (Number.isNaN(numericBid) || numericBid < minAllowed) {
        toast.error(`Your offer must be at least $${minAllowed.toFixed(2)}.`);
        return;
      }

      setRequestLoading(true);
      const res = await bidOnAuction({ productId: id, amount: bidAmount });
      if (res.success) {
        setIsBidPopupOpen(false);
        toast.success(res.message || t("buyer.bidders.bid_placed_success"));
        fetchData();
        setRequestLoading(false);
      } else {
        setRequestLoading(false);
        toast.error(res.message || t("buyer.bidders.bid_place_failed"));
      }
    } catch (err) {
      setRequestLoading(false);
      toast.error(
        err?.response?.data?.message ||
          err.message ||
          t("buyer.bidders.bid_place_failed"),
      );
      console.log("Failed to place bid:", err);
    }
  };

  const isFixedPrice = item?.pricingFormat?.toLowerCase() === "fixed price";

  // Calculate highest bid amount from bids data
  const getHighestBidAmount = () => {
    // Check all possible bid field names
    const possibleBidFields = [
      bids,
      item?.auction?.bids,
      item?.bids,
      item?.bidsList,
      item?.bidders,
      item?.auction?.bidsList,
      item?.auction?.bidders,
    ];

    let bidsToUse = [];

    // Find the first non-empty bid field
    for (const bidField of possibleBidFields) {
      if (bidField && Array.isArray(bidField) && bidField.length > 0) {
        bidsToUse = bidField;
        break;
      }
    }

    if (!bidsToUse || bidsToUse.length === 0) {
      return item?.minimumOffer || item?.startingBid || 0;
    }

    // Find the highest bid amount
    const highestBid = bidsToUse.reduce((max, bid) => {
      const bidAmount = bid.amount || bid.bidAmount || 0;
      return bidAmount > max ? bidAmount : max;
    }, 0);

    return highestBid;
  };

  const highestBidAmount = getHighestBidAmount();

  // Debug logging
  console.log("🔍 [ProductDetailsCard] Bids prop:", bids);
  console.log("🔍 [ProductDetailsCard] Auction bids:", item?.auction?.bids);
  console.log("🔍 [ProductDetailsCard] Item bids:", item?.bids);
  console.log("🔍 [ProductDetailsCard] Item bidsList:", item?.bidsList);
  console.log("🔍 [ProductDetailsCard] Item bidders:", item?.bidders);
  console.log(
    "🔍 [ProductDetailsCard] Auction bidsList:",
    item?.auction?.bidsList,
  );
  console.log(
    "🔍 [ProductDetailsCard] Auction bidders:",
    item?.auction?.bidders,
  );
  console.log("🔍 [ProductDetailsCard] Total bids:", totalBids);
  console.log("🔍 [ProductDetailsCard] Highest bid amount:", highestBidAmount);

  const profileId = useProfileStore((s) => s.id);
  const profileName = useProfileStore((s) => s.name);
  const profileAvatar = useProfileStore((s) => s.avatar);
  const profileAddress = useProfileStore((s) => s.address);

  const user = {
    id: profileId || item?.seller?.id,
    name:
      profileName || item?.seller?.name || t("buyer.product_details.seller"),
    avatar: profileAvatar || item?.seller?.avatar || "/static/user.jpeg",
    address: profileAddress || item?.seller?.address || "",
  };

  const handleBuyNow = async (e) => {
    e?.preventDefault?.();
    e?.stopPropagation?.();
    
    if (!isInCart) {
      setIsBuyNowLoading(true);
      try {
        const res = await addItemToCart({
          productId: item?.id,
          quantity: 1,
          price: item?.pricingFormat === "Auctions" ? item.buyItNow : item.price,
        });
        
        if (res?.success || res?.data?.success) {
          toast.success(t("buyer.product_details.add_to_cart_success"));
          await checkCartStatus();
          window.dispatchEvent(new CustomEvent("cartUpdated"));
          setIsBuyNowLoading(false);
          setIsCheckoutOpen(true);
        } else {
          toast.error(res?.error || t("buyer.product_details.add_to_cart_error"));
          setIsBuyNowLoading(false);
          return;
        }
      } catch (error) {
        toast.error(error?.response?.data?.message || t("buyer.product_details.add_to_cart_error"));
        setIsBuyNowLoading(false);
        return;
      }
    } else {
      toast.success(t("buyer.product_details.already_in_cart_toast"));
      setIsCheckoutOpen(true);
    }
  };

  if (requestLoading) {
    return (
      <div className="fixed inset-0 flex h-[100vh] w-full items-center justify-center bg-black/80">
        <svg
          className="h-10 w-10 animate-spin text-moonstone"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8z"
          ></path>
        </svg>
      </div>
    );
  }

  return (
    <>
      <div className="flex w-full flex-col md:px-10">
        <div className="flex w-full max-w-[404px] flex-col gap-[52px]">
          <div className="flex w-full flex-col gap-[42px]">
            <div className="flex w-full flex-col gap-6">
              <div className="flex w-full items-end justify-between md:gap-[33px]">
                <div className="flex flex-col">
                  <h2 className="max-w-[258px] truncate font-medium md:text-[19.2px] md:leading-[29px]">
                    {item?.title || item?.name}
                  </h2>
                  {isFixedPrice && (
                    <h1 className="text-[24px] font-medium leading-[40px] md:text-[28.8px] md:leading-[43px]">
                      $
                      {item.price && item.price !== 0
                        ? item.price.toFixed(2)
                        : item.buyItNow
                          ? item.buyItNow.toFixed(2)
                          : "0.00"}
                    </h1>
                  )}
                </div>
                <div className="flex flex-col justify-end gap-2.5">
                  <span className="text-right text-[14.4px] leading-[21px] text-battleShipGray">
                    {t("buyer.product_details.one_hour_ago")}
                  </span>
                  {userRole === "seller" ? (
                    <SellerQaSectionSheet />
                  ) : (
                    <QaSectionSheet />
                  )}
                </div>
              </div>
              {!isFixedPrice && <ProductDetailsAuctionTimer item={item} />}
            </div>
            <div className="flex w-full flex-col gap-2">
              <h1 className="font-medium text-black/70">
                {t("buyer.product_details.product_description")}
              </h1>
              <p className="text-[14.4px] leading-[21px] text-black/40">
                {item?.description}
              </p>
            </div>
          </div>
          <div className="flex w-full flex-col gap-2">
            {isFixedPrice ? (
              <>
                <div className="flex w-full flex-row">
                  <div className="flex w-1/2 flex-col space-y-3">
                    <div className="flex flex-col">
                      <h2 className="text-[14.4px] leading-[21.6px] text-black/40">
                        {t("buyer.product_details.price")}
                      </h2>
                      <h1 className="text-[24px] font-medium leading-[36px] text-black/80">
                        $
                        {item.price && item.price !== 0
                          ? item.price.toFixed(2)
                          : item.buyItNow
                            ? item.buyItNow.toFixed(2)
                            : "0.00"}
                      </h1>
                    </div>
                  </div>
                  <div className="flex w-1/2 flex-col space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <button
                        className={`flex h-[52.8px] w-[60px] items-center justify-center rounded-lg border-[2px] ${
                          isInCart
                            ? "border-green-500 bg-green-50"
                            : "border-moonstone"
                        }`}
                        onClick={addItem}
                        disabled={
                          item?.status === "SOLD" ||
                          item?.status === "DRAFT" ||
                          isInCart
                        }
                        title={
                          isInCart
                            ? t(
                                "buyer.product_details.already_in_cart_tooltip",
                                { count: cartQuantity },
                              )
                            : t("buyer.product_details.add_to_cart_tooltip")
                        }
                      >
                        {isInCart ? (
                          <div className="flex flex-col items-center">
                            <svg
                              className="h-5 w-5 text-green-600"
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
                            <span className="text-xs font-bold text-green-600">
                              {cartQuantity}
                            </span>
                          </div>
                        ) : (
                          <Image
                            width={24}
                            height={24}
                            alt="cart"
                            src={"/static/moonstonecart.svg"}
                          />
                        )}
                      </button>
                      <button
                        type="button"
                        disabled={
                          item?.status === "SOLD" || 
                          isBuyNowLoading
                        }
                        className={`flex h-[52.8px] items-center justify-center rounded-lg border-[2px] px-8 text-[14.4px] font-medium ${
                          isInCart
                            ? "border-green-500 bg-green-50 text-green-600"
                            : "border-moonstone text-moonstone"
                        } ${isBuyNowLoading ? "opacity-50 cursor-not-allowed" : ""} ${item?.status === "SOLD" ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                        onClick={handleBuyNow}
                        title={
                          isInCart
                            ? t("buyer.product_details.proceed_to_checkout")
                            : t("buyer.product_details.buy_now")
                        }
                      >
                        {isBuyNowLoading ? (
                          <svg
                            className="h-5 w-5 animate-spin text-moonstone"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8v8z"
                            ></path>
                          </svg>
                        ) : (
                          isInCart
                            ? t("buyer.product_details.proceed_to_checkout")
                            : t("buyer.product_details.buy_now")
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex w-full flex-row">
                  <div className="flex w-1/2 flex-col space-y-3">
                    <div className="flex flex-col">
                      <h2 className="text-[14.4px] leading-[21.6px] text-black/40">
                        {totalBids > 0
                          ? t("buyer.product_details.highest_bid")
                          : t("buyer.product_details.starting_bid")}
                      </h2>
                      <h1 className="text-[24px] font-medium leading-[36px] text-black/80">
                        ${highestBidAmount.toFixed(2)}
                      </h1>
                    </div>
                    <div className="flex flex-col">
                      {item?.pricingFormat === "Fixed Price" ? (
                        <>
                          <h2 className="text-[14.4px] leading-[21.6px] text-black/40">
                            {t("buyer.product_details.buy_now_for")}
                          </h2>
                          <h1 className="text-[24px] font-medium leading-[36px] text-black/80">
                            ${item?.buyItNow?.toFixed(2)}
                          </h1>
                        </>
                      ) : null}
                    </div>
                  </div>
                  <div className="flex w-1/2 flex-col space-y-3">
                    {item?.pricingFormat === "Auctions" ? (
                      item?.status === "SOLD" ? (
                        <button
                          type="button"
                          className="flex w-full items-center justify-center gap-3 rounded-lg bg-red-500 py-4 text-white"
                          disabled={true}
                        >
                          <img src={"/static/bid.svg"} />
                          <p>{t("buyer.product_details.sold")}</p>
                        </button>
                      ) : item?.status === "UPCOMING" ? (
                        <button
                          type="button"
                          className="flex w-full items-center justify-center gap-3 rounded-lg bg-yellow py-4 text-white"
                          disabled={true}
                        >
                          <img src={"/static/bid.svg"} />
                          <p>{t("buyer.product_details.upcoming")}</p>
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="flex w-full items-center justify-center gap-3 rounded-lg bg-moonstone py-4 text-white"
                          onClick={() => {
                            if (item?.status === "SOLD") {
                              toast.error(
                                t("buyer.product_details.auction_sold_error"),
                              );
                              return;
                            }
                            if (item?.status === "DRAFT") {
                              toast.error(
                                t(
                                  "buyer.product_details.auction_unavailable_error",
                                ),
                              );
                              return;
                            }
                            setIsBidPopupOpen(true);
                          }}
                        >
                          <img src={"/static/bid.svg"} />
                          <p>{t("buyer.product_details.make_offer")}</p>
                        </button>
                      )
                    ) : null}

                    {item?.pricingFormat === "Fixed Price" ? (
                      <div className="flex items-center justify-between gap-2">
                        <button
                          className={`flex h-[52.8px] w-[60px] items-center justify-center rounded-lg border-[2px] ${
                            isInCart
                              ? "border-green-500 bg-green-50"
                              : "border-moonstone"
                          }`}
                          onClick={addItem}
                          disabled={
                            item?.status === "SOLD" ||
                            item?.status === "DRAFT" ||
                            isInCart
                          }
                          title={
                            isInCart
                              ? t(
                                  "buyer.product_details.already_in_cart_tooltip",
                                  { count: cartQuantity },
                                )
                              : t("buyer.product_details.add_to_cart_tooltip")
                          }
                        >
                          {isInCart ? (
                            <div className="flex flex-col items-center">
                              <svg
                                className="h-5 w-5 text-green-600"
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
                              <span className="text-xs font-bold text-green-600">
                                {cartQuantity}
                              </span>
                            </div>
                          ) : (
                            <Image
                              width={24}
                              height={24}
                              alt="cart"
                              src={"/static/moonstonecart.svg"}
                            />
                          )}
                        </button>
                        <button
                          type="button"
                          disabled={
                            item?.status === "SOLD" || 
                            isBuyNowLoading
                          }
                          className={`flex h-[52.8px] items-center justify-center rounded-lg border-[2px] px-8 text-[14.4px] font-medium ${
                            isInCart
                              ? "border-green-500 bg-green-50 text-green-600"
                              : "border-moonstone text-moonstone"
                          } ${isBuyNowLoading ? "opacity-50 cursor-not-allowed" : ""} ${item?.status === "SOLD" ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                          onClick={handleBuyNow}
                          title={
                            isInCart
                              ? t("buyer.product_details.proceed_to_checkout")
                              : t("buyer.product_details.buy_now")
                          }
                        >
                          {isBuyNowLoading ? (
                            <svg
                              className="h-5 w-5 animate-spin text-moonstone"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v8z"
                              ></path>
                            </svg>
                          ) : (
                            isInCart
                              ? t("buyer.product_details.proceed_to_checkout")
                              : t("buyer.product_details.buy_now")
                          )}
                        </button>
                      </div>
                    ) : null}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      {isBidPopupOpen && (
        <BidPopup
          open={isBidPopupOpen}
          handleBid={bid}
          onBidChange={(e) => setBidAmount(e)}
          onOpenChange={(open) => setIsBidPopupOpen(open)}
        />
      )}
      {isCheckoutOpen && (
        <CheckoutSheet
          itemCount={1}
          cart={[
            {
              id: item.id,
              product: item,
              quantity: 1,
              price:
                item?.pricingFormat === "Auctions" ? item.buyItNow : item.price,
            },
          ]}
          user={user}
          orderPlaced={() => {
            setIsCheckoutOpen(false);
            setShowOrderPlaced(true);
          }}
          setOrderId={setOrderId}
          open={isCheckoutOpen}
          onOpenChange={setIsCheckoutOpen}
        />
      )}
      {showOrderPlaced && (
        <OrderPlacedPopup
          orderPlaced={() => setShowOrderPlaced(false)}
          id={orderId}
        />
      )}
    </>
  );
};

export default ProductDetailsCard;

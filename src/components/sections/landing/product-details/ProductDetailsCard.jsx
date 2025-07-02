"use client";
import ProductDetailsAuctionTimer from "@/components/timers/ProductDetailsAuctionTimer";
import QaSectionSheet from "./dialogs/qa-sheet/QaSectionSheet";
import { addItemToCart } from "@/lib/api/cart/addItemToCart";
import BidPopup from "@/components/popup/BidPopup";
import { useState } from "react";
import bidOnAuction from "@/lib/api/auctions/bid";
import { usePathname } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";
import CheckoutSheet from "@/components/sections/landing/cart/CheckoutSheet";
import OrderPlacedPopup from "@/components/popup/OrderPlacedPopup";

const ProductDetailsCard = ({ item, totalBids, fetchData }) => {
  const [isBidPopupOpen, setIsBidPopupOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [showOrderPlaced, setShowOrderPlaced] = useState(false);
  const path = usePathname();
  const id = path.split("/").splice(-1)[0];
  const [bidAmount, setBidAmount] = useState();
  const [orderId, setOrderId] = useState(null);
  const [requestLoading, setRequestLoading] = useState(false);  
  
  const addItem = async () => {
    setRequestLoading(true);
    const res = await addItemToCart({
      productId: item?.id,
      quantity: 1,
      price: item?.price,
    });
    if (res?.data?.success) {
      setRequestLoading(false);
      toast.success("Item Added to Cart")
    }
    else {
      setRequestLoading(false);
      toast.error("Error Adding Item to Cart")
    }
  };

  const bid = async () => {
    try {
      setRequestLoading(true);
      const res = await bidOnAuction({ productId: id, amount: bidAmount });
      if (res.success) {
        setIsBidPopupOpen(false);
        toast.success(res.message || "Bid placed successfully!");
        fetchData();
        setRequestLoading(false);
      } else {
        setRequestLoading(false);
        toast.error(res.message || "Failed to place bid.");
      }
    } catch (err) {
      setRequestLoading(false);
      toast.error(
        err?.response?.data?.message || err.message || "Failed to place bid.",
      );
      console.error("Failed to place bid:", err);
    }
  };

  const isFixedPrice = item?.pricingFormat?.toLowerCase() === "fixed price";  

  const user = {
    name: item?.seller?.name || "Seller",
    avatar: item?.seller?.avatar || "/static/user.jpeg",
    address: item?.seller?.address || "123 Main St, City",
  };

  const handleBuyNow = () => {
    setIsCheckoutOpen(true);
  };

  if (requestLoading) {
    return (
      <div className="w-full h-[100vh] bg-black/80 inset-0 fixed flex justify-center items-center">
        <svg className="animate-spin h-10 w-10 text-moonstone" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
        </svg>
      </div>
    )
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
                      ${item.price !== 0 ? item.price.toFixed(2) : item.buyItNow ? item.buyItNow.toFixed(2) : "0.00"}
                    </h1>
                  )}
                </div>
                <div className="flex flex-col justify-end gap-2.5">
                  <span className="text-right text-[14.4px] leading-[21px] text-battleShipGray">
                    1hr ago
                  </span>
                  <QaSectionSheet />
                </div>
              </div>
              {!isFixedPrice && <ProductDetailsAuctionTimer item={item} />}
            </div>
            <div className="flex w-full flex-col gap-2">
              <h1 className="font-medium text-black/70">Product Description</h1>
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
                        Price
                      </h2>
                      <h1 className="text-[24px] font-medium leading-[36px] text-black/80">
                        ${item.price !== 0 ? item.price.toFixed(2) : item.buyItNow ? item.buyItNow.toFixed(2) : "0.00"}
                      </h1>
                    </div>
                  </div>
                  <div className="flex w-1/2 flex-col space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <button
                        className="flex h-[52.8px] w-[60px] items-center justify-center rounded-lg border-[2px] border-moonstone"
                        onClick={addItem}
                        disabled={item?.status === "SOLD" || item?.status === "DRAFT"}
                      >
                        <Image
                          width={24}
                          height={24}
                          alt="cart"
                          src={"/static/moonstonecart.svg"}
                        />
                      </button>
                      <button
                        disabled={item?.status === "SOLD" || item?.status === "DRAFT"}
                        className="flex h-[52.8px] items-center rounded-lg border-[2px] border-moonstone px-8 text-[14.4px] font-medium text-moonstone"
                        onClick={handleBuyNow}
                      >
                        Buy Now
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
                        {totalBids > 0 ? "Highest Bid" : "Starting Bid"}
                      </h2>
                      <h1 className="text-[24px] font-medium leading-[36px] text-black/80">
                        ${item?.minimumOffer?.toFixed(2)}
                      </h1>
                    </div>
                    <div className="flex flex-col">
                      <h2 className="text-[14.4px] leading-[21.6px] text-black/40">
                        Buy Now for
                      </h2>
                      <h1 className="text-[24px] font-medium leading-[36px] text-black/80">
                        ${item?.buyItNow?.toFixed(2)}
                      </h1>
                    </div>
                  </div>
                  <div className="flex w-1/2 flex-col space-y-3">
                    <button
                      className="flex w-full items-center justify-center gap-3 rounded-lg bg-moonstone py-4 text-white"
                      onClick={() => setIsBidPopupOpen(true)}
                      disabled={item?.status === "SOLD" || item?.status === "DRAFT"}
                    >
                      <img src={"/static/bid.svg"} />
                      <p>Make Offer</p>
                    </button>
                    <div className="flex items-center justify-between gap-2">
                      <button
                        className="flex h-[52.8px] w-[60px] items-center justify-center rounded-lg border-[2px] border-moonstone"
                        onClick={addItem}
                        disabled={item?.status === "SOLD" || item?.status === "DRAFT"}
                      >
                        <Image
                          width={24}
                          height={24}
                          alt="cart"
                          src={"/static/moonstonecart.svg"}
                        />
                      </button>
                      <button
                        disabled={item?.status === "SOLD" || item?.status === "DRAFT"}
                        className="flex h-[52.8px] items-center rounded-lg border-[2px] border-moonstone px-8 text-[14.4px] font-medium text-moonstone"
                        onClick={handleBuyNow}
                      >
                        Buy Now
                      </button>
                    </div>
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
          onOpenChange={() => setIsBidPopupOpen(false)}
        />
      )}
      {isCheckoutOpen && (
        <CheckoutSheet
          itemCount={1}
          cart={[{ id: item.id, product: item, quantity: 1, price: item?.pricingFormat === "Auctions" ? item.buyItNow: item.price }]}
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
        <OrderPlacedPopup orderPlaced={() => setShowOrderPlaced(false)} id={orderId}/>
      )}
    </>
  );
};

export default ProductDetailsCard;

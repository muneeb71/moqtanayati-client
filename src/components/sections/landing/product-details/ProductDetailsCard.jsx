"use client";
import ProductDetailsAuctionTimer from "@/components/timers/ProductDetailsAuctionTimer";
import QaSectionSheet from "./dialogs/qa-sheet/QaSectionSheet";
import { CiHeart } from "react-icons/ci";
import { addItemToCart } from "@/lib/api/cart/addItemToCart";
import { handleFavorite } from "@/lib/api/product/handleFavorite";
import BidPopup from "@/components/popup/BidPopup";
import { useState } from "react";
import bidOnAuction from "@/lib/api/auctions/bid";
import { usePathname } from "next/navigation";

const ProductDetailsCard = ({ item, totalBids }) => {
  const [isBidPopupOpen, setIsBidPopupOpen] = useState(false);
  const path = usePathname();
  const id = path.split("/").splice(-1)[0];
  const [bidAmount, setBidAmount] = useState();

  const addItem = async () => {
    const res = await addItemToCart({
      productId: item?.id,
      quantity: 1,
      price: item?.price,
    });
    console.log(res);
  };

  const addFavortie = async () => {
    const res = await handleFavorite(item?.id);
    console.log(res);
  };

  const bid = async () => {
    try {
      const res = await bidOnAuction({ productId: id, amount: bidAmount });
      if (res.success) {
        setIsBidPopupOpen(false);
        toast.success(res.message || "Bid placed successfully!");
      } else {
        toast.error(res.message || "Failed to place bid.");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message || "Failed to place bid.");
      console.error("Failed to place bid:", err);
    }
  };

  const isFixedPrice = item?.pricingFormat?.toLowerCase() === "fixed price";

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
                      ${item.price.toFixed(2)}
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
            {!isFixedPrice ? (
              // Auction content
              <div className="flex flex-row items-center justify-between">
                <div className="flex flex-col">
                  <h2 className="text-[14.4px] leading-[21.6px] text-black/40">
                    {totalBids > 0 ? "Highest Bid" : "Starting Bid"}
                  </h2>
                  <h1 className="text-[24px] font-medium leading-[36px] text-black/80">
                    ${item?.minimumOffer}
                  </h1>
                </div>
                <div className="flex flex-col">
                  <h2 className="text-[14.4px] leading-[21.6px] text-black/40">
                    Buy Now for
                  </h2>
                  <h1 className="text-[24px] font-medium leading-[36px] text-black/80">
                    ${item?.buyItNow}
                  </h1>
                </div>
              </div>
            ) : (
              // Fixed price content
              <div className="flex flex-col">
                <h2 className="text-[14.4px] leading-[21.6px] text-black/40">
                  Price
                </h2>
                <h1 className="text-[24px] font-medium leading-[36px] text-black/80">
                  ${item.price.toFixed(2)}
                </h1>
              </div>
            )}
            <div className="flex flex-col gap-2">
              {!isFixedPrice && (
                <button className="rounded-full border border-moonstone bg-white py-2 text-moonstone transition-colors duration-300 ease-in-out hover:border hover:border-white hover:bg-moonstone hover:text-white">
                  Buy it Now
                </button>
              )}

              <button
                className="rounded-full border border-moonstone bg-white py-2 text-moonstone transition-colors duration-300 ease-in-out hover:border hover:border-white hover:bg-moonstone hover:text-white"
                onClick={addItem}
              >
                Add to Cart
              </button>

              {!isFixedPrice && (
                <button className="rounded-full border border-moonstone bg-white py-2 text-moonstone transition-colors duration-300 ease-in-out hover:border hover:border-white hover:bg-moonstone hover:text-white" onClick={()=>setIsBidPopupOpen(true)}>
                  Make Offer
                </button>
              )}

              <button
                className="flex flex-row items-center justify-center gap-2 rounded-full border border-moonstone bg-white py-2 text-moonstone transition-colors duration-300 ease-in-out hover:border hover:border-white hover:bg-moonstone hover:text-white"
                onClick={addFavortie}
              >
                <CiHeart className="text-[20px]" />
                Add to Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>
      {isBidPopupOpen && <BidPopup open={isBidPopupOpen} handleBid={bid} onOpenChange={()=>setIsBidPopupOpen(false)}/>}
    </>
  );
};

export default ProductDetailsCard;

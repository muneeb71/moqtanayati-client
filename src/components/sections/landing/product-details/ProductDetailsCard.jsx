import { cartIcon, cartIconMoonstone } from "@/assets/icons/header-icons";
import PlaceBidButton from "@/components/buttons/PlaceBidButton";
import ProductDetailsAuctionTimer from "@/components/timers/ProductDetailsAuctionTimer";
import { cn } from "@/lib/utils";
import AuctionRegisterationSheet from "./dialogs/auction-registration/AuctionRegisterationSheet";
import QaSectionSheet from "./dialogs/qa-sheet/QaSectionSheet";
import { CiHeart } from "react-icons/ci";


const ProductDetailsCard = ({ item }) => {
  return (
    <div className="flex w-full flex-col md:px-10">
      <div className="flex w-full max-w-[404px] flex-col gap-[52px]">
        <div className="flex w-full flex-col gap-[42px]">
          <div className="flex w-full flex-col gap-6">
            <div className="flex w-full items-end justify-between md:gap-[33px]">
              <div className="flex flex-col">
                <h2 className="max-w-[258px] truncate font-medium md:text-[19.2px] md:leading-[29px]">
                  {item.title}
                </h2>
                <h1 className="text-[24px] font-medium leading-[40px] md:text-[28.8px] md:leading-[43px]">
                  ${item.price.toFixed(2)}
                </h1>
              </div>
              <div className="flex flex-col justify-end gap-2.5">
                <span className="text-right text-[14.4px] leading-[21px] text-battleShipGray">
                  1hr ago
                </span>
                <QaSectionSheet />
              </div>
            </div>
            <ProductDetailsAuctionTimer />
          </div>
          <div className="flex w-full flex-col gap-2">
            <h1 className="font-medium text-black/70">Product Description</h1>
            <p className="text-[14.4px] leading-[21px] text-black/40">
              This device is pre-owned and fully functional, with minor signs of
              use (if any). Available in multiple storage options and colors,
              it's a budget-friendly choice for staying connected.
            </p>
          </div>
        </div>
        <div className="flex w-full flex-col gap-2">
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-col">
              <h2 className="text-[14.4px] leading-[21.6px] text-black/40">
                Highest Bid
              </h2>
              <h1 className="text-[24px] font-medium leading-[36px] text-black/80">
                $350.00
              </h1>
            </div>
            <div className="flex flex-col">
              <h2 className="text-[14.4px] leading-[21.6px] text-black/40">
                Buy Now for
              </h2>
              <h1 className="text-[24px] font-medium leading-[36px] text-black/80">
                $500.00
              </h1>
            </div>
          </div>
          <div className="flex flex-col gap-2">
          <button className="bg-white text-moonstone rounded-full py-2 transition-colors duration-300 ease-in-out border border-moonstone hover:bg-moonstone hover:border hover:border-white hover:text-white">
              Buy it Now
            </button>

            <button className="bg-white text-moonstone rounded-full py-2 transition-colors duration-300 ease-in-out border border-moonstone hover:bg-moonstone hover:border hover:border-white hover:text-white">
              Add to Cart
            </button>

            <button className="bg-white text-moonstone rounded-full py-2 transition-colors duration-300 ease-in-out border border-moonstone hover:bg-moonstone hover:border hover:border-white hover:text-white">
              Make Offer
            </button>

            <button className="bg-white flex flex-row items-center justify-center gap-2  text-moonstone rounded-full py-2 transition-colors duration-300 ease-in-out border border-moonstone hover:bg-moonstone hover:border hover:border-white hover:text-white">
              <CiHeart className="text-[20px] "/>
              Add to Wishlist

            </button>
          </div>

        </div>
        {/* <div className="flex w-full flex-col gap-3">
          <div className="flex w-full items-center justify-between">
            <div className="flex flex-col">
              <h2 className="text-[14.4px] leading-[21.6px] text-black/40">
                Highest Bid
              </h2>
              <h1 className="text-[24px] font-medium leading-[36px] text-black/80">
                $350.00
              </h1>
            </div>
            <PlaceBidButton
              type="secondary"
              className="h-[52px] min-w-[192px]"
            />
          </div>
          <div className="flex w-full items-center justify-between">
            <div className="flex flex-col">
              <h2 className="text-[14.4px] leading-[21.6px] text-black/40">
                Buy Now for
              </h2>
              <h1 className="text-[24px] font-medium leading-[36px] text-black/80">
                $500.00
              </h1>
            </div>
            <div className="flex items-center gap-[7px]">
              <button
                className={cn(
                  "flex h-[52px] w-[60px] items-center justify-center rounded-[8px] border-[1.2px] border-moonstone px-4 py-3",
                  "transition-all duration-100 ease-in hover:border-2",
                )}
              >
                {cartIconMoonstone}
              </button>
              <AuctionRegisterationSheet />
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ProductDetailsCard;

import ProductDetailsAuctionTimer from "@/components/timers/ProductDetailsAuctionTimer";
import QaSectionSheet from "../../../../landing/product-details/dialogs/qa-sheet/QaSectionSheet";
import { productHeartIcon } from "@/assets/icons/seller-icons";
import { Minus, Plus } from "lucide-react";

const StoreProductDetailsCard = ({ item }) => {
  return (
    <div className="flex w-full flex-col">
      <div className="flex w-full max-w-[404px] flex-col gap-[52px]">
        <div className="flex w-full flex-col gap-8">
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
            <div className="flex w-full items-end justify-between gap-5">
              <ProductDetailsAuctionTimer />
              <div className="flex items-center gap-2 text-2xl font-semibold text-[#F16D6F]">
                {productHeartIcon}
                112
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col gap-2">
            <h1 className="font-medium text-black/70">Product Description</h1>
            <p className="text-[14.4px] leading-[21px] text-black/40">
              This device is pre-owned and fully functional, with minor signs of
              use (if any). Available in multiple storage options and colors,
              it's a budget-friendly choice for staying connected.
            </p>
          </div>
          <div className="flex w-fit flex-col gap-2">
            <span className="text-2xl font-medium text-black/70">Stock</span>
            <div className="flex items-center gap-2 justify-between py-1">
              <button className="grid size-10 place-items-center rounded-md bg-moonstone/10">
                <Plus className="size-6 text-moonstone" />
              </button>
              <span className="text-2xl font-medium text-darkBlue">10</span>
              <button className="grid size-10 place-items-center rounded-md bg-moonstone/10">
                <Minus className="size-6 text-moonstone" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreProductDetailsCard;

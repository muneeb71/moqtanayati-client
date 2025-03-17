import { cartIcon, cartIconMoonstone } from "@/assets/icons/header-icons";
import PlaceBidButton from "@/components/buttons/PlaceBidButton";
import ProductDetailsAuctionTimer from "@/components/timers/ProductDetailsAuctionTimer";
import { cn } from "@/lib/utils";
import QaSectionSheet from "../../landing/product-details/dialogs/qa-sheet/QaSectionSheet";
import Image from "next/image";

const AuctionProductDetailsCard = ({ item }) => {
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
          <div className="flex flex-col justify-between py-4 pl-3 pr-10 rounded-xl bg-moonstone/10 w-fit">
            <span className="text-[15px] leading-[23px] text-black/30">
              Highest Bid
            </span>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-medium">$500.00</span>
              <span className="text-xs text-black/30">by</span>
              <Image
                src="/dummy-user/1.jpeg"
                width={20}
                height={20}
                alt="user"
                quality={100}
                loading="lazy"
                className="rounded-full"
              />
              <span className="text-xs font-medium text-black/80">
                Kathryn Murphy
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuctionProductDetailsCard;

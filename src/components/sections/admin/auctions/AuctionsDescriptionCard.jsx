import ProductDetailsAuctionTimer from "@/components/timers/ProductDetailsAuctionTimer";
import QaSectionSheet from "../../landing/product-details/dialogs/qa-sheet/QaSectionSheet";
import Image from "next/image";

const AuctionsDescriptionCard = ({ item }) => {
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
        <div className="flex w-full flex-col gap-3">
          <div className="flex w-full items-center justify-between">
            <div className="flex min-w-64 flex-col rounded-lg bg-[#F8F7FB] pl-3 pr-5 py-4">
              <h2 className="text-[14.4px] leading-[21.6px] text-black/40">
                Highest Bid
              </h2>
              <div className="flex items-center gap-2">
                <h1 className="text-[24px] font-medium leading-[36px] text-black/80">
                  $350.00
                </h1>
                <span className="text-[10px] text-battleShipGray">by</span>
                <div className="flex items-center gap-1">
                  <Image
                    src="/dummy-user/1.jpeg"
                    width={18}
                    height={18}
                    alt="seller"
                    loading="lazy"
                    quality={100}
                    className="rounded-full"
                  />
                  <span className="text-xs font-medium text-black/70">
                    Kathryn Murphy
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuctionsDescriptionCard;

import ProductDetailsAuctionTimer from "@/components/timers/ProductDetailsAuctionTimer";
import QaSectionSheet from "../../landing/product-details/dialogs/qa-sheet/QaSectionSheet";
import Image from "next/image";
import useTranslation from "@/hooks/useTranslation";

const AuctionsDescriptionCard = ({ item }) => {
  const { t } = useTranslation();
  const getHighestBidInfo = (auction) => {
    if (!auction.bids || auction.bids.length === 0) return null;

    const highestBid = auction.bids.reduce((max, bid) => {
      return bid.amount > max.amount ? bid : max;
    });

    return {
      amount: highestBid.amount,
      name: highestBid.bidder?.name || "Anonymous",
      image: auction.product?.images?.[0] || "/static/dummy-user/1.jpeg", // fallback image
    };
  };

  const highestBidInfo = getHighestBidInfo(item);

  return (
    <div className="flex w-full flex-col md:px-10">
      <div className="flex w-full max-w-[404px] flex-col gap-[52px]">
        <div className="flex w-full flex-col gap-[42px]">
          <div className="flex w-full flex-col gap-6">
            <div className="flex w-full items-end justify-between md:gap-[33px]">
              <div className="flex flex-col">
                <h2 className="max-w-[258px] truncate font-medium md:text-[19.2px] md:leading-[29px]">
                  {item?.product.name}
                </h2>
                <h1 className="text-[24px] font-medium leading-[40px] md:text-[28.8px] md:leading-[43px]">
                  $
                  {item?.product.price > 0
                    ? item.product.price
                    : (item?.product.buyItNow ?? "0.00")}
                </h1>
              </div>
              <div className="flex flex-col justify-end gap-2.5">
                <span className="text-right text-[14.4px] leading-[21px] text-battleShipGray">
                  {t("admin.auctions.one_hour_ago")}
                </span>
                <QaSectionSheet />
              </div>
            </div>
            <ProductDetailsAuctionTimer
              item={{
                auctionLaunchDate: item?.product.auctionLaunchDate,
                auctionDuration: item?.product.auctionDuration,
              }}
            />
          </div>
          <div className="flex w-full flex-col gap-2">
            <h1 className="font-medium text-black/70">
              {t("admin.auctions.product_description")}
            </h1>
            <p className="text-[14.4px] leading-[21px] text-black/40">
              {item?.product.description}
            </p>
          </div>
        </div>

        {/* ========== Highest Bid Section ========== */}
        {highestBidInfo ? (
          <div className="flex w-full flex-col gap-3">
            <div className="flex w-full items-center justify-between">
              <div className="flex min-w-64 flex-col rounded-lg bg-[#F8F7FB] py-4 pl-3 pr-5">
                <h2 className="text-[14.4px] leading-[21.6px] text-black/40">
                  {t("admin.auctions.highest_bid")}
                </h2>
                <div className="flex items-center gap-2">
                  <h1 className="text-[24px] font-medium leading-[36px] text-black/80">
                    ${highestBidInfo.amount}
                  </h1>
                  <span className="text-[10px] text-battleShipGray">
                    {t("admin.auctions.by")}
                  </span>
                  <div className="flex items-center gap-1">
                    <Image
                      src={highestBidInfo.image}
                      width={18}
                      height={18}
                      alt="bidder"
                      loading="lazy"
                      quality={100}
                      className="rounded-full object-cover"
                    />
                    <span className="text-xs font-medium text-black/70">
                      {highestBidInfo.name}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-4 text-sm text-gray-400">
            {t("admin.auctions.no_bids_yet")}
          </div>
        )}
      </div>
    </div>
  );
};

export default AuctionsDescriptionCard;

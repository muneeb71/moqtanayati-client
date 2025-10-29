import PlaceBidButton from "@/components/buttons/PlaceBidButton";
import AuctionSlider from "@/components/slider/AuctionSlider";
import AuctionTimer from "@/components/timers/AuctionTimer";

const AuctionSection = ({ auction }) => {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="grid w-full max-w-6xl gap-5 py-5 md:grid-cols-2">
        <div className="flex w-full flex-col justify-center gap-8">
          <div className="flex flex-col items-center gap-3 md:items-start">
            <h1 className="max-w-[300px] truncate text-nowrap text-lg font-medium text-[#484848] sm:text-[28px] sm:leading-[48px] md:max-w-[350px] lg:max-w-[429px] lg:text-[32px]">
              {auction?.product?.name}, {auction?.product?.conditionRating || 0}
              /10 condition
            </h1>
            <span className="max-w-[315px] text-[11px] leading-[18px] text-[#8A8A8A]">
              {auction?.product?.description}
            </span>
            {auction?.status === "LIVE" && (
              <PlaceBidButton productId={auction?.productId} />
            )}
          </div>
          <div className="flex w-full items-center justify-center md:justify-start">
            <AuctionTimer
              auctionDuration={auction?.product?.auctionDuration}
              auctionLaunchDate={auction?.product?.auctionLaunchDate}
            />
          </div>
        </div>
        <AuctionSlider auction={auction} />
      </div>
    </div>
  );
};

export default AuctionSection;

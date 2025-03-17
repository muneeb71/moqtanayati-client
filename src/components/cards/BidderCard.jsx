import { cn } from "@/lib/utils";
import Image from "next/image";

const BidderCard = ({ bidder, selectedBidder, setSelectedBidder }) => {
  const handleBidderClick = () => {
    setSelectedBidder(bidder);
  };
  return (
    <div
      className={cn(
        "flex w-full cursor-pointer flex-col gap-5 rounded-[9.6px] border border-black/5 bg-white px-3 py-2",
        selectedBidder === bidder
          ? "border-moonstone"
          : "hover:border-moonstone",
      )}
      onClick={() => handleBidderClick()}
    >
      <div className="flex items-center gap-2">
        <div className="grid size-[46px] place-items-center overflow-hidden rounded-full">
          <Image
            src={bidder.image}
            width={100}
            height={100}
            alt="notification"
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>
        <span className="text-sm text-black/60">{bidder.name}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text- font-medium">${bidder.amount.toFixed(2)}</span>
        <span className="text-xs text-black/30">1 hr ago</span>
      </div>
    </div>
  );
};

export default BidderCard;

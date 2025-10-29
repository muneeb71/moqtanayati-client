import { cn } from "@/lib/utils";
import Image from "next/image";
import formatDateTime from "@/utils/dateFormatter";
const BidderCard = ({ bidder = {}, selectedBidder, setSelectedBidder }) => {
  const bidderInfo = bidder?.bidder ?? {};
  const imageSrc = bidderInfo.image || "/static/user.jpeg";
  const name = bidder?.bidder?.name || "Unnamed Bidder";
  const amount =
    typeof bidder?.amount === "number" ? bidder?.amount.toFixed(2) : "0.00";
  // Use bid creation time, fallback to bidder profile time if missing
  const createdAt = bidder?.createdAt || bidder?.bidder?.createdAt;

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
      onClick={handleBidderClick}
    >
      <div className="flex items-center gap-2">
        <div className="grid size-[46px] place-items-center overflow-hidden rounded-full">
          <Image
            src={imageSrc}
            width={100}
            height={100}
            alt="bidder"
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>
        <span className="text-sm text-black/60">{name}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="font-medium">${amount}</span>
        <span className="text-xs text-black/30">
          {formatDateTime.getTimeAgo(createdAt)}
        </span>
      </div>
    </div>
  );
};

export default BidderCard;

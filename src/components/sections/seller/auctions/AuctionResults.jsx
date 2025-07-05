"use client";

import { filterSvg } from "@/assets/icons/common-icons";
import AuctionCard from "./AuctionCard";
import { useAuctionStore } from "@/providers/auction-store-provider";

const AuctionResults = ({ auctionType }) => {
  const auctions = useAuctionStore((state) => state.auctionProducts);

  const filteredAuctions = auctions.filter((auction) => {
    const now = new Date();
    const launchDate = new Date(auction.product.auctionLaunchDate);

    const endDate = new Date(
      launchDate.getTime() +
        auction.product.auctionDuration * 24 * 60 * 60 * 1000,
    );

    let status;
    if (now < launchDate) {
      status = "upcoming";
    } else if (now >= launchDate && now <= endDate) {
      status = "live";
    } else {
      status = "history";
    }

    return status === auctionType?.toLowerCase();
  });

  return (
    <div className="flex w-full flex-col gap-5">
      <div className="flex items-center justify-between">
        <h1 className="text-[21px] font-medium leading-[31px]">
          {filteredAuctions.length}{" "}
          <span className="font-normal text-battleShipGray">Results</span>
        </h1>
        <button className="flex items-center gap-2 rounded-[12px] bg-[#F8F7FB] px-2 py-2 text-russianViolet transition-all duration-150 ease-in hover:bg-russianViolet hover:text-white">
          {filterSvg}
          <span className="">Filters</span>
        </button>
      </div>
      <div className="grid w-full grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 md:grid-cols-3">
        {filteredAuctions?.map((auction, index) => (
          <AuctionCard
            key={index}
            id={auction.id}
            title={auction.product.name}
            bids={auction.bids}
            image={auction.product.images[0]}
            address={auction.product.address}
            createdAt={auction.createdAt}
            isFavourite={auction.product.isFavourite}
          />
        ))}
      </div>
    </div>
  );
};

export default AuctionResults;

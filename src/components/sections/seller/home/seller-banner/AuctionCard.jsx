"use client";

import { useProfileStore } from "@/providers/profile-store-provider";

const AuctionCard = () => {
  const auctions = useProfileStore((state) => state.auctions);

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[30px] bg-white px-5 py-4">
      <h1 className="z-10 text-xl lg:text-2xl font-medium text-davyGray">Auctions</h1>
      <div className="z-10 w-full pb-12 pt-7 text-center text-6xl font-medium text-russianViolet">
        {auctions.length}
      </div>
      <div className="absolute -bottom-3 -left-2 size-10 rounded-full bg-[#D7D6ED]"></div>
      <div className="absolute -right-8 top-5 size-28 rounded-full bg-[#D7D6ED]"></div>
    </div>
  );
};

export default AuctionCard;

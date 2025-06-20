"use client";

import { cn } from "@/lib/utils";
import { slugify } from "@/utils/slugify";
import { usePathname, useRouter } from "next/navigation";

const AuctionTypeBar = ({ category = "", auctionType = "" }) => {
  const pathname = usePathname();
  const router = useRouter();

  const types = [
    "Live Auctions",
    "Upcoming",
    "History"
  ];
  
  return (
    <div className="no-scrollbar flex w-full items-center gap-2 overflow-auto pb-5 md:gap-[18px]">
      <button
        onClick={() => router.push("/buyer/auctions/" + auctionType)}
        className={cn(
          "flex items-center justify-center rounded-[12px] border-[1.5px] px-3 py-1.5 md:px-5 md:py-2.5",
          pathname === "/buyer/auctions"
            ? "border-moonstone bg-white text-moonstone"
            : "border-silver hover:border-moonstone hover:bg-moonstone/10",
        )}
      >
        All
      </button>
      {types.map((subCategory, index) => (
        <button
          onClick={() =>
            router.push(
              "/buyer/auctions/" + auctionType + "/" + slugify(subCategory),
            )
          }
          key={index}
          className={cn(
            "flex items-center justify-center rounded-[12px] border-[1.5px] px-3 py-1.5 md:px-5 md:py-2.5",
            pathname ===
              "/buyer/auctions/" + slugify(subCategory)
              ? "border-moonstone bg-white text-moonstone"
              : "border-silver hover:border-moonstone hover:bg-moonstone/10",
          )}
        >
          {subCategory}
        </button>
      ))}
    </div>
  );
};

export default AuctionTypeBar;

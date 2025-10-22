"use client";

import { cn } from "@/lib/utils";
import { slugify } from "@/utils/slugify";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const AuctionTypeBar = ({ category = "", auctionType = "" }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [loadingTab, setLoadingTab] = useState(null);

  const types = ["Live Auctions", "Upcoming", "History"];

  const handleTabClick = (path, tabName) => {
    setLoadingTab(tabName);
    router.push(path);
    // Reset loading state after navigation
    setTimeout(() => setLoadingTab(null), 500);
  };

  return (
    <div className="no-scrollbar flex w-full items-center gap-2 overflow-auto pb-5 md:gap-[18px]">
      <button
        onClick={() => handleTabClick("/buyer/auctions/" + auctionType, "All")}
        disabled={loadingTab === "All"}
        className={cn(
          "flex items-center justify-center rounded-[12px] border-[1.5px] px-3 py-1.5 transition-all duration-200 md:px-5 md:py-2.5",
          pathname === "/buyer/auctions"
            ? "border-moonstone bg-white text-moonstone"
            : "border-silver hover:border-moonstone hover:bg-moonstone/10",
          loadingTab === "All" && "cursor-not-allowed opacity-50",
        )}
      >
        {loadingTab === "All" ? (
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
            <span>Loading...</span>
          </div>
        ) : (
          "All"
        )}
      </button>
      {types.map((subCategory, index) => (
        <button
          onClick={() =>
            handleTabClick(
              "/buyer/auctions/" + auctionType + "/" + slugify(subCategory),
              subCategory,
            )
          }
          disabled={loadingTab === subCategory}
          key={index}
          className={cn(
            "flex items-center justify-center rounded-[12px] border-[1.5px] px-3 py-1.5 transition-all duration-200 md:px-5 md:py-2.5",
            pathname === "/buyer/auctions/" + slugify(subCategory)
              ? "border-moonstone bg-white text-moonstone"
              : "border-silver hover:border-moonstone hover:bg-moonstone/10",
            loadingTab === subCategory && "cursor-not-allowed opacity-50",
          )}
        >
          {loadingTab === subCategory ? (
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
              <span>Loading...</span>
            </div>
          ) : (
            subCategory
          )}
        </button>
      ))}
    </div>
  );
};

export default AuctionTypeBar;

"use client";

import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { useState, useTransition } from "react";

const BidsBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [activeTab, setActiveTab] = useState(() => {
    // Initialize active tab based on current pathname
    if (pathname.includes("/active")) return "Active";
    if (pathname.includes("/won")) return "Won";
    if (pathname.includes("/outbid")) return "Outbid";
    return "All";
  });

  const bidCategories = ["All", "Active", "Won", "Outbid"];

  const getCategoryPath = (category) => {
    if (category.toLowerCase() === "all") {
      return "/buyer/my-bids/all";
    }
    return `/buyer/my-bids/${category.toLowerCase()}`;
  };

  const isActive = (category) => {
    return activeTab === category;
  };

  const handleTabClick = (category) => {
    setActiveTab(category);
    startTransition(() => {
      router.push(getCategoryPath(category));
    });
  };

  return (
    <div className="flex w-full items-center gap-2 border-b-[1.5px] border-[#F0F1F4] pb-5 md:gap-[18px]">
      {bidCategories.map((bidCategory, index) => (
        <button
          onClick={() => handleTabClick(bidCategory)}
          disabled={isPending}
          key={index}
          className={cn(
            "flex items-center justify-center rounded-[12px] border-[1.5px] px-3 py-1.5 transition-all duration-200 md:px-5 md:py-2.5",
            isActive(bidCategory)
              ? "border-moonstone bg-moonstone text-white"
              : "border-silver hover:border-moonstone hover:bg-moonstone/10",
            isPending && "cursor-not-allowed opacity-70",
          )}
        >
          {bidCategory}
          {isPending && isActive(bidCategory) && (
            <div className="ml-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          )}
        </button>
      ))}
    </div>
  );
};

export default BidsBar;

"use client";

import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { useState, useTransition } from "react";

const HistoryBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [activeTab, setActiveTab] = useState(() => {
    // Initialize active tab based on current pathname
    if (pathname.includes("/delivered")) return "Delivered";
    if (pathname.includes("/paid")) return "Paid";
    return "All";
  });

  const historyCategories = ["All", "Delivered", "Paid"];

  const getCategoryPath = (category) => {
    if (category.toLowerCase() === "all") {
      return "/buyer/profile/purchase-history/all";
    }
    return `/buyer/profile/purchase-history/${category.toLowerCase()}`;
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
    <div className="flex w-full items-center justify-start gap-2 border-b-[1.5px] border-[#F0F1F4] pb-5 md:gap-[18px]">
      {historyCategories.map((historyCategory, index) => (
        <button
          onClick={() => handleTabClick(historyCategory)}
          disabled={isPending}
          key={index}
          className={cn(
            "flex items-center justify-center rounded-[12px] border-[1.5px] px-3 py-1.5 transition-all duration-200 md:px-5 md:py-2.5",
            isActive(historyCategory)
              ? "border-moonstone bg-moonstone text-white"
              : "border-silver hover:border-moonstone hover:bg-moonstone/10",
            isPending && "cursor-not-allowed opacity-70",
          )}
        >
          {historyCategory}
          {isPending && isActive(historyCategory) && (
            <div className="ml-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          )}
        </button>
      ))}
    </div>
  );
};

export default HistoryBar;

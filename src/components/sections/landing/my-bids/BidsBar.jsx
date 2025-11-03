"use client";

import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import useTranslation from "@/hooks/useTranslation";

const BidsBar = () => {
  const { t } = useTranslation();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [activeTab, setActiveTab] = useState(() => {
    // Initialize active tab based on current pathname
    if (pathname.includes("/active")) return "active";
    if (pathname.includes("/won")) return "won";
    if (pathname.includes("/outbid")) return "outbid";
    return "all";
  });

  const bidCategories = [
    { key: "all", label: t("buyer.my_bids.categories.all") },
    { key: "active", label: t("buyer.my_bids.categories.active") },
    { key: "won", label: t("buyer.my_bids.categories.won") },
    { key: "outbid", label: t("buyer.my_bids.categories.outbid") },
  ];

  const getCategoryPath = (categoryKey) => {
    if (categoryKey === "all") {
      return "/buyer/my-bids/all";
    }
    return `/buyer/my-bids/${categoryKey}`;
  };

  const isActive = (categoryKey) => {
    return activeTab === categoryKey;
  };

  const handleTabClick = (categoryKey) => {
    setActiveTab(categoryKey);
    startTransition(() => {
      router.push(getCategoryPath(categoryKey));
    });
  };

  return (
    <div className="flex w-full items-center gap-2 border-b-[1.5px] border-[#F0F1F4] pb-5 md:gap-[18px]">
      {bidCategories.map((bidCategory, index) => (
        <button
          onClick={() => handleTabClick(bidCategory.key)}
          disabled={isPending}
          key={index}
          className={cn(
            "flex items-center justify-center rounded-[12px] border-[1.5px] px-3 py-1.5 transition-all duration-200 md:px-5 md:py-2.5",
            isActive(bidCategory.key)
              ? "border-moonstone bg-moonstone text-white"
              : "border-silver hover:border-moonstone hover:bg-moonstone/10",
            isPending && "cursor-not-allowed opacity-70",
          )}
        >
          {bidCategory.label}
          {isPending && isActive(bidCategory.key) && (
            <div className="ml-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          )}
        </button>
      ))}
    </div>
  );
};

export default BidsBar;

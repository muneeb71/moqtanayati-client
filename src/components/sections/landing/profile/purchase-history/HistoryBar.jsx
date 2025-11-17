"use client";

import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import useTranslation from "@/hooks/useTranslation";

const HistoryBar = () => {
  const { t } = useTranslation();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [activeTab, setActiveTab] = useState(() => {
    // Initialize active tab based on current pathname
    if (pathname.includes("/delivered")) return "delivered";
    if (pathname.includes("/paid")) return "paid";
    return "all";
  });

  const historyCategories = [
    { key: "all", label: t("buyer.purchase_history.categories.all") },
    {
      key: "delivered",
      label: t("buyer.purchase_history.categories.delivered"),
    },
    { key: "paid", label: t("buyer.purchase_history.categories.paid") },
  ];

  const getCategoryPath = (categoryKey) => {
    if (categoryKey === "all") {
      return "/buyer/profile/purchase-history/all";
    }
    return `/buyer/profile/purchase-history/${categoryKey}`;
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
    <div className="flex w-full items-center justify-start gap-2 border-b-[1.5px] border-[#F0F1F4] pb-5 md:gap-[18px]">
      {historyCategories.map((historyCategory, index) => (
        <button
          onClick={() => handleTabClick(historyCategory.key)}
          disabled={isPending}
          key={index}
          className={cn(
            "flex items-center justify-center rounded-[12px] border-[1.5px] px-3 py-1.5 transition-all duration-200 md:px-5 md:py-2.5",
            isActive(historyCategory.key)
              ? "border-moonstone bg-moonstone text-white"
              : "border-silver hover:border-moonstone hover:bg-moonstone/10",
            isPending && "cursor-not-allowed opacity-70",
          )}
        >
          {historyCategory.label}
          {isPending && isActive(historyCategory.key) && (
            <div className="ml-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          )}
        </button>
      ))}
    </div>
  );
};

export default HistoryBar;

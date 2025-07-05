"use client";

import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";

const HistoryBar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const historyCategories = ["All", "Delivered", "Paid"];

  return (
    <div className="flex w-full items-center justify-start gap-2 border-b-[1.5px] border-[#F0F1F4] pb-5 md:gap-[18px]">
      {historyCategories.map((historyCategory, index) => (
        <button
          onClick={() =>
            router.push(
              "/buyer/profile/purchase-history/" + historyCategory.toLowerCase(),
            )
          }
          key={index}
          className={cn(
            "flex items-center justify-center rounded-[12px] border-[1.5px] px-3 py-1.5 md:px-5 md:py-2.5",
            pathname ===
              "/profile/purchase-history/" + historyCategory.toLowerCase()
              ? "border-moonstone bg-moonstone text-white"
              : "border-silver hover:border-moonstone hover:bg-moonstone/10",
          )}
        >
          {historyCategory}
        </button>
      ))}
    </div>
  );
};

export default HistoryBar;

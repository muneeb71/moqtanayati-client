"use client";

import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";

const BidsBar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const bidCategories = ["All", "Active", "Won", "Outbid"];

  return (
    <div className="flex w-full items-center gap-2 border-b-[1.5px] border-[#F0F1F4] pb-5 md:gap-[18px]">
      {bidCategories.map((bidCategory, index) => (
        <button
          onClick={() => router.push("/buyer/my-bids/" + bidCategory.toLowerCase())}
          key={index}
          className={cn(
            "flex items-center justify-center rounded-[12px] border-[1.5px] px-3 py-1.5 md:px-5 md:py-2.5",
            pathname === "/my-bids/" + bidCategory.toLowerCase()
              ? "border-moonstone bg-moonstone text-white"
              : "border-silver hover:border-moonstone hover:bg-moonstone/10",
          )}
        >
          {bidCategory}
        </button>
      ))}
    </div>
  );
};

export default BidsBar;

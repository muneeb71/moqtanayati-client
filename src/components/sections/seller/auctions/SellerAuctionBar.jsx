"use client";

import { cn } from "@/lib/utils";
import { slugify } from "@/utils/slugify";
import { usePathname, useRouter } from "next/navigation";

const SellerAuctionBar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const auctionCategories = [
    {
      title: "Live",
      href: "/live",
    },
    {
      title: "Upcoming",
      href: "/upcoming",
    },
    {
      title: "History",
      href: "/history",
    },
  ];

  return (
    <div className="no-scrollbar flex w-full items-center gap-2 overflow-auto pb-5 md:gap-[18px]">
      {auctionCategories.map((category, index) => (
        <button
          onClick={() =>
            router.push("/seller/auctions/" + slugify(category.href))
          }
          key={index}
          className={cn(
            "flex items-center justify-center rounded-[12px] border-[1.5px] px-3 py-1.5 md:px-5 md:py-2.5",
            pathname === "/seller/auctions/" + slugify(category.href)
              ? "border-moonstone bg-moonstone text-white"
              : "border-silver hover:border-moonstone hover:bg-moonstone/10",
          )}
        >
          {category.title}
        </button>
      ))}
    </div>
  );
};

export default SellerAuctionBar;

"use client";

import { cn } from "@/lib/utils";
import { slugify } from "@/utils/slugify";
import { usePathname, useRouter } from "next/navigation";
import { useAuctionStore } from "@/providers/auction-store-provider";
import useTranslation from "@/hooks/useTranslation";

const SellerAuctionBar = () => {
  const { t } = useTranslation();
  const pathname = usePathname();
  const router = useRouter();
  const auctionProducts = useAuctionStore((s) => s.auctionProducts) || [];

  const deriveStatus = (a) => {
    // Prefer server-provided status when present
    const serverStatus = String(
      a?.status || a?.product?.status || "",
    ).toUpperCase();
    if (serverStatus) {
      if (serverStatus === "ENDED") return "HISTORY";
      return serverStatus;
    }

    // Fallback: derive from launch date + duration
    const now = new Date();
    const launchRaw = a?.product?.auctionLaunchDate;
    const durationDays = Number(a?.product?.auctionDuration) || 0;
    const launch = launchRaw ? new Date(launchRaw) : null;

    if (!launch || isNaN(launch.getTime())) return "HISTORY";
    if (durationDays <= 0) return now < launch ? "UPCOMING" : "HISTORY";

    const end = new Date(launch.getTime() + durationDays * 24 * 60 * 60 * 1000);
    if (now < launch) return "UPCOMING";
    if (now >= launch && now < end) return "LIVE"; // strictly before end
    return "HISTORY";
  };

  const counts = auctionProducts.reduce(
    (acc, a) => {
      const s = deriveStatus(a);
      if (s === "LIVE") acc.live += 1;
      else if (s === "UPCOMING") acc.upcoming += 1;
      else if (s === "HISTORY") acc.history += 1;
      return acc;
    },
    { live: 0, upcoming: 0, history: 0 },
  );

  const auctionCategories = [
    {
      title: `${t("seller.auctions.live")}${counts.live ? ` (${counts.live})` : ""}`,
      href: "/live",
    },
    {
      title: `${t("seller.auctions.upcoming")}${
        counts.upcoming ? ` (${counts.upcoming})` : ""
      }`,
      href: "/upcoming",
    },
    {
      title: `${t("seller.auctions.history")}${
        counts.history ? ` (${counts.history})` : ""
      }`,
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
            pathname?.startsWith("/seller/auctions/" + slugify(category.href))
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

"use client";

import { sellerHeaderLinks } from "@/lib/links";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import useTranslation from "@/hooks/useTranslation";

const SellerNavLinks = () => {
  const pathname = usePathname();
  const { t } = useTranslation();
  const router = useRouter();
  const [loadingLink, setLoadingLink] = useState(null);

  // Clear loading state when pathname changes (navigation complete)
  useEffect(() => {
    setLoadingLink(null);
  }, [pathname]);

  const handleLinkClick = (href, index) => {
    if (pathname === href) return; // Don't navigate if already on the page

    setLoadingLink(index);
    router.push(href);
  };

  return (
    <div className="hidden items-center gap-3 md:flex lg:gap-6">
      {sellerHeaderLinks.map((headerLink, index) => {
        const isHome = headerLink.href === "/seller";
        const normalizedHref =
          headerLink.href === "/seller/auctions/live"
            ? "/seller/auctions"
            : headerLink.href;
        const isActive = isHome
          ? pathname === "/seller"
          : pathname === normalizedHref ||
            pathname?.startsWith(normalizedHref + "/");

        return (
          <button
            key={index}
            onClick={() => handleLinkClick(headerLink.href, index)}
            disabled={loadingLink === index}
            className={cn(
              "flex items-center gap-2 text-xs font-medium transition-colors duration-200 lg:text-sm",
              isActive
                ? "text-moonstone"
                : "text-[#5C5F6A] hover:text-moonstone",
              loadingLink === index && "cursor-not-allowed opacity-50",
            )}
          >
            {loadingLink === index && (
              <div className="h-3 w-3 animate-spin rounded-full border border-current border-t-transparent" />
            )}
            {headerLink.i18nKey ? t(headerLink.i18nKey) : headerLink.title}
          </button>
        );
      })}
    </div>
  );
};

export default SellerNavLinks;

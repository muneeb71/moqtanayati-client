"use client";

import { headerLinks } from "@/lib/links";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useTranslation from "@/hooks/useTranslation";

const NavLinks = () => {
  const { t } = useTranslation();
  const pathname = usePathname();
  const router = useRouter();
  const [loadingIndex, setLoadingIndex] = useState(null);

  useEffect(() => {
    if (loadingIndex !== null) setLoadingIndex(null);
  }, [pathname]);

  return (
    <div className="hidden items-center gap-5 md:flex">
      {headerLinks.map((headerLink, index) => {
        const isActive =
          headerLink.href === "/"
            ? pathname === "/"
            : headerLink.href === "/buyer"
              ? pathname === "/buyer"
              : pathname?.startsWith(headerLink.href);
        const isLoading = loadingIndex === index;
        return (
          <button
            key={index}
            onClick={() => {
              if (isActive) return;
              setLoadingIndex(index);
              router.push(headerLink.href);
            }}
            disabled={isLoading}
            className={cn(
              "flex items-center gap-2 text-sm font-medium transition-colors",
              isActive
                ? "text-moonstone"
                : "text-[#5C5F6A] hover:text-moonstone",
              isLoading && "cursor-not-allowed opacity-60",
            )}
          >
            {isLoading && (
              <span className="inline-block h-3 w-3 animate-spin rounded-full border border-current border-t-transparent" />
            )}
            {headerLink.i18nKey ? t(headerLink.i18nKey) : headerLink.title}
          </button>
        );
      })}
    </div>
  );
};

export default NavLinks;

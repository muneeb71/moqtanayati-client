"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import useTranslation from "@/hooks/useTranslation";

const SidebarLink = ({ link, onLoadingChange }) => {
  const { t } = useTranslation();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [targetPath, setTargetPath] = useState(null);
  const [subLoadingHref, setSubLoadingHref] = useState(null);

  // Clear loading state when pathname changes to the target
  useEffect(() => {
    if (
      (loading || subLoadingHref) &&
      ((targetPath &&
        (pathname === targetPath || pathname.startsWith(targetPath))) ||
        (subLoadingHref &&
          (pathname === subLoadingHref || pathname.startsWith(subLoadingHref))))
    ) {
      console.log("✅ Navigation completed, clearing loading state");
      setLoading(false);
      setSubLoadingHref(null);
      // Only clear global loading for main links, not sub-links
      if (!link.subLinks) {
        onLoadingChange?.(false);
      }
      setTargetPath(null);
    }
  }, [pathname, loading, targetPath, onLoadingChange, link.subLinks]);

  const handleNavigation = async (href, isSub = false) => {
    if (loading) return;

    console.log("🚀 Starting navigation to:", href);
    if (isSub) {
      setSubLoadingHref(href);
    } else {
      setLoading(true);
    }
    // Only show global loading for main links, not sub-links
    if (!link.subLinks && !isSub) {
      onLoadingChange?.(true);
    }
    setTargetPath(href);

    try {
      // Add a small delay to ensure the loading state is visible
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Start navigation
      router.push(href);

      // Fallback: clear loading state after 3 seconds max
      setTimeout(() => {
        if (loading || subLoadingHref === href) {
          console.log("⏰ Fallback: clearing loading state after timeout");
          setLoading(false);
          setSubLoadingHref(null);
          if (!link.subLinks) {
            onLoadingChange?.(false);
          }
          setTargetPath(null);
        }
      }, 3000);
    } catch (error) {
      console.error("❌ Navigation error:", error);
      setLoading(false);
      setSubLoadingHref(null);
      if (!link.subLinks) {
        onLoadingChange?.(false);
      }
      setTargetPath(null);
    }
  };

  if (link.subLinks && link.subLinks.length > 0) {
    return (
      <div className="flex w-full flex-col">
        <button
          type="button"
          className={cn(
            "flex w-full items-center gap-2 rounded-xl px-7 py-3.5 text-lg font-medium transition-colors duration-200 ease-in-out",
            pathname.startsWith(
              link.subLinks[0].href.split("/").slice(0, 4).join("/"),
            )
              ? "bg-[#2F3133] text-white"
              : "text-[#878C90] hover:bg-[#2F3133] hover:text-white/80",
          )}
          onClick={() => setOpen((prev) => !prev)}
        >
          <span className="inline-flex h-6 w-6 items-center justify-center [&_*]:fill-current [&_*]:stroke-current">
            {link.icon}
          </span>
          {link.i18nKey ? t(link.i18nKey) : link.title}
        </button>
        {open && (
          <div className="ml-8 mt-1 flex flex-col gap-1">
            {link.subLinks.map((sub, idx) => (
              <button
                key={idx}
                onClick={() => handleNavigation(sub.href || "/admin", true)}
                disabled={loading}
                className={cn(
                  "rounded-lg px-4 py-2 text-left text-base transition-colors duration-200 ease-in-out",
                  pathname === sub.href
                    ? "bg-[#2F3133] text-white"
                    : "text-[#878C90] hover:bg-[#2F3133] hover:text-white/80",
                  loading && "cursor-not-allowed opacity-50",
                )}
              >
                {subLoadingHref === sub.href ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    {t("common.loading")}
                  </div>
                ) : sub.i18nKey ? (
                  t(sub.i18nKey)
                ) : (
                  sub.title
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <button
      onClick={() => handleNavigation(link.href || "/admin")}
      disabled={loading}
      className={cn(
        "grid w-full grid-cols-[24px_1fr] items-center gap-2 rounded-xl px-7 py-3.5 text-left text-lg font-medium",
        pathname === link.href
          ? "bg-[#2F3133] text-white"
          : "text-[#878C90] hover:bg-[#2F3133] hover:text-white/80",
        "transition-colors duration-200 ease-in-out",
        loading && "cursor-not-allowed opacity-50",
      )}
    >
      <span className="inline-flex h-6 w-6 items-center justify-center [&_*]:fill-current [&_*]:stroke-current">
        {link.icon}
      </span>
      {loading ? (
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
          {t("common.loading")}
        </div>
      ) : link.i18nKey ? (
        t(link.i18nKey)
      ) : (
        link.title
      )}
    </button>
  );
};

export default SidebarLink;

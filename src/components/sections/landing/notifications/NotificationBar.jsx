"use client";

import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import useTranslation from "@/hooks/useTranslation";

const NotificationBar = () => {
  const { t } = useTranslation();
  const pathname = usePathname();
  const router = useRouter();

  const notificationCategories = [
    { slug: "all", key: "all" },
    { slug: "bids", key: "bids" },
    { slug: "messages", key: "messages" },
    { slug: "purchases", key: "purchases" },
  ];

  // Determine the base path based on current pathname
  const getBasePath = () => {
    if (pathname.startsWith("/seller/notifications")) {
      return "/seller/notifications";
    } else if (pathname.startsWith("/buyer/notifications")) {
      return "/buyer/notifications";
    } else if (pathname.startsWith("/admin/notifications")) {
      return "/admin/notifications";
    }
    // Default fallback
    return "/buyer/notifications";
  };

  const handleCategoryClick = (category) => {
    const categoryPath = category.slug;
    const basePath = getBasePath();
    const targetPath = `${basePath}/${categoryPath}`;

    console.log("Current pathname:", pathname);
    console.log("Category clicked:", category);
    console.log("Base path:", basePath);
    console.log("Target path:", targetPath);

    // Prevent navigation if already on the same page
    if (pathname === targetPath) {
      console.log("Already on the same page, skipping navigation");
      return;
    }

    router.push(targetPath);
  };

  return (
    <div className="flex w-full items-center justify-center gap-2 border-b-[1.5px] border-[#F0F1F4] pb-5 md:gap-[18px]">
      {notificationCategories.map((notificationCategory, index) => {
        const categoryPath = notificationCategory.slug;
        const basePath = getBasePath();
        const expectedPath = `${basePath}/${categoryPath}`;
        const isActive = pathname === expectedPath;

        return (
          <button
            onClick={() => handleCategoryClick(notificationCategory)}
            key={index}
            className={cn(
              "flex items-center justify-center rounded-[12px] border-[1.5px] px-3 py-1.5 md:px-5 md:py-2.5",
              isActive
                ? "border-moonstone bg-moonstone text-white"
                : "border-silver hover:border-moonstone hover:bg-moonstone/10",
            )}
          >
            {t(`seller.notifications.tabs.${notificationCategory.key}`)}
          </button>
        );
      })}
    </div>
  );
};

export default NotificationBar;

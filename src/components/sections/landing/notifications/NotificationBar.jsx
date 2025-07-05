"use client";

import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";

const NotificationBar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const notificationCategories = ["All", "Bids", "Messages", "Purchases"];

  return (
    <div className="flex w-full items-center justify-center gap-2 border-b-[1.5px] border-[#F0F1F4] pb-5 md:gap-[18px]">
      {notificationCategories.map((notificationCategory, index) => (
        <button
          onClick={() =>
            router.push("/buyer/notifications/" + notificationCategory.toLowerCase())
          }
          key={index}
          className={cn(
            "flex items-center justify-center rounded-[12px] border-[1.5px] px-3 py-1.5 md:px-5 md:py-2.5",
            pathname === "/buyer/notifications/" + notificationCategory.toLowerCase()
              ? "border-moonstone bg-moonstone text-white"
              : "border-silver hover:border-moonstone hover:bg-moonstone/10",
          )}
        >
          {notificationCategory}
        </button>
      ))}
    </div>
  );
};

export default NotificationBar;

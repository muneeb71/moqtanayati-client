"use client";

import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import useTranslation from "@/hooks/useTranslation";

const OrdersBar = () => {
  const { t } = useTranslation();
  const pathname = usePathname();
  const router = useRouter();

  const orderCategories = [
    { href: "/active-orders", title: t("seller.orders.active_orders") },
    { href: "/completed", title: t("seller.orders.completed") },
    { href: "/cancelled", title: t("seller.orders.cancelled") },
    { href: "/returned", title: t("seller.orders.returned") },
  ];

  return (
    <div className="flex w-full items-center justify-center gap-2 border-b-[1.5px] border-[#F0F1F4] pb-5 md:gap-[18px]">
      {orderCategories.map((orderCategory, index) => (
        <button
          onClick={() => router.push("/seller/orders" + orderCategory.href)}
          key={index}
          className={cn(
            "flex items-center justify-center whitespace-nowrap rounded-[12px] border-[1.5px] px-3 py-1.5 text-xs sm:text-sm md:px-5 md:py-2.5 md:text-base",
            pathname === "/seller/orders" + orderCategory.href
              ? "border-moonstone bg-moonstone text-white"
              : "border-silver hover:border-moonstone hover:bg-moonstone/10",
          )}
        >
          {orderCategory.title}
        </button>
      ))}
    </div>
  );
};

export default OrdersBar;

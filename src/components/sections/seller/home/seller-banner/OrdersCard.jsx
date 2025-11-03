"use client";

import { useProfileStore } from "@/providers/profile-store-provider";
import { useEffect, useState } from "react";
import { getSellerOrdersClient } from "@/lib/api/orders/getSellerOrderClient";
import useTranslation from "@/hooks/useTranslation";

const OrdersCard = () => {
  const { t } = useTranslation();
  const orders = useProfileStore((state) => state.orders);
  const sellerOrders = useProfileStore((state) => state.sellerOrders);
  const setOrders = useProfileStore((state) => state.setOrders);
  const setSellerOrders = useProfileStore((state) => state.setSellerOrders);

  const getCount = (list) => {
    if (!list) return 0;
    if (Array.isArray(list)) return list.length;
    if (Array.isArray(list?.items)) return list.items.length;
    if (Array.isArray(list?.data)) return list.data.length;
    return 0;
  };

  const initial = getCount(sellerOrders) || getCount(orders);
  const [count, setCount] = useState(initial);

  useEffect(() => {
    setCount(getCount(sellerOrders) || getCount(orders));
  }, [
    Array.isArray(sellerOrders)
      ? sellerOrders.length
      : sellerOrders?.items?.length,
    Array.isArray(orders) ? orders.length : orders?.items?.length,
  ]);

  useEffect(() => {
    const current = getCount(sellerOrders) || getCount(orders);
    if (current > 0) return;
    (async () => {
      try {
        const res = await getSellerOrdersClient();
        if (res?.success && Array.isArray(res.data)) {
          setOrders(res.data);
          setSellerOrders(res.data);
          setCount(res.data.length);
        }
      } catch (_) {}
    })();
  }, []);

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[30px] bg-white px-5 py-4">
      <h1 className="z-10 text-xl font-medium text-davyGray lg:text-2xl">
        {t("seller.banner.orders")}
      </h1>
      <div className="z-10 w-full pb-12 pt-7 text-center text-6xl font-medium text-moonstone">
        {count}
      </div>
      <div className="absolute -bottom-3 right-20 size-10 rounded-full bg-moonstone/10"></div>
      <div className="absolute -right-3 -top-4 size-28 rounded-full bg-moonstone/10"></div>
    </div>
  );
};

export default OrdersCard;

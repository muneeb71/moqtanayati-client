"use client";

import OrderCard from "@/components/cards/OrderCard";
import { unslugify } from "@/utils/slugify";
import { getSellerOrders } from "@/lib/api/orders/getSellerOrder";
import { getSellerOrdersClient } from "@/lib/api/orders/getSellerOrderClient";
import { useEffect, useState, use, useRef } from "react";
import { socketManager } from "@/lib/socket-client";
import { useProfileStore } from "@/providers/profile-store-provider";
import toast from "react-hot-toast";
import useTranslation from "@/hooks/useTranslation";

const statusMap = {
  "active-orders": ["PENDING", "PROCESSING", "SHIPPED"],
  cancelled: ["CANCELLED"],
  completed: ["DELIVERED"],
};

export default function OrdersPage({ params }) {
  const { t } = useTranslation();
  const { category } = use(params);
  const [orders, setOrders] = useState([]);
  const storeOrders = (() => {
    try {
      // prefer sellerOrders, fallback to orders
      const sellerOrders = useProfileStore((s) => s.sellerOrders) || [];
      const ordersArr = useProfileStore((s) => s.orders) || [];
      return sellerOrders.length ? sellerOrders : ordersArr;
    } catch (_) {
      return [];
    }
  })();

  useEffect(() => {
    // Prefer store orders when available; otherwise fetch immediately
    if (storeOrders && storeOrders.length) {
      setOrders(storeOrders);
      return;
    }
    (async () => {
      try {
        const res = await getSellerOrdersClient();
        if (res.success === false) {
          toast.error(res.message || "Failed to fetch orders");
          setOrders([]);
          return;
        }
        setOrders(res.data || []);
      } catch (e) {
        console.error("Error fetching orders", e);
        toast.error(
          e?.response?.data?.message || e.message || "Something went wrong",
          { id: "fetch-orders-error" },
        );
      }
    })();
  }, [storeOrders?.length]);

  // Refresh orders when the page gains focus or visibility returns
  useEffect(() => {
    const refetch = async () => {
      try {
        const res = await getSellerOrdersClient();
        if (res?.success) setOrders(res.data || []);
      } catch (_) {}
    };
    const onFocus = () => refetch();
    const onVisibility = () => {
      if (document.visibilityState === "visible") refetch();
    };
    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  // Listen for realtime order:new events and prepend to list
  useEffect(() => {
    let unsubscribe = () => {};
    (async () => {
      try {
        await socketManager.connect();
        const off = socketManager.on("order:new", async (order) => {
          console.log("[socket] order:new", {
            id: order?.id,
            status: order?.status,
            createdAt: order?.createdAt,
          });

          // If payload only includes orderId, or to ensure consistency, refetch orders
          try {
            const res = await getSellerOrdersClient();
            if (res?.success) {
              setOrders(Array.isArray(res.data) ? res.data : []);
              return;
            }
          } catch (_) {}

          // Fallback: merge minimal payload if it contains full order
          if (order && order.id) {
            setOrders((prev) => {
              const prevList = Array.isArray(prev) ? prev : [];
              if (prevList.some((o) => o.id === order.id)) return prevList;
              const next = [order, ...prevList];
              next.sort(
                (a, b) =>
                  new Date(b.createdAt || b.created_at || 0) -
                  new Date(a.createdAt || a.created_at || 0),
              );
              return next;
            });
          }
        });
        unsubscribe = off;
      } catch (_) {}
    })();
    return () => {
      try {
        unsubscribe();
      } catch (_) {}
    };
  }, []);

  const filteredOrders = orders
    .filter((order) => statusMap[category]?.includes(order.status))
    .sort((a, b) => {
      const dateA = new Date(a.createdAt || a.created_at || 0);
      const dateB = new Date(b.createdAt || b.created_at || 0);
      return dateB - dateA;
    });

  return (
    <div className="flex w-full max-w-md flex-col gap-2 px-3 py-5">
      <div className="flex items-baseline gap-1.5">
        <span className="text-lg font-medium">{filteredOrders.length}</span>
        <span className="text-sm text-battleShipGray">
          {(() => {
            const map = {
              "active-orders": t("seller.orders.active_orders"),
              cancelled: t("seller.orders.cancelled"),
              completed: t("seller.orders.completed"),
            };
            return map[category] || unslugify(category);
          })()}
        </span>
      </div>
      <div className="flex w-full flex-col gap-6">
        {filteredOrders.length === 0 ? (
          <span className="text-center text-battleShipGray">
            {t("seller.orders.no_orders")}
          </span>
        ) : (
          filteredOrders.map((order) => (
            <OrderCard key={order.id} item={order} />
          ))
        )}
      </div>
    </div>
  );
}

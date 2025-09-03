"use client";

import OrderCard from "@/components/cards/OrderCard";
import { unslugify } from "@/utils/slugify";
import { getSellerOrders } from "@/lib/api/orders/getSellerOrder";
import { useEffect, useState, use, useRef } from "react";
import toast from "react-hot-toast";

const statusMap = {
  "active-orders": ["PENDING", "PROCESSING", "SHIPPED"],
  cancelled: ["CANCELLED"],
  completed: ["DELIVERED"],
};

export default function OrdersPage({ params }) {
  const { category } = use(params);
  const [orders, setOrders] = useState([]);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    (async () => {
      try {
        const res = await getSellerOrders();
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
  }, []);

  const filteredOrders = orders.filter((order) =>
    statusMap[category]?.includes(order.status),
  );

  return (
    <div className="flex w-full max-w-md flex-col gap-2 px-3 py-5">
      <div className="flex items-baseline gap-1.5">
        <span className="text-lg font-medium">{filteredOrders.length}</span>
        <span className="text-sm text-battleShipGray">
          {unslugify(category)}
        </span>
      </div>
      <div className="flex w-full flex-col gap-6">
        {filteredOrders.length === 0 ? (
          <span className="text-center text-battleShipGray">
            No orders found.
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

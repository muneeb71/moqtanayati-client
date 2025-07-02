"use client";
import HistoryCard from "@/components/sections/landing/profile/purchase-history/HistoryCard";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getUserOrders } from "@/lib/api/orders/getUserOrders";
import HistoryCardSkeleton from "@/components/loaders/HistoryCardSkeleton";

const PurchaseHistoryPage = () => {
  const { category } = useParams();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const normalizedCategory = (category || "").toLowerCase();

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await getUserOrders();
        setOrders(res.data || []);
      } catch (e) {
        setOrders([]);
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, [category]);

  let filteredOrders = orders;
  if (normalizedCategory === "delivered") {
    filteredOrders = orders.filter((item) => item.status === "DELIVERED");
  } else if (normalizedCategory === "paid") {
    filteredOrders = orders.filter((item) => item.status === "SHIPPED");
  }

  let emptyText = "No orders found";
  if (normalizedCategory === "delivered") emptyText = "No delivered items";
  else if (normalizedCategory === "paid") emptyText = "No Paid items";

  return (
    <div className="no-scrollbar flex max-h-[40rem] flex-col gap-3 overflow-y-auto py-5">
      {loading ? (
         <>
         <HistoryCardSkeleton />
         <HistoryCardSkeleton />
         <HistoryCardSkeleton />
       </>
      ) : filteredOrders.length === 0 ? (
        <div>{emptyText}</div>
      ) : (
        filteredOrders.map((item, index) => <HistoryCard item={item} key={item.id || index} />)
      )}
    </div>
  );
};

export default PurchaseHistoryPage;

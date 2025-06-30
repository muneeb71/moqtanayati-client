"use client"
import HistoryCard from "@/components/sections/landing/profile/purchase-history/HistoryCard";
import { useEffect, useState } from "react";
import { getUserOrders } from "@/lib/api/orders/getUserOrders";

const PurchaseHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

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
  }, []);

  return (
    <div className="no-scrollbar flex max-h-[40rem] flex-col gap-3 overflow-y-auto py-5">
      {loading ? (
        <div>Loading...</div>
      ) : (
        orders.map((item, index) => <HistoryCard item={item} key={item.id || index} />)
      )}
    </div>
  );
};

export default PurchaseHistoryPage;

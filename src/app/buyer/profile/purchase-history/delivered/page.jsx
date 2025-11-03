"use client";

import { useEffect, useState } from "react";
import HistoryCard from "@/components/sections/landing/profile/purchase-history/HistoryCard";
import { getUserOrders } from "@/lib/api/orders/getUserOrders";
import useTranslation from "@/hooks/useTranslation";

const DeliveredHistoryPage = () => {
  const { t } = useTranslation();
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      try {
        const res = await getUserOrders();

        // Ensure we have a valid array
        const userHistory = Array.isArray(res?.data) ? res.data : [];

        // Filter for delivered items
        const filtered = userHistory.filter(
          (item) => item?.status === "DELIVERED",
        );
        setFilteredHistory(filtered);
      } catch (error) {
        setFilteredHistory([]);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  // Ensure filteredHistory is always an array
  const safeFilteredHistory = Array.isArray(filteredHistory)
    ? filteredHistory
    : [];

  return (
    <div className="no-scrollbar flex max-h-[40rem] flex-col gap-3 overflow-y-auto py-5">
      {safeFilteredHistory.length === 0 ? (
        <div className="py-10 text-center text-gray-400">
          {t("buyer.purchase_history.no_delivered_items")}
        </div>
      ) : (
        safeFilteredHistory.map((item, index) => (
          <HistoryCard key={item.id || index} item={item} />
        ))
      )}
    </div>
  );
};

export default DeliveredHistoryPage;

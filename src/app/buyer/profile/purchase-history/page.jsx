"use client";

import { useEffect, useState } from "react";
import HistoryCard from "@/components/sections/landing/profile/purchase-history/HistoryCard";
import { getUserOrders } from "@/lib/api/orders/getUserOrders";
import useTranslation from "@/hooks/useTranslation";

const PurchaseHistoryPage = () => {
  const { t } = useTranslation();
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      try {
        const res = await getUserOrders();
        console.log("🔍 [PurchaseHistoryPage] API response:", res);

        // Ensure we have a valid array
        const userHistory = Array.isArray(res?.data) ? res.data : [];
        console.log("🔍 [PurchaseHistoryPage] User history:", userHistory);
        console.log(
          "🔍 [PurchaseHistoryPage] User history length:",
          userHistory.length,
        );

        // Show all history for main page
        setFilteredHistory(userHistory);

        console.log("🔍 [PurchaseHistoryPage] Filtered history:", userHistory);
        console.log(
          "🔍 [PurchaseHistoryPage] Filtered history length:",
          userHistory.length,
        );
      } catch (error) {
        console.error(
          "🔍 [PurchaseHistoryPage] Error fetching history:",
          error,
        );
        console.error("🔍 [PurchaseHistoryPage] Error details:", {
          message: error?.message,
          status: error?.status,
          response: error?.response?.data,
        });

        // If it's an authentication error, show empty state gracefully
        if (error?.response?.status === 401) {
          console.log(
            "🔍 [PurchaseHistoryPage] Authentication required - showing empty state",
          );
        }

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
          {t("buyer.purchase_history.no_history_found")}
        </div>
      ) : (
        safeFilteredHistory.map((item, index) => (
          <HistoryCard key={item.id || index} item={item} />
        ))
      )}
    </div>
  );
};

export default PurchaseHistoryPage;

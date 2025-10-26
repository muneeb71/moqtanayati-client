import HistoryCard from "@/components/sections/landing/profile/purchase-history/HistoryCard";
import { getServerUserOrders } from "@/lib/api/server-axios";

// Force dynamic rendering to allow cookies usage
export const dynamic = 'force-dynamic';

const PurchaseHistoryPage = async () => {
  // Initialize with empty arrays
  let userHistory = [];
  let filteredHistory = [];

  try {
    const res = await getServerUserOrders();
    console.log("🔍 [PurchaseHistoryPage] API response:", res);

    // Ensure we have a valid array
    userHistory = Array.isArray(res?.data) ? res.data : [];
    console.log("🔍 [PurchaseHistoryPage] User history:", userHistory);
    console.log(
      "🔍 [PurchaseHistoryPage] User history length:",
      userHistory.length,
    );

    // Show all history for main page
    filteredHistory = userHistory;

    console.log("🔍 [PurchaseHistoryPage] Filtered history:", filteredHistory);
    console.log(
      "🔍 [PurchaseHistoryPage] Filtered history length:",
      filteredHistory.length,
    );
  } catch (error) {
    console.error("🔍 [PurchaseHistoryPage] Error fetching history:", error);
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

    userHistory = [];
    filteredHistory = [];
  }

  // Ensure filteredHistory is always an array
  const safeFilteredHistory = Array.isArray(filteredHistory)
    ? filteredHistory
    : [];

  return (
    <div className="no-scrollbar flex max-h-[40rem] flex-col gap-3 overflow-y-auto py-5">
      {safeFilteredHistory.length === 0 ? (
        <div className="py-10 text-center text-gray-400">
          No purchase history found.
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

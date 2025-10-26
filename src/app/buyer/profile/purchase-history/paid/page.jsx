import HistoryCard from "@/components/sections/landing/profile/purchase-history/HistoryCard";
import { getServerUserOrders } from "@/lib/api/server-axios";

// Force dynamic rendering to allow cookies usage
export const dynamic = 'force-dynamic';

const PaidHistoryPage = async () => {
  // Initialize with empty arrays
  let userHistory = [];
  let filteredHistory = [];

  try {
    const res = await getServerUserOrders();

    // Ensure we have a valid array
    userHistory = Array.isArray(res?.data) ? res.data : [];

    // Filter for paid items
    filteredHistory = userHistory.filter((item) => item?.status === "PAID");
  } catch (error) {
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
          No paid items found.
        </div>
      ) : (
        safeFilteredHistory.map((item, index) => (
          <HistoryCard key={item.id || index} item={item} />
        ))
      )}
    </div>
  );
};

export default PaidHistoryPage;

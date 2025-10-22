import BidCard from "@/components/sections/landing/my-bids/BidCard";
import { getMyBids } from "@/lib/api/auctions/getMyBid";

const AllBidsPage = async () => {
  // Initialize with empty arrays
  let userBids = [];
  let filteredBids = [];

  try {
    const bids = await getMyBids();

    // Ensure we have a valid array
    userBids = Array.isArray(bids?.data) ? bids.data : [];

    // Show all bids for "All" category
    filteredBids = userBids;
  } catch (error) {
    console.error("🔍 [AllBidsPage] Error fetching bids:", error);
    userBids = [];
    filteredBids = [];
  }

  // Ensure filteredBids is always an array
  const safeFilteredBids = Array.isArray(filteredBids) ? filteredBids : [];

  return (
    <div className="flex min-h-[40rem] w-full flex-col gap-5">
      <div className="flex gap-1 text-xl">
        <span className="font-medium">{safeFilteredBids.length}</span>
        <span className="text-battleShipGray">Results</span>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {safeFilteredBids.length === 0 ? (
          <div className="col-span-full py-10 text-center text-gray-400">
            No bids found.
          </div>
        ) : (
          safeFilteredBids.map((item, index) => (
            <BidCard key={item.id || index} item={item} />
          ))
        )}
      </div>
    </div>
  );
};

export default AllBidsPage;

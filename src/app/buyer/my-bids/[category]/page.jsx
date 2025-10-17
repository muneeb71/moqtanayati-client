import BidCard from "@/components/sections/landing/my-bids/BidCard";
import { getMyBids } from "@/lib/api/auctions/getMyBid";
import { dummyBids } from "@/lib/dummy-bids";

const MyBidsPage = async ({ params }) => {
  const category = (await params).category?.toLowerCase();

  // Initialize with empty arrays
  let userBids = [];
  let filteredBids = [];

  try {
    const bids = await getMyBids();
    console.log("🔍 [MyBidsPage] API response:", bids);

    // Ensure we have a valid array
    userBids = Array.isArray(bids?.data) ? bids.data : [];
    console.log("🔍 [MyBidsPage] User bids:", userBids);
    console.log("🔍 [MyBidsPage] User bids length:", userBids.length);

    // Filtering logic
    filteredBids = userBids;
    if (category === "active") {
      filteredBids = userBids.filter((bid) => bid?.auction?.status === "LIVE");
    } else if (category === "won") {
      filteredBids = userBids.filter((bid) => bid?.status === "WON");
    } else if (category === "outbid") {
      filteredBids = userBids.filter((bid) => bid?.status === "OUTBID");
    }
    // 'all' or any other: show all

    console.log("🔍 [MyBidsPage] Filtered bids:", filteredBids);
    console.log("🔍 [MyBidsPage] Filtered bids length:", filteredBids.length);
  } catch (error) {
    console.error("🔍 [MyBidsPage] Error fetching bids:", error);
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

export default MyBidsPage;

import BidCard from "@/components/sections/landing/my-bids/BidCard";
import { getMyBids } from "@/lib/api/auctions/getMyBid";
import { dummyBids } from "@/lib/dummy-bids";

const MyBidsPage = async ({ params }) => {
  const category = (await params).category?.toLowerCase();
  const bids = await getMyBids() || [];
  const userBids = bids?.data || [];

  // Filtering logic
  let filteredBids = userBids;
  if (category === "active") {
    filteredBids = userBids.filter(bid => bid?.auction?.status === "LIVE");
  } else if (category === "won") {
    filteredBids = userBids.filter(bid => bid?.status === "WON");
  } else if (category === "outbid") {
    filteredBids = userBids.filter(bid => bid?.status === "OUTBID");
  }
  // 'all' or any other: show all

  return (
    <div className="flex w-full flex-col gap-5 min-h-[40rem]">
      <div className="flex gap-1 text-xl">
        <span className="font-medium">{filteredBids.length}</span>
        <span className="text-battleShipGray">Results</span>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filteredBids.length === 0 ? (
          <div className="col-span-full text-center text-gray-400 py-10">No bids found.</div>
        ) : (
          filteredBids.map((item, index) => (
            <BidCard key={item.id || index} item={item} />
          ))
        )}
      </div>
    </div>
  );
};

export default MyBidsPage;

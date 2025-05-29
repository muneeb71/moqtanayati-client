import BidCard from "@/components/sections/landing/my-bids/BidCard";
import { dummyBids } from "@/lib/dummy-bids";

const MyBidsPage = async ({ params }) => {
  const category = (await params).category;
  return (
    <div className="flex w-full flex-col gap-5 min-h-[40rem]">
      <div className="flex gap-1 text-xl">
        <span className="font-medium">{dummyBids.length}</span>
        <span className="text-battleShipGray">Results</span>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {dummyBids.map((item, index) => (
          <BidCard item={item} />
        ))}
      </div>
    </div>
  );
};

export default MyBidsPage;

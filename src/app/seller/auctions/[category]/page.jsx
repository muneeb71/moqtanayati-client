import AuctionResults from "@/components/sections/seller/auctions/AuctionResults";
import { dummyItems } from "@/lib/dummy-items";

const AuctionsPage = () => {
  return <AuctionResults items={dummyItems} />;
};

export default AuctionsPage;

import AuctionResults from "@/components/sections/seller/auctions/AuctionResults";

const AuctionsPage = async ({ params, children }) => {
  const auctionType = (await params).category;

  return <AuctionResults auctionType={auctionType} />;
};

export default AuctionsPage;

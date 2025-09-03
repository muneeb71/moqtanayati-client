import { getAuctionsBySellerId } from "@/lib/api/auctions/getAllByStoreId";
import { AuctionStoreProvider } from "@/providers/auction-store-provider";

const AuctionLayout = async ({ children }) => {
  const auctions = await getAuctionsBySellerId();
  console.log("auction received : ", auctions.auctions);
  return (
    <AuctionStoreProvider auctionProducts={auctions.auctions}>
      {children}
    </AuctionStoreProvider>
  );
};

export default AuctionLayout;

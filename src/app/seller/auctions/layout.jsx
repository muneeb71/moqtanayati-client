import { getAuctionsBySellerId } from "@/lib/api/auctions/getAllByStoreId";
import { AuctionStoreProvider } from "@/providers/auction-store-provider";

const AuctionLayout = async ({ children }) => {
  const auctions = await getAuctionsBySellerId();
  return (
    <AuctionStoreProvider auctionProducts={auctions}>
      {children}
    </AuctionStoreProvider>
  );
};

export default AuctionLayout;

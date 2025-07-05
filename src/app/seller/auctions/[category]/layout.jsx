import PageHeading from "@/components/headings/PageHeading";
import SellerAuctionBar from "@/components/sections/seller/auctions/SellerAuctionBar";
import { getAuctionsBySellerId } from "@/lib/api/auctions/getAllByStoreId";

const CategoryLayout = async ({ children }) => {
  return (
    <div className="flex w-full flex-col items-center px-3">
      <PageHeading>
        <div className="flex items-baseline gap-1">
          <span className="text-sm md:text-[24px] md:leading-[36px]">
            My Auctions
          </span>
        </div>
      </PageHeading>
      <div className="flex w-full max-w-7xl flex-col items-center justify-center py-5">
        <div className="flex w-full flex-col gap-5">
          <SellerAuctionBar />
        </div>
        {children}
      </div>
    </div>
  );
};

export default CategoryLayout;

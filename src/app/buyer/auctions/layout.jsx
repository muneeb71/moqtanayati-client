import PageHeading from "@/components/headings/PageHeading";
import AuctionTypeBar from "@/components/sections/landing/auctions/AuctionTypeBar";
import { unslugify } from "@/utils/slugify";

const CategoryLayout = async ({ params, children }) => {

  const auctionType = (await params).type;
//   const category = unslugify(auctionType);
  const category = "";

  return (
    <div className="flex w-full flex-col items-center px-3">
      <PageHeading>
        <div className="flex items-baseline gap-1">
          <span className="text-sm md:text-[24px] md:leading-[36px]">
            Auctions
          </span>
          {/* {category} */}
        </div>
      </PageHeading>
      <div className="flex w-full max-w-7xl flex-col items-center justify-center py-5">
        <div className="flex w-full flex-col gap-5">
          <AuctionTypeBar category={"all"} auctionType={auctionType} />
        </div>
        {children}
      </div>
    </div>
  );
};

export default CategoryLayout;

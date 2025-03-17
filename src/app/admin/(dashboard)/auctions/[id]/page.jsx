import AuctionBidders from "@/components/sections/admin/auctions/AuctionBidders";
import AuctionsDescriptionCard from "@/components/sections/admin/auctions/AuctionsDescriptionCard";
import ProductDetailsSlider from "@/components/slider/ProductDetailsSlider";
import { dummyItems } from "@/lib/dummy-items";

const AdminAuctionPage = async ({ params }) => {
  const productId = (await params).id;
  const item = dummyItems.find((item) => item.id == productId);

  return (
    <div className="flex w-full flex-col items-center gap-10 pb-20">
      <button className="self-end rounded-lg bg-white px-3 py-2 font-medium text-faluRed hover:bg-faluRed/10">
        Cancel Auction
      </button>
      <div className="grid w-full max-w-7xl gap-10 md:grid-cols-2">
        <ProductDetailsSlider />
        <AuctionsDescriptionCard item={item} />
      </div>
      <AuctionBidders />
    </div>
  );
};

export default AdminAuctionPage;

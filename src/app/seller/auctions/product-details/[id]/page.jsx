import AuctionProductDetailsCard from "@/components/sections/seller/auctions/AuctionProductDetailsCard";
import SellerBiddersSection from "@/components/sections/seller/auctions/SellerBidderSection";
import ProductDetailsSlider from "@/components/slider/ProductDetailsSlider";
import { dummyItems } from "@/lib/dummy-items";

const ProductDetailsPage = async ({ params }) => {
  const productId = (await params).id;
  const item = dummyItems.find((item) => item.id == productId);

  return (
    <>
      <div className="grid w-full max-w-7xl gap-10 px-3 py-8 md:grid-cols-2 md:py-20">
        <ProductDetailsSlider />
        <AuctionProductDetailsCard item={item} />
      </div>
      <SellerBiddersSection />
    </>
  );
};

export default ProductDetailsPage;

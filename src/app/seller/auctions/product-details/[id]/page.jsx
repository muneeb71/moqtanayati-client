import AuctionProductDetailsCard from "@/components/sections/seller/auctions/AuctionProductDetailsCard";
import SellerBiddersSection from "@/components/sections/seller/auctions/SellerBidderSection";
import ProductDetailsSlider from "@/components/slider/ProductDetailsSlider";
import { getAuctionById } from "@/lib/api/auctions/getById";

const ProductDetailsPage = async ({ params }) => {
  const productId = (await params).id;
  const auction = await getAuctionById(productId);

  return (
    <>
      <div className="grid w-full max-w-7xl gap-10 px-3 py-8 md:grid-cols-2 md:py-20">
        <ProductDetailsSlider images={auction.product.images} />
        <AuctionProductDetailsCard auction={auction} />
      </div>
      <SellerBiddersSection bids={auction.bids} />
    </>
  );
};

export default ProductDetailsPage;

import RecommendedSection from "@/components/sections/landing/home/RecommendedSection";
import BiddersSection from "@/components/sections/landing/product-details/BiddersSection";
import ProductDetailsCard from "@/components/sections/landing/product-details/ProductDetailsCard";
import SellerReviewCard from "@/components/sections/landing/product-details/SellerReviewCard";
import ProductDetailsSlider from "@/components/slider/ProductDetailsSlider";
import getBidById from "@/lib/api/auctions/getBid";
import { getProductById } from "@/lib/api/product/getById";
import { getWatchlistById } from "@/lib/api/watchlist/getWatchlistById";
import { dummyItems } from "@/lib/dummy-items";

const ProductDetailsPage = async ({ params }) => {
  const productId = (await params).id;
  const item = await getProductById(productId); 
  const bids = item?.pricingFormat === "Auctions" ? await getBidById(item?.id): [];

  return (
    <>
      <div className="grid w-full max-w-7xl gap-10 px-3 py-8 md:grid-cols-2 md:py-20">
        <div className="flex flex-col gap-5">
          <ProductDetailsSlider images={item?.images || []} id={productId}/>
          <SellerReviewCard seller={item?.store?.user}/>
        </div>
        <ProductDetailsCard item={item} totalBids={bids?.data?.length || 0}/>
      </div>
      {item?.pricingFormat === "Auctions" && <BiddersSection />}
      <div className="flex w-full px-3 pb-16 pt-20">
        <RecommendedSection title="You might also like" />
      </div>
    </>
  );
};

export default ProductDetailsPage;

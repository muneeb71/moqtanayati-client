"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import RecommendedSection from "@/components/sections/landing/home/RecommendedSection";
import BiddersSection from "@/components/sections/landing/product-details/BiddersSection";
import ProductDetailsCard from "@/components/sections/landing/product-details/ProductDetailsCard";
import SellerReviewCard from "@/components/sections/landing/product-details/SellerReviewCard";
import ProductDetailsSlider from "@/components/slider/ProductDetailsSlider";

import getBidById from "@/lib/api/auctions/getBid";
import { getProductById } from "@/lib/api/product/getById";

const ProductDetailsPage = () => {
  const { id: productId } = useParams();
  const [item, setItem] = useState(null);
  const [bids, setBids] = useState([]);

  const fetchData = async () => {
    try {
      const itemData = await getProductById(productId);
      setItem(itemData);

      if (itemData?.pricingFormat === "Auctions") {
        const bidData = await getBidById(itemData?.id);
        setBids(bidData?.data || []);
      } else {
        setBids([]);
      }
    } catch (error) {
      console.error("Failed to fetch product or bids:", error);
    }
  };

  useEffect(() => {
    if (productId) {
      fetchData();
    }
  }, [productId]);

  if (!item) return <div>Loading...</div>;

  return (
    <>
      <div className="grid w-full max-w-7xl gap-10 px-3 py-8 md:grid-cols-2 md:py-20">
        <div className="flex flex-col gap-5">
          <ProductDetailsSlider images={item?.images || []} id={productId} pricingFormat={item?.pricingFormat}/>
          <SellerReviewCard seller={item?.store?.user} />
        </div>
        <ProductDetailsCard item={item} totalBids={bids?.length || 0} fetchData={fetchData}/>
      </div>
      {item?.pricingFormat === "Auctions" && <BiddersSection data={bids} fetchData={fetchData} />}
      <div className="flex w-full px-3 pb-16 pt-20">
        <RecommendedSection title="You might also like" />
      </div>
    </>
  );
};

export default ProductDetailsPage;

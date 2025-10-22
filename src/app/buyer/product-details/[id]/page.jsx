"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import RecommendedSection from "@/components/sections/landing/home/RecommendedSection";
import BiddersSection from "@/components/sections/landing/product-details/BiddersSection";
import ProductDetailsCard from "@/components/sections/landing/product-details/ProductDetailsCard";
import SellerReviewCard from "@/components/sections/landing/product-details/SellerReviewCard";
import ProductDetailsSlider from "@/components/slider/ProductDetailsSlider";
import ProductDetailsSkeleton from "@/components/loaders/ProductDetailsSkeleton";

import getBidById from "@/lib/api/auctions/getBid";
import { getProductById } from "@/lib/api/product/getById";

const ProductDetailsPage = () => {
  const { id: productId } = useParams();
  console.log(
    "🔍 [ProductDetails] Component mounted, productId from useParams:",
    productId,
  );
  const [item, setItem] = useState(null);
  const [bids, setBids] = useState([]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [productId]);

  const fetchData = async () => {
    try {
      console.log("in fetching bid data");
      const itemData = await getProductById(productId);
      console.log("🔍 [ProductDetails] Item data:", itemData);
      console.log("🔍 [ProductDetails] Images:", itemData?.images);
      setItem(itemData);

      if (itemData?.pricingFormat === "Auctions") {
        console.log("🔍 [ProductDetails] Product ID for bids:", itemData?.id);
        const bidData = await getBidById(itemData?.id);
        console.log("🔍 [ProductDetails] Bid data:", bidData);
        console.log("🔍 [ProductDetails] Bid data structure:", {
          success: bidData?.success,
          data: bidData?.data,
          bids: bidData?.bids,
          length: bidData?.data?.length,
          raw: bidData,
        });
        // Try multiple possible data structures
        const bidsArray = bidData?.data || bidData?.bids || bidData || [];
        console.log("🔍 [ProductDetails] Final bids array:", bidsArray);
        setBids(bidsArray);
      } else {
        setBids([]);
      }
    } catch (error) {
      console.log("Failed to fetch product or bids:", error);
    }
  };

  useEffect(() => {
    console.log(
      "🔍 [ProductDetails] useEffect triggered, productId:",
      productId,
    );
    if (productId) {
      console.log("🔍 [ProductDetails] Calling fetchData...");
      fetchData();
    } else {
      console.log("🔍 [ProductDetails] No productId, skipping fetchData");
    }
  }, [productId]);

  if (!item) return <ProductDetailsSkeleton />;

  return (
    <>
      <div className="grid w-full max-w-7xl gap-10 px-3 py-8 md:grid-cols-2 md:py-20">
        <div className="flex flex-col gap-5">
          <ProductDetailsSlider
            images={item?.images || []}
            id={productId}
            pricingFormat={item?.pricingFormat}
            auctionDetail={item}
          />
          <SellerReviewCard seller={item?.store?.user} />
        </div>
        <ProductDetailsCard
          item={item}
          totalBids={bids?.length || 0}
          fetchData={fetchData}
        />
      </div>
      {item?.pricingFormat === "Auctions" && (
        <BiddersSection data={bids} fetchData={fetchData} />
      )}
      <div className="flex w-full px-3 pb-16 pt-20">
        <RecommendedSection title="You might also like" />
      </div>
    </>
  );
};

export default ProductDetailsPage;

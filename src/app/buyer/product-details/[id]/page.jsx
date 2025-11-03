"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import RecommendedSection from "@/components/sections/landing/home/RecommendedSection";
import BiddersSection from "@/components/sections/landing/product-details/BiddersSection";
import ProductDetailsCard from "@/components/sections/landing/product-details/ProductDetailsCard";
import SellerReviewCard from "@/components/sections/landing/product-details/SellerReviewCard";
import ProductDetailsSlider from "@/components/slider/ProductDetailsSlider";
import ProductDetailsSkeleton from "@/components/loaders/ProductDetailsSkeleton";
import useTranslation from "@/hooks/useTranslation";

import getBidById from "@/lib/api/auctions/getBid";
import { getProductById } from "@/lib/api/product/getById";

const ProductDetailsPage = () => {
  const { t } = useTranslation();
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
      console.log(
        "🔍 [ProductDetails] Full item data structure:",
        JSON.stringify(itemData, null, 2),
      );
      console.log(
        "🔍 [ProductDetails] Item data keys:",
        Object.keys(itemData || {}),
      );
      console.log("🔍 [ProductDetails] Images:", itemData?.images);
      console.log("🔍 [ProductDetails] Auction data:", itemData?.auction);
      console.log(
        "🔍 [ProductDetails] Bids in auction:",
        itemData?.auction?.bids,
      );
      console.log("🔍 [ProductDetails] Bids list:", itemData?.bids);
      console.log("🔍 [ProductDetails] BidsList:", itemData?.bidsList);
      console.log("🔍 [ProductDetails] Bidders:", itemData?.bidders);
      setItem(itemData);

      if (itemData?.pricingFormat === "Auctions") {
        console.log("🔍 [ProductDetails] Product ID for bids:", itemData?.id);

        // Try to get bids from product data first
        let bidsArray = [];

        // Check all possible bid field names in the product data
        const possibleBidFields = [
          itemData?.auction?.bids,
          itemData?.bids,
          itemData?.bidsList,
          itemData?.bidders,
          itemData?.auction?.bidsList,
          itemData?.auction?.bidders,
        ];

        for (let i = 0; i < possibleBidFields.length; i++) {
          const bidField = possibleBidFields[i];
          if (bidField && Array.isArray(bidField) && bidField.length > 0) {
            bidsArray = bidField;
            const fieldNames = [
              "auction.bids",
              "bids",
              "bidsList",
              "bidders",
              "auction.bidsList",
              "auction.bidders",
            ];
            console.log(
              `🔍 [ProductDetails] Using bids from ${fieldNames[i]}:`,
              bidsArray.length,
            );
            break;
          }
        }

        // Fallback to API call if no bids found in product data
        if (bidsArray.length === 0) {
          console.log(
            "🔍 [ProductDetails] No bids in product data, fetching from API...",
          );
          try {
            const bidData = await getBidById(itemData?.id);

            // Extract bids from API response
            if (bidData?.success && bidData?.data) {
              bidsArray = Array.isArray(bidData.data) ? bidData.data : [];
            } else if (bidData?.bids) {
              bidsArray = Array.isArray(bidData.bids) ? bidData.bids : [];
            } else if (Array.isArray(bidData)) {
              bidsArray = bidData;
            }

            console.log("🔍 [ProductDetails] Bids from API:", bidsArray.length);
          } catch (bidError) {
            console.error(
              "🔍 [ProductDetails] Error fetching bids from API:",
              bidError,
            );
            bidsArray = [];
          }
        }

        console.log("🔍 [ProductDetails] Final bids array:", bidsArray);
        setBids(bidsArray);
      } else {
        console.log(
          "🔍 [ProductDetails] Product is not an auction, setting empty bids",
        );
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
          bids={bids}
          fetchData={fetchData}
        />
      </div>
      {item?.pricingFormat === "Auctions" ||
        (item?.pricingFormat === "auctions" && (
          <BiddersSection data={bids} item={item} fetchData={fetchData} />
        ))}
      <div className="flex w-full px-3 pb-16 pt-20">
        <RecommendedSection
          title={t("buyer.product_details.you_might_also_like")}
        />
      </div>
    </>
  );
};

export default ProductDetailsPage;

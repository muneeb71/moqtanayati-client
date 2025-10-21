"use client";

import ItemCard from "@/components/cards/ItemCard";
import CustomLink from "@/components/link/CustomLink";
import ItemSlider from "@/components/slider/ItemSlider";
import { dummyItems } from "@/lib/dummy-items";
import { getUserOrdersClient } from "@/lib/api/orders/getUserOrdersClient";
import { getProductsClient } from "@/lib/api/product/getAllProductsClient";
import { getWatchlist } from "@/lib/api/watchlist/getWatchlist";
import { useState, useEffect } from "react";

const RecommendedSection = ({ title = "Recommended For You" }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sectionTitle, setSectionTitle] = useState(title);

  useEffect(() => {
    const fetchRecommendedProducts = async () => {
      try {
        setLoading(true);
        console.log(
          "🔍 [RecommendedSection] Starting to fetch recommended products...",
        );

        // Fetch watchlist data to check which products are already favorited
        const watchlistResponse = await getWatchlist();
        const watchlistItems = watchlistResponse.success
          ? watchlistResponse.data?.data || watchlistResponse.data || []
          : [];
        console.log("🔍 [RecommendedSection] Watchlist items:", watchlistItems);

        // Create a set of product IDs that are in the watchlist
        const watchlistProductIds = new Set();
        watchlistItems.forEach((item) => {
          if (item.auction?.product?.id) {
            watchlistProductIds.add(item.auction.product.id);
          }
        });

        // First, check if buyer has any orders
        const ordersResponse = await getUserOrdersClient();
        console.log("🔍 [RecommendedSection] Orders response:", ordersResponse);

        const hasOrders =
          ordersResponse.success &&
          ordersResponse.data &&
          ordersResponse.data.length > 0;
        console.log("🔍 [RecommendedSection] Has orders:", hasOrders);

        if (hasOrders) {
          // If buyer has orders, show similar category products
          console.log(
            "🔍 [RecommendedSection] Buyer has orders, fetching similar category products...",
          );

          // Get categories from previous orders
          const orderCategories = ordersResponse.data
            .map((order) => order.product?.categories || [])
            .flat()
            .filter(Boolean);

          console.log(
            "🔍 [RecommendedSection] Order categories:",
            orderCategories,
          );

          // Fetch all products and filter by similar categories
          const productsResponse = await getProductsClient();
          if (productsResponse.success && productsResponse.data) {
            const similarProducts = productsResponse.data.filter(
              (product) =>
                product.categories &&
                product.categories.some((category) =>
                  orderCategories.includes(category),
                ),
            );

            // Filter products based on pricing format and auction status
            const filteredProducts = similarProducts.filter((product) => {
              // Always show fixed price products
              if (product.pricingFormat?.toLowerCase() === "fixed price") {
                return true;
              }

              // For auction products, check if they are live or upcoming
              if (product.pricingFormat?.toLowerCase() === "auctions") {
                if (!product.auctionLaunchDate || !product.auctionDuration) {
                  return true; // Show if no auction data (fallback)
                }

                const launchDate = new Date(product.auctionLaunchDate);
                const durationInMs = product.auctionDuration * 60 * 60 * 1000; // Convert hours to milliseconds
                const endDate = new Date(launchDate.getTime() + durationInMs);
                const now = new Date();

                // Show if auction is live or upcoming (not expired)
                return now < endDate;
              }

              return false; // Hide other pricing formats
            });

            // Add isFavourite property based on watchlist
            const productsWithFavorites = filteredProducts.map((product) => ({
              ...product,
              isFavourite: watchlistProductIds.has(product.id),
            }));

            console.log(
              "🔍 [RecommendedSection] Similar products found:",
              similarProducts.length,
            );
            setProducts(productsWithFavorites);
            setSectionTitle("Recommended For You");
          } else {
            // Fallback to dummy items if API fails
            setProducts(dummyItems);
            setSectionTitle("Recommended For You");
          }
        } else {
          // If buyer has no orders, show all products
          console.log(
            "🔍 [RecommendedSection] Buyer has no orders, fetching all products...",
          );

          const productsResponse = await getProductsClient();
          if (productsResponse.success && productsResponse.data) {
            // Filter products based on pricing format and auction status
            const filteredProducts = productsResponse.data.filter((product) => {
              // Always show fixed price products
              if (product.pricingFormat?.toLowerCase() === "fixed price") {
                return true;
              }

              // For auction products, check if they are live or upcoming
              if (product.pricingFormat?.toLowerCase() === "auctions") {
                if (!product.auctionLaunchDate || !product.auctionDuration) {
                  return true; // Show if no auction data (fallback)
                }

                const launchDate = new Date(product.auctionLaunchDate);
                const durationInMs = product.auctionDuration * 60 * 60 * 1000; // Convert hours to milliseconds
                const endDate = new Date(launchDate.getTime() + durationInMs);
                const now = new Date();

                // Show if auction is live or upcoming (not expired)
                return now < endDate;
              }

              return false; // Hide other pricing formats
            });

            // Add isFavourite property based on watchlist
            const productsWithFavorites = filteredProducts.map((product) => ({
              ...product,
              isFavourite: watchlistProductIds.has(product.id),
            }));

            console.log(
              "🔍 [RecommendedSection] All products found:",
              productsResponse.data.length,
            );
            setProducts(productsWithFavorites);
            setSectionTitle("Products");
          } else {
            // Fallback to dummy items if API fails
            setProducts(dummyItems);
            setSectionTitle("Recommended For You");
          }
        }
      } catch (error) {
        console.error(
          "🔍 [RecommendedSection] Error fetching recommended products:",
          error,
        );
        // Fallback to dummy items on error
        setProducts(dummyItems);
        setSectionTitle("Recommended For You");
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendedProducts();
  }, []);

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="flex w-full max-w-7xl flex-col">
        <div className="flex w-full max-w-7xl items-center justify-between px-2">
          <h1 className="text-lg font-medium leading-[48px] text-delftBlue md:text-[32px]">
            {sectionTitle}
          </h1>
          {/* <CustomLink className="md:text-[21.8px]">See All</CustomLink> */}
        </div>
      </div>
      {loading ? (
        <div className="flex w-full justify-center py-8">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-moonstone border-t-transparent" />
        </div>
      ) : (
        <ItemSlider items={products} section={"recommendations"} />
      )}
    </div>
  );
};

export default RecommendedSection;

"use client";

import ItemCard from "@/components/cards/ItemCard";
import CustomLink from "@/components/link/CustomLink";
import ItemSlider from "@/components/slider/ItemSlider";
import { getPopularProducts } from "@/lib/api/product/getPopularProducts";
import { getWatchlist } from "@/lib/api/watchlist/getWatchlist";
import { useState, useEffect } from "react";

const PopularSection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopularProducts = async () => {
      try {
        setLoading(true);

        // Fetch watchlist data to check which products are already favorited
        const watchlistResponse = await getWatchlist();
        const watchlistItems = watchlistResponse.success
          ? watchlistResponse.data?.data || watchlistResponse.data || []
          : [];
        console.log("🔍 [PopularSection] Watchlist items:", watchlistItems);

        // Create a set of product IDs that are in the watchlist
        const watchlistProductIds = new Set();
        watchlistItems.forEach((item) => {
          if (item.auction?.product?.id) {
            watchlistProductIds.add(item.auction.product.id);
          }
        });

        const response = await getPopularProducts();

        console.log("response from getPopularProducts 0 : ", response);
        console.log("response from getPopularProducts 1: ", response.data);

        if (response.success) {
          // Add isFavourite property based on watchlist
          const productsWithFavorites = (response.data || []).map(
            (product) => ({
              ...product,
              isFavourite: watchlistProductIds.has(product.id),
            }),
          );

          console.log(
            "🔍 [PopularSection] Setting products:",
            productsWithFavorites,
          );
          setProducts(productsWithFavorites);
        } else {
          console.error("Error fetching popular products:", response.message);
          setProducts([]);
        }
      } catch (error) {
        console.error("Error fetching popular products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularProducts();
  }, []);

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="flex w-full max-w-7xl flex-col">
        <div className="flex w-full max-w-7xl items-center justify-between px-2">
          <h1 className="text-lg font-medium leading-[48px] text-delftBlue md:text-[32px]">
            Popular
          </h1>
          {/* <CustomLink className="md:text-[21.8px]">See All</CustomLink> */}
        </div>
      </div>
      {loading ? (
        <div className="flex w-full justify-center py-8">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-moonstone border-t-transparent" />
        </div>
      ) : (
        <>
          {console.log(
            "🔍 [PopularSection] Rendering ItemSlider with products:",
            products,
          )}
          <ItemSlider items={products} section={"popular"} />
        </>
      )}
    </div>
  );
};

export default PopularSection;

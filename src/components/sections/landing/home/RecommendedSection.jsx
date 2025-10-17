"use client";

import ItemCard from "@/components/cards/ItemCard";
import CustomLink from "@/components/link/CustomLink";
import ItemSlider from "@/components/slider/ItemSlider";
import { dummyItems } from "@/lib/dummy-items";
import { getUserOrdersClient } from "@/lib/api/orders/getUserOrdersClient";
import { getProductsClient } from "@/lib/api/product/getAllProductsClient";
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

            console.log(
              "🔍 [RecommendedSection] Similar products found:",
              similarProducts.length,
            );
            setProducts(similarProducts);
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
            console.log(
              "🔍 [RecommendedSection] All products found:",
              productsResponse.data.length,
            );
            setProducts(productsResponse.data);
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

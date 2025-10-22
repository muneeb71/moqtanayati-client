"use client";

import SearchInput from "@/components/form-fields/SearchInput";
import ResultItems from "@/components/sections/landing/categories/ResultItems";
import { useProductsStore } from "@/providers/products-store-provider";
import { getProductsClient } from "@/lib/api/product/getAllProductsClient";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const SearchClient = () => {
  const searchParams = useSearchParams();
  const key = searchParams?.get("q") || "";
  const category = searchParams?.get("category") || "";
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTitle, setSearchTitle] = useState("");
  const { products, setProducts, searchProducts } = useProductsStore();

  console.log("🔍 [SearchClient] Store products:", products);
  console.log("🔍 [SearchClient] Products type:", typeof products);
  console.log("🔍 [SearchClient] Products length:", products?.length);

  useEffect(() => {
    const handleSearch = async () => {
      setLoading(true);
      setError(null);

      try {
        // Check if we have category products in sessionStorage
        if (category) {
          const categoryProducts = sessionStorage.getItem("categoryProducts");
          const categoryName = sessionStorage.getItem("categoryName");

          if (categoryProducts) {
            const parsedProducts = JSON.parse(categoryProducts);
            setItems(parsedProducts);
            setSearchTitle(categoryName || category);
            console.log(
              "🔍 [SearchClient] Using category products from sessionStorage:",
              parsedProducts.length,
            );
            return;
          }
        }

        // Always fetch products directly to avoid store issues
        console.log("🔍 [SearchClient] Fetching products...");
        const response = await getProductsClient();
        if (response.success && response.data) {
          // Store products in Zustand store for future use
          setProducts(response.data);
          console.log(
            "🔍 [SearchClient] Products fetched:",
            response.data.length,
          );

          // If there's a search key, filter the results
          if (key) {
            const searchResults = response.data.filter(
              (product) =>
                product.name?.toLowerCase().includes(key.toLowerCase()) ||
                product.description
                  ?.toLowerCase()
                  .includes(key.toLowerCase()) ||
                (product.categories || []).some((cat) =>
                  cat.toLowerCase().includes(key.toLowerCase()),
                ),
            );
            setItems(searchResults);
            setSearchTitle(key);
            console.log(
              "🔍 [SearchClient] Search results:",
              searchResults.length,
            );
          } else {
            // Show all products if no search key
            setItems(response.data);
            setSearchTitle("All Products");
            console.log(
              "🔍 [SearchClient] Showing all products:",
              response.data.length,
            );
          }
        } else {
          setError("Failed to fetch products.");
        }
      } catch (err) {
        console.error("Search error:", err);
        setError("Failed to fetch search results.");
      } finally {
        setLoading(false);
      }
    };

    handleSearch();
  }, [key, category, products, setProducts, searchProducts]);

  return (
    <div className="flex w-full flex-col items-center justify-center px-3">
      <div className="flex w-full max-w-7xl flex-col items-center gap-10 py-20">
        {!category && <SearchInput />}
        <div className="flex flex-col items-center gap-1">
          {searchTitle ? (
            <>
              <p className="text-center font-medium text-battleShipGray">
                {category
                  ? "Products in Category"
                  : searchTitle === "All Products"
                    ? "Browse All Products"
                    : "Search Results for"}
              </p>
              <span className="text-center text-[32px] font-medium leading-[48px] text-eerieBlack">
                {searchTitle}
              </span>
            </>
          ) : (
            <p>No search query provided.</p>
          )}
        </div>
        {loading ? (
          <div className="flex w-full justify-center py-8">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-moonstone border-t-transparent" />
          </div>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <ResultItems items={items} />
        )}
      </div>
    </div>
  );
};

export default SearchClient;

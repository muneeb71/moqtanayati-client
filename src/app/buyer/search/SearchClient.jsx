"use client";

import SearchInput from "@/components/form-fields/SearchInput";
import ResultItems from "@/components/sections/landing/categories/ResultItems";
import { getProductsClient } from "@/lib/api/product/getAllProductsClient";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ArrowLeft, X, Search } from "lucide-react";

const SearchClient = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const key = searchParams?.get("q") || "";
  const category = searchParams?.get("category") || "";
  const [items, setItems] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

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
          console.log(
            "🔍 [SearchClient] Products fetched:",
            response.data.length,
          );

          // Store all products for clearing search
          setAllProducts(response.data);

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
  }, [key, category]);

  // Search within current context (category or all products)
  const searchWithinContext = (searchQuery) => {
    if (!searchQuery.trim()) {
      if (category) {
        setItems(allProducts);
        setSearchTitle(category);
      } else {
        setItems(allProducts);
        setSearchTitle("All Products");
      }
      return;
    }

    const searchResults = allProducts.filter(
      (product) =>
        product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        (product.categories || []).some((cat) =>
          cat.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
    );

    setItems(searchResults);
    if (category) {
      setSearchTitle(`Search in ${category}: "${searchQuery}"`);
    } else {
      setSearchTitle(`Search Results for "${searchQuery}"`);
    }
  };

  // Clear search function
  const clearSearch = () => {
    setSearchQuery(""); // Clear the search input
    if (category) {
      // If we're in a category context, show all products from that category
      setItems(allProducts);
      setSearchTitle(category);
    } else {
      // If we're in general search, show all products
      setItems(allProducts);
      setSearchTitle("All Products");
      // Navigate to search page without query to clear the search
      router.push("/buyer/search");
    }
  };

  return (
    <div className="flex w-full flex-col items-center justify-center px-3">
      <div className="flex w-full max-w-7xl flex-col items-center gap-10 py-20">
        {/* Back Button */}
        <div className="flex w-full justify-start">
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </button>
        </div>

        {/* Custom Search Input that respects category context */}
        <div className="relative flex h-[60px] w-[88%] items-center justify-center gap-3 rounded-[12px] bg-[#F8F7F8] px-3 md:h-[75px] md:w-full md:max-w-[502px] md:px-5">
          <Search className="h-5 w-5 text-[#858699]" />
          <input
            type="text"
            value={searchQuery || ""}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent text-sm outline-none placeholder:text-[#858699] focus:outline-none md:text-[21px]"
            placeholder={
              category
                ? `Search within ${category}...`
                : "Search for anything you need…"
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                searchWithinContext(searchQuery);
              }
            }}
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery("");
                searchWithinContext("");
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
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
              <div className="flex items-center gap-3">
                <span className="text-center text-[32px] font-medium leading-[48px] text-eerieBlack">
                  {searchTitle}
                </span>
                {/* Clear search button - only show when there's a search query */}
                {(key || searchQuery) && (
                  <button
                    onClick={clearSearch}
                    className="flex items-center gap-1 rounded-lg border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    title={
                      category
                        ? `Clear search and show all ${category} products`
                        : "Clear search and show all products"
                    }
                  >
                    <X className="h-4 w-4" />
                    Clear
                  </button>
                )}
              </div>
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

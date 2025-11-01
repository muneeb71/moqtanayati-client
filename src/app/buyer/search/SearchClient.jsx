"use client";

import SearchInput from "@/components/form-fields/SearchInput";
import ResultItems from "@/components/sections/landing/categories/ResultItems";
import { getProductsClient } from "@/lib/api/product/getAllProductsClient";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ArrowLeft, X, Search } from "lucide-react";
import PageHeading from "@/components/headings/PageHeading";

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
  const [categoryNameFromSession, setCategoryNameFromSession] = useState("");

  // Keep header title in sync with selected category even if products aren't loaded from session
  useEffect(() => {
    const name =
      typeof window !== "undefined"
        ? sessionStorage.getItem("categoryName")
        : null;
    if (category) {
      setCategoryNameFromSession(name || category);
    }
  }, [category]);

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
            setAllProducts(parsedProducts);
            setSearchTitle(categoryName || category);
            setCategoryNameFromSession(categoryName || "");
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

          // Decide initial visible set and baseline for in-context searching
          let initialList = response.data;
          if (category) {
            initialList = response.data.filter((p) =>
              (p.categories || []).some(
                (c) => String(c).toLowerCase() === category.toLowerCase(),
              ),
            );
            setSearchTitle(categoryNameFromSession || category);
          }

          // If there's a search key, filter the results
          if (key) {
            const searchResults = initialList.filter(
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
            setAllProducts(searchResults); // future searches act on currently shown
            console.log(
              "🔍 [SearchClient] Search results:",
              searchResults.length,
            );
          } else {
            // Show initialList if no search key
            setItems(initialList);
            setAllProducts(initialList);
            if (!category) setSearchTitle("All Products");
            console.log(
              "🔍 [SearchClient] Showing all products:",
              initialList.length,
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

  // Search within current context (currently visible baseline in allProducts)
  const searchWithinContext = (searchQuery) => {
    if (!searchQuery.trim()) {
      setItems(allProducts);
      setSearchTitle(
        category ? category : allProducts.length ? "All Products" : "",
      );
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
    setSearchTitle(
      category
        ? `Search in ${category}: "${searchQuery}"`
        : `Search Results for "${searchQuery}"`,
    );
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
      <PageHeading>
        <div className="flex w-full items-center justify-between">
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium text-darkBlue backdrop-blur"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
          <span>{categoryNameFromSession || category || "All Products"}</span>
          <span className="w-10" />
        </div>
      </PageHeading>
      <div className="flex w-full max-w-7xl flex-col items-center gap-10 py-20">
        {/* Custom Search Input that respects category context */}
        <div className="relative flex h-[60px] w-[88%] items-center justify-center gap-3 rounded-[12px] bg-[#F8F7F8] px-3 md:h-[75px] md:w-full md:max-w-[502px] md:px-5">
          <Search className="h-5 w-5 text-[#858699]" />
          <input
            type="text"
            value={searchQuery || ""}
            onChange={(e) => {
              const val = e.target.value;
              setSearchQuery(val);
              searchWithinContext(val);
            }}
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

        {loading ? (
          <div className="flex w-full justify-center py-8">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-moonstone border-t-transparent" />
          </div>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : items && items.length > 0 ? (
          <ResultItems items={items} />
        ) : (
          <div className="flex w-full items-center justify-center py-20">
            <div className="w-full rounded-2xl bg-moonstone/10 py-16 text-center text-davyGray">
              <p className="text-xl font-medium">No products found</p>
              <p className="mt-1 text-sm">
                Try another keyword or clear the search.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchClient;

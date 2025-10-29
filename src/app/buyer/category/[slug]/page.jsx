"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import MenuCard from "@/components/cards/MenuCard";
import ItemCard from "@/components/cards/ItemCard";
import { getProductsClient } from "@/lib/api/product/getAllProductsClient";
import { dummyItems } from "@/lib/dummy-items";
import { ArrowLeft, X, Search } from "lucide-react";

const CategoryPage = () => {
  const params = useParams();
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const { slug } = params;

        if (!slug) {
          setProducts([]);
          setLoading(false);
          return;
        }

        // Check if we have category products in sessionStorage first
        const categoryProducts = sessionStorage.getItem("categoryProducts");
        const storedCategoryName = sessionStorage.getItem("categoryName");

        if (
          categoryProducts &&
          storedCategoryName === decodeURIComponent(slug)
        ) {
          const parsedProducts = JSON.parse(categoryProducts);
          setProducts(parsedProducts);
          console.log(
            "🔍 [CategoryPage] Using category products from sessionStorage:",
            parsedProducts.length,
          );
          setLoading(false);
          return;
        }

        // Fetch all products and filter by category
        console.log("🔍 [CategoryPage] Fetching all products...");
        const response = await getProductsClient();
        if (response.success && response.data) {
          const categoryName = decodeURIComponent(slug);
          const filteredProducts = response.data.filter((product) => {
            const productCategories =
              product.categories || product.productCategories || [];
            return productCategories.some(
              (cat) =>
                cat.toLowerCase().includes(categoryName.toLowerCase()) ||
                categoryName.toLowerCase().includes(cat.toLowerCase()),
            );
          });

          // Store all products for search functionality
          setAllProducts(filteredProducts);
          setProducts(filteredProducts);
          setSearchTitle(categoryName);
          console.log(
            "🔍 [CategoryPage] Filtered products:",
            filteredProducts.length,
          );
        } else {
          setProducts(dummyItems);
          setAllProducts(dummyItems);
          setSearchTitle(decodeURIComponent(slug));
        }
      } catch (err) {
        console.log("Error fetching products:", err);
        setError(err.message);
        setProducts(dummyItems);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [params.slug]);

  // Search within category function
  const searchWithinCategory = (query) => {
    if (!query.trim()) {
      setProducts(allProducts);
      setSearchTitle(decodeURIComponent(params.slug));
      return;
    }

    const searchResults = allProducts.filter(
      (product) =>
        product.name?.toLowerCase().includes(query.toLowerCase()) ||
        product.description?.toLowerCase().includes(query.toLowerCase()) ||
        (product.categories || []).some((cat) =>
          cat.toLowerCase().includes(query.toLowerCase()),
        ),
    );

    setProducts(searchResults);
    setSearchTitle(`Search in ${decodeURIComponent(params.slug)}: "${query}"`);
  };

  // Clear search function
  const clearSearch = () => {
    setSearchQuery("");
    setProducts(allProducts);
    setSearchTitle(decodeURIComponent(params.slug));
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-moonstone border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  const visibleProducts = (products || []).filter(
    (p) => p?.pricingFormat !== "Auctions",
  );

  return (
    <div className="flex w-full flex-col items-center justify-center px-3">
      <div className="flex w-full max-w-7xl flex-col items-center gap-10 py-20">
        {/* Search Input */}
        {/* <div className="relative flex h-[60px] w-[88%] items-center justify-center gap-3 rounded-[12px] bg-[#F8F7F8] px-3 md:h-[75px] md:w-full md:max-w-[502px] md:px-5">
          <Search className="h-5 w-5 text-[#858699]" />
          <input
            type="text"
            value={searchQuery || ""}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent text-sm outline-none placeholder:text-[#858699] focus:outline-none md:text-[21px]"
            placeholder={`Search within ${decodeURIComponent(params.slug)}...`}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                searchWithinCategory(searchQuery);
              }
            }}
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery("");
                searchWithinCategory("");
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div> */}

        {/* <div className="flex flex-col items-center gap-1">
          <p className="text-center font-medium text-battleShipGray">
            Products in Category
          </p>
          <div className="flex items-center gap-3">
            <span className="text-center text-[32px] font-medium leading-[48px] text-eerieBlack">
              {searchTitle || decodeURIComponent(params.slug)}
            </span>
            {/* Clear search button - only show when there's a search query */}
        {/* {searchQuery && (
              <button
                onClick={clearSearch}
                className="flex items-center gap-1 rounded-lg border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-50"
                title={`Clear search and show all ${decodeURIComponent(params.slug)} products`}
              >
                <X className="h-4 w-4" />
                Clear
              </button>
            )}
          </div> */}
        {/* </div>  */}

        <div className="flex w-full flex-col gap-5">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <h1 className="text-[21px] font-medium leading-[31px]">
                  {visibleProducts.length}{" "}
                  <span className="font-normal text-battleShipGray">
                    Results
                  </span>
                </h1>
              </div>
            </div>
          </div>

          <div className="grid w-full grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 md:grid-cols-3">
            {visibleProducts.length > 0 ? (
              visibleProducts.map((item, index) => {
                return (
                  <ItemCard
                    key={index}
                    id={item?.id}
                    title={item?.name}
                    price={item?.price || item?.buyItNow}
                    image={item?.images?.[0]}
                    address={item?.seller?.location || ""}
                    isFavourite={false}
                    pricingFormat={item?.pricingFormat}
                    buyItNow={item?.buyItNow}
                  />
                );
              })
            ) : (
              <div className="col-span-full py-10 text-center">
                No products found in this category.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;

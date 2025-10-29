"use client";
import { filterSvg } from "@/assets/icons/common-icons";
import MenuCard from "@/components/cards/MenuCard";
import AuctionResultSkeleton from "@/components/loaders/AuctionResultSkeleton";
import FiltersPopup from "@/components/popup/FilterPopup";
import { getAllAuctions } from "@/lib/api/auctions/getAll";
import { getAuctionPreferences } from "@/lib/api/profile/getPreferences";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";

const ResultItems = ({ items }) => {
  const pathname = usePathname();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMounted, setHasMounted] = useState(false);
  const [filterPopupOpen, setFilterPopupOpen] = useState(false);
  const [userPreferences, setUserPreferences] = useState(null);
  const [preferencesDisabled, setPreferencesDisabled] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState(null);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Initial data fetch
  useEffect(() => {
    setHasMounted(true);
    const getAuctionData = async () => {
      setLoading(true);
      try {
        // Fetch both auctions and user preferences
        const [auctionsRes, preferencesRes] = await Promise.all([
          getAllAuctions(),
          getAuctionPreferences(),
        ]);

        console.log("response auctions: ", auctionsRes.auctions);
        console.log("user preferences: ", preferencesRes);

        setProducts(auctionsRes.auctions || []);

        // Set preferences if they exist and have valid data
        if (preferencesRes.success && preferencesRes.data) {
          const prefs = preferencesRes.data;
          console.log("🔍 Raw preferences data:", prefs);

          // Only set preferences if they have meaningful values
          const hasCategories = prefs.categories && prefs.categories.length > 0;
          const hasPriceRange =
            (prefs.minPrice !== null && prefs.minPrice !== undefined) ||
            (prefs.maxPrice !== null && prefs.maxPrice !== undefined);

          console.log("🔍 Preferences validation:", {
            hasCategories,
            hasPriceRange,
            categories: prefs.categories,
            minPrice: prefs.minPrice,
            maxPrice: prefs.maxPrice,
          });

          if (hasCategories || hasPriceRange) {
            setUserPreferences(prefs);
            console.log("🔍 Preferences applied:", prefs);
          } else {
            console.log("🔍 No valid preferences found, showing all auctions");
          }
        } else {
          console.log("🔍 No preferences response or failed:", preferencesRes);
        }
      } catch (error) {
        setProducts([]);
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };
    getAuctionData();
  }, []);

  const getFilterType = () => {
    if (pathname === "/buyer/auctions") return "all";
    const type = pathname.split("/").pop();
    return type;
  };

  const handleApplyFilter = (filterData) => {
    console.log("🔍 Applied filters:", filterData);
    setAppliedFilters(filterData);
    setFilterPopupOpen(false);
  };

  // Apply manual filters from filter popup
  const applyManualFilters = (product) => {
    if (!appliedFilters) return true; // No filters applied, show all

    const { categories, location, condition, month, year } = appliedFilters;

    // Filter by categories if specified
    if (categories && categories.length > 0) {
      const productCategories =
        product?.product?.categories || product?.categories || [];
      const hasMatchingCategory = productCategories.some((productCategory) =>
        categories.some(
          (filterCategory) =>
            filterCategory.toLowerCase() === productCategory.toLowerCase(),
        ),
      );
      if (!hasMatchingCategory) return false;
    }

    // Filter by location if specified
    if (location && location.trim()) {
      const productLocation =
        product?.seller?.location || product?.location || "";
      if (!productLocation.toLowerCase().includes(location.toLowerCase())) {
        return false;
      }
    }

    // Filter by condition if specified
    if (condition && condition.trim()) {
      const productCondition =
        product?.product?.condition || product?.condition || "";
      if (productCondition.toLowerCase() !== condition.toLowerCase()) {
        return false;
      }
    }

    // Filter by month/year if specified
    if (month || year) {
      const productDate = new Date(
        product?.product?.createdAt || product?.createdAt,
      );
      if (month && productDate.getMonth() !== months.indexOf(month)) {
        return false;
      }
      if (year && productDate.getFullYear() !== parseInt(year)) {
        return false;
      }
    }

    return true;
  };

  // Apply user preferences filtering
  const applyPreferencesFilter = (product) => {
    if (!userPreferences || preferencesDisabled) return true; // No preferences set, show all

    const { categories, minPrice, maxPrice } = userPreferences;

    console.log("🔍 Filtering product:", {
      productName: product?.product?.name,
      productCategory: product?.product?.category,
      minimumOffer: product?.minimumOffer,
      userCategories: categories,
      userMinPrice: minPrice,
      userMaxPrice: maxPrice,
    });

    // Enhanced logging to see full product structure
    console.log("🔍 Full product structure:", {
      product: product,
      productKeys: product ? Object.keys(product) : "no product",
      productProduct: product?.product,
      productProductKeys: product?.product
        ? Object.keys(product.product)
        : "no product.product",
    });

    // Filter by categories if preferences exist AND product has category data
    if (categories && categories.length > 0) {
      // Get product categories (array/list)
      const productCategories =
        product?.product?.categories || product?.categories || [];

      console.log("🔍 Category search:", {
        productProductCategories: product?.product?.categories,
        productCategories: product?.categories,
        finalProductCategories: productCategories,
        userCategories: categories,
      });

      // If product has no categories data, skip category filtering
      if (!productCategories || productCategories.length === 0) {
        console.log(
          "🔍 Product has no categories data, skipping category filter",
        );
      } else {
        // Check if any of the product's categories match any of the user's preferred categories
        const hasMatchingCategory = productCategories.some((productCategory) =>
          categories.some(
            (userCategory) =>
              userCategory.toLowerCase() === productCategory.toLowerCase(),
          ),
        );

        console.log("🔍 Category match:", {
          productCategories,
          userCategories: categories,
          hasMatchingCategory,
        });
        if (!hasMatchingCategory) return false;
      }
    }

    // Filter by price range if preferences exist AND product has price data
    // Try different possible price field names
    const productPrice =
      product?.minimumOffer ||
      product?.product?.minimumOffer ||
      product?.product?.price ||
      product?.price ||
      product?.startingBid ||
      product?.product?.startingBid;

    console.log("🔍 Price search:", {
      productMinimumOffer: product?.minimumOffer,
      productProductMinimumOffer: product?.product?.minimumOffer,
      productProductPrice: product?.product?.price,
      productPrice: product?.price,
      productStartingBid: product?.startingBid,
      productProductStartingBid: product?.product?.startingBid,
      finalPrice: productPrice,
    });

    if (productPrice !== null && productPrice !== undefined) {
      if (
        minPrice !== null &&
        minPrice !== undefined &&
        productPrice < minPrice
      ) {
        console.log("🔍 Price too low:", {
          productPrice,
          minPrice,
        });
        return false;
      }
      if (
        maxPrice !== null &&
        maxPrice !== undefined &&
        productPrice > maxPrice
      ) {
        console.log("🔍 Price too high:", {
          productPrice,
          maxPrice,
        });
        return false;
      }
    } else {
      console.log("🔍 Product has no price data, skipping price filter");
    }

    console.log("🔍 Product passed all filters");
    return true;
  };

  if (!hasMounted) {
    return <AuctionResultSkeleton />;
  }

  if (loading) {
    return <AuctionResultSkeleton />;
  }

  const filteredProducts = products.filter((product) => {
    // First apply basic auction format filter
    if (product?.product?.pricingFormat?.toLowerCase() !== "auctions") {
      return false;
    }

    // Apply user preferences filter
    if (!applyPreferencesFilter(product)) {
      return false;
    }

    // Apply manual filters from filter popup
    if (!applyManualFilters(product)) {
      return false;
    }

    // Apply auction type filter (live, upcoming, history)
    const filterType = getFilterType();
    if (filterType === "all") return true;

    const now = new Date();
    const launchDate = new Date(product?.product?.auctionLaunchDate);
    const endDate = new Date(
      launchDate.getTime() +
        product?.product?.auctionDuration * 24 * 60 * 60 * 1000,
    );

    switch (filterType) {
      case "live-auctions":
        return product.status === "LIVE";
      case "upcoming":
        return product.status === "UPCOMING";
      case "history":
        return product.status === "ENDED";
      default:
        return true;
    }
  });

  return (
    <div className="flex w-full flex-col gap-5">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <h1 className="text-[21px] font-medium leading-[31px]">
              {filteredProducts.length}{" "}
              <span className="font-normal text-battleShipGray">Results</span>
            </h1>
          </div>
          {userPreferences && !preferencesDisabled && (
            <p className="text-sm text-moonstone">
              Filtered by your auction preferences
            </p>
          )}
          {appliedFilters && (
            <p className="text-sm text-moonstone">Manual filters applied</p>
          )}
          {userPreferences && (
            <button
              onClick={() => setPreferencesDisabled(!preferencesDisabled)}
              className="text-xs text-blue-500 underline"
            >
              {preferencesDisabled ? "Enable" : "Disable"} preferences filter
            </button>
          )}
          {appliedFilters && (
            <button
              onClick={() => setAppliedFilters(null)}
              className="text-xs text-red-500 underline"
            >
              Clear manual filters
            </button>
          )}
        </div>
        <button
          onClick={() => setFilterPopupOpen(true)}
          className="flex items-center gap-2 rounded-[12px] bg-[#F8F7FB] px-2 py-2 text-russianViolet transition-all duration-150 ease-in hover:bg-russianViolet hover:text-white"
        >
          {filterSvg}
          <span className="">Filters</span>
        </button>
      </div>
      <div className="grid w-full grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 md:grid-cols-3">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item, index) => (
            <MenuCard
              id={item?.id}
              key={index}
              title={item?.product?.name}
              user={item?.seller?.name}
              price={item.minimumOffer}
              image={item?.product?.images[0]}
              isFavourite={false}
              productId={item?.product?.id}
              highestBid={item.product.minimumOffer}
              startingBid={item?.product?.startingBid}
              showBidButton={getFilterType() !== "history"}
              status={item?.status}
              isAlreadyBidded={
                item?.bids?.some(
                  (bid) => bid.bidderId === getCookie("userId"),
                ) || false
              }
            />
          ))
        ) : (
          <div className="col-span-full py-10 text-center">
            No auctions found.
          </div>
        )}
      </div>
      {filterPopupOpen && (
        <FiltersPopup
          onClose={() => setFilterPopupOpen(false)}
          onApplyFilter={handleApplyFilter}
        />
      )}
    </div>
  );
};

export default ResultItems;

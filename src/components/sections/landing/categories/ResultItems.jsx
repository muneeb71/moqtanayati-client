"use client";
import { filterSvg } from "@/assets/icons/common-icons";
import ItemCard from "@/components/cards/ItemCard";
import FiltersPopup from "@/components/popup/FilterPopup";
import { useState } from "react";
import { filterProducts } from "@/lib/api/product/searchProduct";
import { useSearchParams } from "next/navigation";

const ResultItems = ({ items }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchResult, setSearchResult] = useState(items);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const handleApplyFilter = async (filters) => {
    setLoading(true);
    setError("");
    const filterObj = { ...filters };
    if (query) {
      filterObj.query = query;
    }
    try {
      const { success, data, message } = await filterProducts(filterObj);
      if (success) {
        setSearchResult(Array.isArray(data) ? data : []);
      } else {
        setError(message || "Failed to fetch filtered products.");
      }
    } catch (err) {
      setError(err.message || "Failed to fetch filtered products.");
    } finally {
      setLoading(false);
      setIsFilterOpen(false);
    }
  };
  
  return (
    <div className="flex w-full flex-col gap-5">
      <div className="flex items-center justify-between">
        <h1 className="text-[21px] font-medium leading-[31px]">
          {searchResult.length}{" "}
          <span className="font-normal text-battleShipGray">Results</span>
        </h1>
        <button
          onClick={() => setIsFilterOpen(true)}
          className="flex items-center gap-2 rounded-[12px] bg-[#F8F7FB] px-2 py-2 text-russianViolet transition-all duration-150 ease-in hover:bg-russianViolet hover:text-white"
        >
          {filterSvg}
          <span className="">Filters</span>
        </button>
      </div>
      {loading ? (
        <div className="py-10 text-center text-lg text-gray-500">Loading...</div>
      ) : error ? (
        <div className="py-10 text-center text-red-500">{error}</div>
      ) : (
        <div className="grid w-full grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {searchResult.map((item, index) => (
            <ItemCard
              key={index}
              id={item?.id}
              title={item.name}
              price={item.price || 0}
              createdAt={item?.createdAt}
              image={item?.images[0]}
              address={item.address}
              isFavourite={item.isFavourite}
            />
          ))}
        </div>
      )}
      {isFilterOpen && <FiltersPopup onClose={()=>setIsFilterOpen(false)} onApplyFilter={handleApplyFilter} />}
    </div>
  );
};

export default ResultItems;

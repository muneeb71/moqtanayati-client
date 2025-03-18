'use client'
import { useState } from 'react';
import { filterSvg } from "@/assets/icons/common-icons";
import ItemCard from "@/components/cards/ItemCard";
import FiltersPopup from "@/components/popup/FIlterPopup";

const ResultItems = ({ items }) => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="flex w-full flex-col gap-5">
      <div className="flex items-center justify-between">
        <h1 className="text-[21px] font-medium leading-[31px]">
          {items.length}{" "}
          <span className="font-normal text-battleShipGray">Results</span>
        </h1>
        <button 
          onClick={() => setShowFilters(true)}
          className="flex items-center gap-2 rounded-[12px] bg-[#F8F7FB] px-2 py-2 text-russianViolet transition-all duration-150 ease-in hover:bg-russianViolet hover:text-white"
        >
          {filterSvg}
          <span className="">Filters</span>
        </button>
      </div>

      {showFilters && (
        <FiltersPopup onClose={() => setShowFilters(false)} />
      )}

      <div className="grid w-full grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {items.map((item, index) => (
          <ItemCard
            key={index}
            title={item.title}
            price={item.price}
            createdAt={item.createdAt}
            image={item.image}
            address={item.address}
            isFavourite={item.isFavourite}
          />
        ))}
      </div>
    </div>
  );
};

export default ResultItems;

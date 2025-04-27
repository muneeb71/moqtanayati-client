"use client";
import { useState } from "react";
import { filterSvg } from "@/assets/icons/common-icons";
import MenuCard from "@/components/cards/MenuCard";
import FiltersPopup from "@/components/popup/FIlterPopup";
import { BiSearch } from "react-icons/bi";

const ResultItems = ({ items }) => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="flex w-full flex-col gap-5">
      <div className="flex items-center justify-between">
        <h1 className="text-[21px] font-medium leading-[31px]">
          {items.length}{" "}
          <span className="font-normal text-battleShipGray">Results</span>
        </h1>
        <div className="flex items-center space-x-2">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search Auctions"
              className="h-10 rounded-lg bg-gray-100 pl-10 pr-4 text-gray-700 focus:outline-none focus:ring-1 focus:ring-moonstone"
            />
            <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 transform text-xl text-gray-500" />
          </div>
          <button
            onClick={() => setShowFilters(true)}
            className="flex items-center gap-2 rounded-[12px] bg-[#F8F7FB] px-2 py-2 text-russianViolet transition-all duration-150 ease-in hover:bg-russianViolet hover:text-white"
          >
            {filterSvg}
            <span className="">Filters</span>
          </button>
        </div>
      </div>

      {showFilters && <FiltersPopup onClose={() => setShowFilters(false)} />}

      <div className="grid w-full grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 md:grid-cols-3">
        {items.map((item, index) => (
          <MenuCard
            key={index}
            title={item.title}
            price={item.price}
            image={item.image}
            address={item.address}
            createdAt={item.createdAt}
            isFavourite={item.isFavourite}
          />
        ))}
      </div>
    </div>
  );
};

export default ResultItems;

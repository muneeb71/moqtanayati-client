"use client";

import { useState } from "react";
import { filterIcon } from "@/assets/icons/admin-icons";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

const ReviewsTableHeader = ({
  reviewCategories,
  reviewCategory,
  sortBy,
  setSortBy,
}) => {
  const sortingOptions = [
    { label: "Newest", value: "newest" },
    { label: "Oldest", value: "oldest" },
    { label: "Highest Rated", value: "highest" },
    { label: "Lowest Rated", value: "lowest" },
  ];

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col justify-between gap-5 sm:items-center md:flex-row">
      <div className="flex items-center gap-2">
        {reviewCategories.map((category, index) => (
          <Link
            key={index}
            className={cn(
              "rounded-lg border px-2 py-2 text-xs sm:px-4",
              reviewCategory === category.slug
                ? "bg-moonstone text-white"
                : "border-silver bg-white text-davyGray hover:bg-moonstone/5",
              "w-fit transition-all duration-100 ease-linear",
            )}
            href={category.href}
          >
            {category.title}
          </Link>
        ))}
      </div>

      <div className="relative flex items-center gap-4 self-end md:self-center">
        {/* Sort Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-1 rounded px-3 py-2 text-sm font-medium text-darkBlue hover:bg-gray-100"
          >
            <span>{sortingOptions.find((s) => s.value === sortBy)?.label}</span>
            <ChevronDown size={20} />
          </button>

          {isOpen && (
            <div className="absolute right-0 z-10 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black/5">
              <ul className="py-1 text-sm">
                {sortingOptions.map((option) => (
                  <li
                    key={option.value}
                    onClick={() => {
                      setSortBy(option.value);
                      setIsOpen(false);
                    }}
                    className={cn(
                      "cursor-pointer px-4 py-2 hover:bg-gray-100",
                      sortBy === option.value && "bg-gray-100 font-semibold",
                    )}
                  >
                    {option.label}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Filter Button */}
        <button className="flex items-center gap-2 rounded-lg border border-silver bg-white px-3 py-2 text-moonstone transition-all duration-100 ease-linear hover:bg-moonstone/5">
          {filterIcon}
          <span className="text-sm font-medium">Filters</span>
        </button>
      </div>
    </div>
  );
};

export default ReviewsTableHeader;

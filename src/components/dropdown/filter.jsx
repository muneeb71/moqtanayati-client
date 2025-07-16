"use client";

import { useState } from "react";
import { filterIcon } from "@/assets/icons/admin-icons";
import { cn } from "@/lib/utils";

const Filter = ({
  sortBy,
  setSortBy,
  sortingOptions = [],
  buttonLabel = "Filters",
  icon = filterIcon,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-lg border border-silver bg-white px-3 py-2 text-moonstone transition-all duration-100 ease-linear hover:bg-moonstone/5"
      >
        {icon}
        <span className="text-sm font-medium">{buttonLabel}</span>
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
  );
};

export default Filter;

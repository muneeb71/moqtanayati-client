"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";

const ReviewsTableHeader = ({ reviewCategories, reviewCategory }) => {
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
    </div>
  );
};

export default ReviewsTableHeader;

import { filterIcon } from "@/assets/icons/admin-icons";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import Link from "next/link";


const ReviewsTableHeader = ({ reviewCategories, reviewCategory }) => {
  return (
    <div className="flex flex-col md:flex-row sm:items-center justify-between gap-5">
      <div className="flex items-center gap-2">
        {reviewCategories.map((category, index) => (
          <Link
          key={index}
            className={cn(
              "rounded-lg border px-2 sm:px-4 py-2 text-xs",
              reviewCategory == category.slug
                ? "bg-moonstone text-white"
                : "border-silver bg-white text-davyGray hover:bg-moonstone/5",
              "transition-all duration-100 ease-linear w-fit",
            )}
            href={category.href}
          >
            {category.title}
          </Link>
        ))}
      </div>
      <div className="flex items-center self-end md:self-center gap-4">
        <button className="flex items-center gap-1">
          <span className="font-medium">Newest</span>
          <ChevronDown size={24} />
        </button>
        <button className="flex items-center gap-2 rounded-lg border border-silver bg-white px-3 py-2 text-moonstone transition-all duration-100 ease-linear hover:bg-moonstone/5">
          {filterIcon}
          <span className="text-sm font-medium">Filters</span>
        </button>
      </div>
    </div>
  );
};

export default ReviewsTableHeader;

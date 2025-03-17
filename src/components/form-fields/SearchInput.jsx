"use client";

import { cn } from "@/lib/utils";
import { searchIcon } from "@/assets/icons/common-icons";
import { useRouter } from "next/navigation";

const SearchInput = ({ className = "" }) => {
  const router = useRouter();

  const handleSearch = (event) => {
    if (event.key === "Enter") {
      const query = event.target.value.trim();
      if (query) {
        router.push(`/search?q=${encodeURIComponent(query)}`);
      }
    }
  };
  return (
    <div
      className={cn(
        "flex h-[60px] w-[88%] items-center justify-center gap-3 rounded-[12px] bg-[#F8F7F8] px-3 md:h-[75px] md:w-full md:max-w-[502px] md:px-5",
        className,
      )}
    >
      {searchIcon}
      <input
        type="text"
        className="w-full bg-transparent text-sm outline-none placeholder:text-[#858699] focus:outline-none md:text-[21px]"
        placeholder="Search for anything you need…"
        onKeyDown={handleSearch}
      />
    </div>
  );
};

export default SearchInput;

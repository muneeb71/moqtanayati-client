"use client";

import { cn } from "@/lib/utils";
import { searchIcon } from "@/assets/icons/common-icons";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SearchInput = ({ className = "" }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSearch = (event) => {
    if (event.key === "Enter") {
      const query = event.target.value.trim();
      if (query) {
        setLoading(true);
        router.push(`/buyer/search?q=${encodeURIComponent(query)}`);
        setTimeout(() => setLoading(false), 1000);
      }
    }
  };

  if (loading) {
    return (
      <div className="w-full h-[100vh] z-50 bg-black/80 inset-0 fixed flex justify-center items-center">
        <svg className="animate-spin h-10 w-10 text-moonstone" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
        </svg>
      </div>
    )
  }
  
  return (
    <div
      className={cn(
        "flex h-[60px] w-[88%] items-center justify-center gap-3 rounded-[12px] bg-[#F8F7F8] px-3 md:h-[75px] md:w-full md:max-w-[502px] md:px-5",
        className,
        "relative"
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

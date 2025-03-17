"use client";

import { cn } from "@/lib/utils";
import { slugify } from "@/utils/slugify";
import { usePathname, useRouter } from "next/navigation";

const SubCategoriesBar = ({ category = "", categorySlug = "" }) => {
  const pathname = usePathname();
  const router = useRouter();

  const subCategories = [
    "Samsung",
    "Apple",
    "Infinix",
    "Sony",
    "Motorolla",
    "Poco",
    "Vivo",
    "Oneplus",
    "LG",
    "Tesla",
  ];
  
  return (
    <div className="no-scrollbar flex w-full items-center gap-2 overflow-auto pb-5 md:gap-[18px]">
      <button
        onClick={() => router.push("/category/" + categorySlug)}
        className={cn(
          "flex items-center justify-center rounded-[12px] border-[1.5px] px-3 py-1.5 md:px-5 md:py-2.5",
          pathname === "/category/" + categorySlug
            ? "border-moonstone bg-moonstone text-white"
            : "border-silver hover:border-moonstone hover:bg-moonstone/10",
        )}
      >
        All
      </button>
      {subCategories.map((subCategory, index) => (
        <button
          onClick={() =>
            router.push(
              "/category/" + categorySlug + "/" + slugify(subCategory),
            )
          }
          key={index}
          className={cn(
            "flex items-center justify-center rounded-[12px] border-[1.5px] px-3 py-1.5 md:px-5 md:py-2.5",
            pathname ===
              "/category/" + categorySlug + "/" + slugify(subCategory)
              ? "border-moonstone bg-moonstone text-white"
              : "border-silver hover:border-moonstone hover:bg-moonstone/10",
          )}
        >
          {subCategory}
        </button>
      ))}
    </div>
  );
};

export default SubCategoriesBar;

"use client";

import {
  sliderLeftButtonIcon,
  sliderRightButtonIcon,
} from "@/assets/icons/category-slider-icons";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { productAndServicesCategories } from "@/lib/categories";
import { slugify } from "@/utils/slugify";
import Autoplay from "embla-carousel-autoplay";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

const CategoriesSlider = () => {
  const [api, setApi] = useState();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isNavigating, setIsNavigating] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Use local services/categories; no network fetch
    setCategories(
      (productAndServicesCategories || []).map((c) => ({
        id: c.value,
        name: c.label,
        icon: c.icon,
        bg: c.bg,
      })),
    );
    setLoading(false);
  }, []);

  const handleCategoryClick = async (categoryName) => {
    try {
      setIsNavigating(true);
      // No API call; simply navigate with the category as a query param to filter on the category page
      sessionStorage.setItem("categoryName", categoryName);
      router.push(`/buyer/search?category=${encodeURIComponent(categoryName)}`);
    } catch (error) {
      console.error("Error navigating to category:", error);
      router.push(`/buyer/search?category=${encodeURIComponent(categoryName)}`);
    } finally {
      setIsNavigating(false);
    }
  };

  useEffect(() => {
    if (!api) {
      return;
    }
  }, [api]);
  if (loading) {
    return (
      <div className="w-full max-w-7xl overflow-hidden px-5">
        <div className="flex gap-4">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="flex basis-1/2 flex-col items-center gap-5 border-2 border-white py-5 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6"
            >
              <div className="size-[119px] animate-pulse rounded-full bg-gray-200" />
              <div className="h-6 w-20 animate-pulse rounded bg-gray-200" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Show message if no categories available
  if (!loading && categories.length === 0) {
    return (
      <div className="w-full max-w-7xl overflow-hidden px-5">
        <div className="flex w-full justify-center py-12">
          <div className="text-center">
            <div className="mb-4 text-6xl">📂</div>
            <h3 className="mb-2 text-lg font-semibold text-gray-700">
              No Categories Available
            </h3>
            <p className="text-gray-500">
              We couldn't find any product categories at the moment.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 5000,
        }),
      ]}
      opts={{
        align: "start",
        loop: true,
      }}
      setApi={setApi}
      className="w-full max-w-7xl overflow-hidden px-5"
    >
      <CarouselContent>
        {categories.map((category, index) => {
          const Icon = category.icon;
          return (
            <CarouselItem
              key={category.id || index}
              className="flex basis-1/2 cursor-pointer flex-col items-center gap-5 border-2 border-white py-5 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6"
              onClick={() =>
                handleCategoryClick(category.name || category.title)
              }
            >
              <div
                className={`flex size-[119px] items-center justify-center rounded-full ${category.bg || "bg-gray-100"}`}
              >
                {Icon ? (
                  <Icon className="h-10 w-10 text-delftBlue" />
                ) : (
                  <div className="flex size-[80px] items-center justify-center rounded-full bg-moonstone/20">
                    <span className="text-2xl text-moonstone">
                      {category.name?.charAt(0)?.toUpperCase() || "?"}
                    </span>
                  </div>
                )}
              </div>
              <span className="text-center text-lg text-delftBlue md:text-[21px]">
                {category.name || category.title}
              </span>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CustomPrevButton onClick={() => api.scrollPrev()} />
      <CustomNextButton onClick={() => api.scrollNext()} />

      {/* Navigation Loading Overlay */}
      {isNavigating && (
        <div className="fixed inset-0 z-[9999] grid place-items-center bg-black/30">
          <div className="flex flex-col items-center gap-4 rounded-lg bg-white p-6">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-moonstone border-t-transparent" />
            <span className="text-sm text-gray-600">Loading products...</span>
          </div>
        </div>
      )}
    </Carousel>
  );
};

const CustomPrevButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="absolute -left-5 top-1/2 -translate-y-1/2 transform rounded-full text-white hover:bg-gray-100"
    >
      {sliderLeftButtonIcon}
    </button>
  );
};

const CustomNextButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="absolute -right-5 top-1/2 -translate-y-1/2 transform rounded-full text-white hover:bg-gray-100"
    >
      {sliderRightButtonIcon}
    </button>
  );
};

export default CategoriesSlider;

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
import { getCategories } from "@/lib/api/categories";
import { slugify } from "@/utils/slugify";
import Autoplay from "embla-carousel-autoplay";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

const CategoriesSlider = () => {
  const [api, setApi] = useState();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await getCategories();

        if (response.success) {
          setCategories(response.data || []);
        } else {
          console.error("Error fetching categories:", response.message);
          setCategories([]);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

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
        {categories.map((category, index) => (
          <CarouselItem
            key={category.id || index}
            className="flex basis-1/2 cursor-pointer flex-col items-center gap-5 border-2 border-white py-5 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6"
            onClick={() =>
              router.push(
                `/buyer/search?q=${encodeURIComponent(category.name || category.title)}`,
              )
            }
          >
            <div className="flex size-[119px] items-center justify-center rounded-full bg-gray-100">
              {category.image ? (
                <Image
                  src={category.image}
                  alt={category.name || category.title}
                  width={80}
                  height={80}
                  className="rounded-full object-cover"
                  style={{ width: "auto", height: "auto" }}
                />
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
        ))}
      </CarouselContent>
      <CustomPrevButton onClick={() => api.scrollPrev()} />
      <CustomNextButton onClick={() => api.scrollNext()} />
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

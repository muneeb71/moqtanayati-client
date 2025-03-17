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
import { categories } from "@/lib/categories";
import { slugify } from "@/utils/slugify";
import Autoplay from "embla-carousel-autoplay";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CategoriesSlider = () => {
  const [api, setApi] = useState();
  const router = useRouter();

  useEffect(() => {
    if (!api) {
      return;
    }
  }, [api]);
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
            key={index}
            className="flex basis-1/2 cursor-pointer flex-col items-center gap-5 border-2 border-white py-5 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6"
            onClick={() => router.push("/category/" + slugify(category.title))}
          >
            <div
              className="flex size-[119px] items-center justify-center rounded-full"
              style={{
                backgroundColor: category.bgColor,
              }}
            >
              {category.icon}
            </div>
            <span className="text-lg text-delftBlue md:text-[21px]">
              {category.title}
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

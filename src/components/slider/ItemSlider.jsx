"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useState } from "react";
import ItemCard from "../cards/ItemCard";
import { dummyItems } from "@/lib/dummy-items";

const ItemSlider = ({ items }) => {
  const [api, setApi] = useState();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!api) {
      return;
    }
  }, [api]);

  if (!mounted) return null;

  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 4000,
        }),
      ]}
      opts={{
        align: "start",
        loop: true,
      }}
      setApi={setApi}
      className="w-full max-w-7xl overflow-hidden"
    >
      <CarouselContent>
        {items.map((item, index) => (
          <CarouselItem
            key={index}
            className="flex flex-col items-center gap-5 py-5 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
          >
            <ItemCard
              id={item.id}
              key={index}
              title={item.title}
              price={item.price}
              createdAt={item.createdAt}
              image={item.image}
              address={item.address}
              isFavourite={item.isFavourite}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default ItemSlider;

"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useState } from "react";
import ItemCard from "../cards/ItemCard";
import { getProducts } from "@/lib/api/product/getAllProducts";
import dynamic from "next/dynamic";

const RecommendedSectionSkeleton = dynamic(
  () => import("@/components/loaders/RecommendedSectionSkeleton"),
  { ssr: false },
);

const ItemSlider = ({ items, section }) => {
  const [api, setApi] = useState();
  const [mounted, setMounted] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getProductsData = async () => {
    setLoading(true);
    const res = await getProducts();
    localStorage.setItem("products", JSON.stringify(res?.data));

    let filteredProducts = [];
    if (section === "recommendations") {
      filteredProducts = res?.data?.filter(
        (product) => product.pricingFormat?.toLowerCase() === "fixed price",
      );
    } else if (section === "furniture") {
      filteredProducts = res?.data?.filter((product) =>
        product.categories?.includes("furniture"),
      );
    }

    setProducts(filteredProducts || []);
    setLoading(false);
  };

  useEffect(() => {
    setMounted(true);

    // If items are provided (like for popular products), use them directly
    if (items && items.length > 0) {
      console.log("🔍 [ItemSlider] Using provided items:", items);
      setProducts(items);
      setLoading(false);
    } else {
      // Otherwise fetch data as before
      getProductsData();
    }
  }, [items]);

  useEffect(() => {
    if (!api) {
      return;
    }
  }, [api]);

  if (!mounted) return null;

  if (loading) {
    return (
      <div className="w-full px-20">
        <RecommendedSectionSkeleton />
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="flex w-full max-w-7xl items-center justify-center py-10 text-battleShipGray">
        {section === "recommendations"
          ? "No recommendations for you"
          : section === "popular"
            ? "No popular items available"
            : "No furniture items available"}
      </div>
    );
  }

  return (
    <Carousel
      plugins={[Autoplay({ delay: 4000 })]}
      opts={{ align: "start", loop: true }}
      setApi={setApi}
      className="w-full max-w-7xl overflow-hidden"
    >
      <CarouselContent>
        {products.map((item, index) => {
          console.log(`🔍 [ItemSlider] Product ${index}:`, item);
          console.log(`🔍 [ItemSlider] Product ${index} images:`, item.images);
          return (
            <CarouselItem
              key={index}
              className="flex flex-col items-center gap-5 py-5 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              <ItemCard
                id={item.id}
                key={index}
                title={item.name}
                price={item.price}
                createdAt={item.createdAt}
                image={
                  item.images && item.images.length > 0 ? item.images[0] : null
                }
                address={
                  item?.city &&
                  item?.country &&
                  `${item?.city}, ${item?.country}`
                }
                isFavourite={item.isFavourite}
                pricingFormat={item?.pricingFormat}
              />
            </CarouselItem>
          );
        })}
      </CarouselContent>
    </Carousel>
  );
};

export default ItemSlider;

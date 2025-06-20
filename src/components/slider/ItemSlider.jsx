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

const ItemSlider = ({ items, section }) => {
  const [api, setApi] = useState();
  const [mounted, setMounted] = useState(false);
  const [products, setProducts] = useState([]);

  const getProductsData = async () => {
    const res = await getProducts();
    localStorage.setItem("products", JSON.stringify(res?.data));
    
    let filteredProducts = [];
    if (section === "recommendations") {
      filteredProducts = res?.data?.filter(
        (product) => product.pricingFormat?.toLowerCase() === "fixed price"
      );
    } else if (section === "furniture") {
      filteredProducts = res?.data?.filter(
        (product) => product.categories?.includes("furniture")
      );
    }
    
    setProducts(filteredProducts || []);
  };

  useEffect(() => {
    setMounted(true);
    getProductsData();
  }, []);

  useEffect(() => {
    if (!api) {
      return;
    }
  }, [api]);

  if (!mounted) return null;

  if (!products.length) {
    return (
      <div className="flex w-full max-w-7xl items-center justify-center py-10 text-battleShipGray">
        {section === "recommendations" 
          ? "No recommendations for you" 
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
        {products.map((item, index) => (
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
              image={item.images[0]}
              address={
                item?.city && item?.country && `${item?.city}, ${item?.country}`
              }
              isFavourite={item.isFavourite}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default ItemSlider;

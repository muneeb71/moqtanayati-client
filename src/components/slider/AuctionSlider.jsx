"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const AuctionSlider = ({ auction }) => {
  const [selectedItemIndex, setSelectedIndex] = useState(0);
  const [items, setItems] = useState([]);
  const [isNavigating, setIsNavigating] = useState(false);
  const sliderRef = useRef(null);
  const autoSlideRef = useRef(null);
  const router = useRouter();

  // Extract images from auction product
  useEffect(() => {
    if (
      auction?.product?.images &&
      Array.isArray(auction.product.images) &&
      auction.product.images.length > 0
    ) {
      setItems(auction.product.images);
    } else {
      setItems([]);
    }
  }, [auction]);

  const goToNextSlide = () => {
    if (items.length > 0) {
      setSelectedIndex((prevIndex) =>
        prevIndex === items.length - 1 ? 0 : prevIndex + 1,
      );
    }
  };

  useEffect(() => {
    if (items.length > 1) {
      autoSlideRef.current = setInterval(goToNextSlide, 3000);
      return () => clearInterval(autoSlideRef.current);
    }
  }, [items.length]);

  useEffect(() => {
    const handleDrag = (e) => {
      /* Drag functionality as is */
    };
    handleDrag();
  }, []);

  const flipAnimation = {
    initial: { rotateY: 0 },
    animate: { rotateY: 180 },
    exit: { rotateY: 0 },
    transition: {
      duration: 1,
      ease: "easeInOut",
    },
  };
  const handleProductClick = () => {
    try {
      if (typeof window !== "undefined") {
        sessionStorage.setItem("navLoading", "1");
      }
    } catch (e) {}
    setIsNavigating(true);
    setTimeout(() => {
      router.push(`/product-details/${auction?.productId}`);
    }, 0);
  };

  // Don't render if no images
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col items-start gap-5 lg:flex-row">
      <div className="flex w-full flex-col items-center gap-2">
        <div className="grid aspect-square w-full max-w-[450px] place-items-center overflow-hidden rounded-[20px] bg-black/10">
          <motion.div
            key={selectedItemIndex}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={flipAnimation}
          >
            <Image
              src={items[selectedItemIndex]}
              width={500}
              height={500}
              alt="auction product"
              loading="lazy"
              className="w-full cursor-pointer"
              onClick={handleProductClick}
            />
          </motion.div>
        </div>
        <div className="flex items-center gap-1">
          {items.map((item, index) => (
            <button
              onClick={() => setSelectedIndex(index)}
              key={index}
              className={cn(
                "size-2.5 rounded-full",
                selectedItemIndex === index ? "bg-moonstone" : "bg-black/10",
              )}
            ></button>
          ))}
        </div>
      </div>
      <div
        ref={sliderRef}
        className="no-scrollbar flex h-full max-h-[420px] min-w-[84px] max-w-[94vw] justify-between gap-[21px] self-center overflow-scroll sm:max-w-[400px] md:max-w-full lg:flex-col"
      >
        {items.map((image, index) => (
          <button
            onClick={() => setSelectedIndex(index)}
            className="grid size-[84px] min-h-[84px] min-w-[84px] place-items-center overflow-hidden rounded-[10px] border border-transparent bg-black/10 transition-all duration-200 ease-in hover:border-moonstone"
            key={index}
          >
            <Image
              src={image}
              width={500}
              height={500}
              alt="auction product"
              loading="lazy"
              className="w-full"
            />
          </button>
        ))}
      </div>
      {isNavigating && (
        <div className="fixed inset-0 z-[9999] grid place-items-center bg-black/30">
          <svg
            className="h-8 w-8 animate-spin text-moonstone"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8z"
            ></path>
          </svg>
        </div>
      )}
    </div>
  );
};

export default AuctionSlider;

"use client"
import { motion } from 'framer-motion';
import { dummyItems } from "@/lib/dummy-items";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useRouter } from 'next/navigation';

const AuctionSlider = () => {
  const [selectedItemIndex, setSelectedIndex] = useState(3);
  const sliderRef = useRef(null);
  const autoSlideRef = useRef(null);
  const router = useRouter()

  const goToNextSlide = () => {
    setSelectedIndex((prevIndex) =>
      prevIndex === dummyItems.length - 1 ? 0 : prevIndex + 1,
    );
  };

  useEffect(() => {
    autoSlideRef.current = setInterval(goToNextSlide, 3000);
    return () => clearInterval(autoSlideRef.current);
  }, []);

  useEffect(() => {
    const handleDrag = (e) => { /* Drag functionality as is */ };
    handleDrag();
  }, []);

  const flipAnimation = {
    initial: { rotateY: 0 },
    animate: { rotateY: 180 },
    exit: { rotateY: 0 },
    transition: {
      duration: 1, 
      ease: "easeInOut" 
    }
  };
  const handleProductClick = () => {
    router.push(`/product-details/${dummyItems[selectedItemIndex].id}`);
  };

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
              src={dummyItems[selectedItemIndex].image}
              width={500}
              height={500}
              alt="item"
              loading="lazy"
              className="w-full cursor-pointer"
              onClick={handleProductClick}
            />
          </motion.div>
        </div>
        <div className="flex items-center gap-1">
          {dummyItems.map((item, index) => (
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
        {dummyItems.map((item, index) => (
          <button
            onClick={() => setSelectedIndex(index)}
            className="grid size-[84px] min-h-[84px] min-w-[84px] place-items-center overflow-hidden rounded-[10px] border border-transparent bg-black/10 transition-all duration-200 ease-in hover:border-moonstone"
            key={index}
          >
            <Image
              src={item.image}
              width={500}
              height={500}
              alt="item"
              loading="lazy"
              className="w-full"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default AuctionSlider;

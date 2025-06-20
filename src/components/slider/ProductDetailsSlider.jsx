"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

const ProductDetailsSlider = ({ images }) => {
  const [selectedItemIndex, setSelectedIndex] = useState(3);
  const sliderRef = useRef(null);
  const autoSlideRef = useRef(null);

  const goToNextSlide = () => {
    setSelectedIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1,
    );
  };

  useEffect(() => {
    autoSlideRef.current = setInterval(goToNextSlide, 4000);
    return () => clearInterval(autoSlideRef.current);
  }, []);

  const handleDrag = (e) => {
    const slider = sliderRef.current;
    let startX = 0;
    let currentTranslate = 0;
    let isDragging = false;

    const startDragging = (clientX) => {
      isDragging = true;
      startX = clientX;
      currentTranslate = slider.scrollLeft;
    };

    const onDragging = (clientX) => {
      if (!isDragging) return;
      const delta = startX - clientX;
      slider.scrollLeft = currentTranslate + delta;
    };

    const endDragging = () => {
      isDragging = false;
    };

    // Add event listeners for mouse and touch
    const addDragListeners = () => {
      slider.addEventListener("mousedown", (event) =>
        startDragging(event.clientX),
      );
      slider.addEventListener("mousemove", (event) =>
        onDragging(event.clientX),
      );
      slider.addEventListener("mouseup", endDragging);
      slider.addEventListener("mouseleave", endDragging);

      slider.addEventListener("touchstart", (event) =>
        startDragging(event.touches[0].clientX),
      );
      slider.addEventListener("touchmove", (event) =>
        onDragging(event.touches[0].clientX),
      );
      slider.addEventListener("touchend", endDragging);
    };

    // Remove event listeners on unmount
    const removeDragListeners = () => {
      slider.removeEventListener("mousedown", startDragging);
      slider.removeEventListener("mousemove", onDragging);
      slider.removeEventListener("mouseup", endDragging);
      slider.removeEventListener("mouseleave", endDragging);

      slider.removeEventListener("touchstart", startDragging);
      slider.removeEventListener("touchmove", onDragging);
      slider.removeEventListener("touchend", endDragging);
    };

    addDragListeners();
    return removeDragListeners;
  };

  useEffect(handleDrag, []);

  return (
    <div className="flex flex-col-reverse items-center gap-5 lg:flex-row">
      <div
        ref={sliderRef}
        className="no-scrollbar flex h-full max-h-[461px] min-w-[103px] max-w-[94vw] justify-between gap-2.5 self-center overflow-scroll sm:max-w-[400px] md:max-w-full lg:flex-col"
      >
        {images.map((image, index) => (
          <button
            onClick={() => setSelectedIndex(index)}
            className="grid min-h-[84px] w-[103px] min-w-[103px] place-items-center overflow-hidden rounded-[10px] border border-transparent bg-black/10 transition-all duration-200 ease-in hover:border-moonstone"
            key={index}
          >
            <Image
              src={image} // process.env.NEXT_PUBLIC_BACKEND_BASE_URL + 
              width={500}
              height={500}
              alt="item"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>
      <div className="flex w-full flex-col items-start gap-2">
        <div className="grid aspect-square w-full max-w-[470px] place-items-center overflow-hidden rounded-[20px] border border-gray-200/5 bg-black/10">
          <Image
            src={
              images[selectedItemIndex] //process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
            }
            width={500}
            height={500}
            alt="item"
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsSlider;

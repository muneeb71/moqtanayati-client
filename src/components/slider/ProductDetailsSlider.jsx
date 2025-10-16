"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { addWatchlist } from "@/lib/api/watchlist/addWatchlist";
import toast from "react-hot-toast";
import { getWatchlistById } from "@/lib/api/watchlist/getWatchlistById";
import { removeFromWatchlist } from "@/lib/api/watchlist/removeWatchlist";

const ProductDetailsSlider = ({ images = [], auctionDetail }) => {
  const imagesList = Array.isArray(images) ? images.filter(Boolean) : [];

  // If there are no images, don't render the slider section
  if (imagesList.length === 0) {
    return null;
  }
  const [selectedItemIndex, setSelectedIndex] = useState(0);
  const sliderRef = useRef(null);
  const autoSlideRef = useRef(null);
  const [favourite, setFavourite] = useState(false);
  const [auctionId, setAuctionId] = useState();
  const [orderId, setOrderId] = useState(null);

  const goToNextSlide = () => {
    setSelectedIndex((prevIndex) =>
      prevIndex === imagesList.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const getWatchlistStatus = async () => {
    const auction = await getWatchlistById(auctionDetail.id);
    if (auction?.data?.success) {
      setFavourite(true);
      setAuctionId(auction?.data?.data?.auctionId);
    }
  };

  useEffect(() => {
    if (auctionDetail?.pricingFormat === "Auctions") {
      getWatchlistStatus();
    }
  }, []);

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

  const addToWatchlist = async () => {
    try {
      if (favourite) {
        const res = await removeFromWatchlist(auctionId);
        if (res?.data?.success) {
          setFavourite(false);
          toast.success("Removed from Watchlist");
        }
      } else {
        const res = await addWatchlist(auctionDetail?.id);
        if (res?.data?.success) {
          setFavourite(true);
          setAuctionId(res?.data?.data?.auctionId);
          toast.success("Item Added to Watchlist.");
        } else {
          toast.error("Failed to add item to Watchlist.");
        }
      }
    } catch (error) {
      console.log("Add to watchlist error:", error);
      toast.error("An error occurred while adding to Watchlist.");
    }
  };

  return (
    <div className="flex flex-col-reverse items-center gap-5 lg:flex-row">
      <div
        ref={sliderRef}
        className="no-scrollbar flex h-full max-h-[461px] min-w-[103px] max-w-[94vw] justify-between gap-2.5 self-center overflow-scroll sm:max-w-[400px] md:max-w-full lg:flex-col"
      >
        {imagesList.map((image, index) => (
          <button
            onClick={() => setSelectedIndex(index)}
            className="grid min-h-[84px] w-[103px] min-w-[103px] place-items-center overflow-hidden rounded-[10px] border border-transparent bg-black/10 transition-all duration-200 ease-in hover:border-moonstone"
            key={index}
          >
            <Image
              src={image}
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
        <div className="relative grid aspect-square w-full max-w-[470px] place-items-center overflow-hidden rounded-[20px] border border-gray-200/5 bg-black/10">
          <Image
            src={imagesList[selectedItemIndex]}
            width={500}
            height={500}
            alt="item"
            loading="lazy"
            className="h-full w-full object-cover"
          />
          {auctionDetail?.pricingFormat === "Auctions" && (
            <button
              className={cn(
                "absolute right-3 top-3 grid size-[43px] place-items-center rounded-[4.6px] bg-black/10",
                favourite ? "text-[#F16D6F]" : "text-white",
              )}
              onClick={addToWatchlist}
            >
              {heartIcon}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const heartIcon = (
  <svg
    width="31"
    height="25"
    viewBox="0 0 31 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0.400391 8.3145C0.400391 15.2316 6.55189 18.9176 11.0549 22.2169C12.6439 23.3812 14.1744 24.4773 15.7048 24.4773C17.2353 24.4773 18.7657 23.3812 20.3547 22.2169C24.8578 18.9176 31.0092 15.2316 31.0092 8.3145C31.0092 1.39736 22.5915 -3.50813 15.7048 3.14192C8.81807 -3.50813 0.400391 1.39736 0.400391 8.3145Z"
      fill="currentColor"
    />
  </svg>
);

export default ProductDetailsSlider;

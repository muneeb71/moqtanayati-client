"use client";

import ProductDetailsAuctionTimer from "@/components/timers/ProductDetailsAuctionTimer";
import QaSectionSheet from "../../../../landing/product-details/dialogs/qa-sheet/QaSectionSheet";
import { productHeartIcon } from "@/assets/icons/seller-icons";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { updateProductStock } from "@/lib/api/product/updateStock";

const formatTimeAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) {
    return "just now";
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes}min ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours}hr ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays}day${diffInDays === 1 ? "" : "s"} ago`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths}month${diffInMonths === 1 ? "" : "s"} ago`;
  }

  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears}year${diffInYears === 1 ? "" : "s"} ago`;
};

const StoreProductDetailsCard = ({ item }) => {
  const [stock, setStock] = useState(item?.stock || 0);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(stock);

  const handleStockUpdate = async (newStock) => {
    if (newStock < 0 || isUpdating) return;

    setIsUpdating(true);
    try {
      const response = await updateProductStock(item.id, newStock);
      if (response) {
        setStock(newStock);
      }
    } catch (error) {
      console.error("Error updating stock:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      const newValue = parseInt(editValue);
      if (!isNaN(newValue) && newValue >= 0) {
        handleStockUpdate(newValue);
        setIsEditing(false);
      }
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setEditValue(stock);
    }
  };

  const handleBlur = () => {
    setIsEditing(false);
    setEditValue(stock);
  };

  return (
    <div className="flex w-full flex-col">
      <div className="flex w-full max-w-[404px] flex-col gap-[52px]">
        <div className="flex w-full flex-col gap-8">
          <div className="flex w-full flex-col gap-6">
            <div className="flex w-full items-end justify-between md:gap-[33px]">
              <div className="flex flex-col">
                <h2 className="max-w-[258px] truncate font-medium md:text-[19.2px] md:leading-[29px]">
                  {item?.name}
                </h2>
                <h1 className="text-[24px] font-medium leading-[40px] md:text-[28.8px] md:leading-[43px]">
                  ${item?.price !== 0 ? item?.price.toFixed(2) : item?.buyItNow ? item?.buyItNow.toFixed(2) : "0.00"}
                </h1>
              </div>
              <div className="flex flex-col justify-end gap-2.5">
                <span className="text-right text-[14.4px] leading-[21px] text-battleShipGray">
                  {formatTimeAgo(item?.createdAt)}
                </span>
                <QaSectionSheet />
              </div>
            </div>
            <div className="flex w-full items-end justify-between gap-5">
              {item?.price ? (
                "Fixed Price"
              ) : (
                <ProductDetailsAuctionTimer item={item} />
              )}
              <div className="flex items-center gap-2 text-2xl font-semibold text-[#F16D6F]">
                {productHeartIcon}
                {item?.favorites?.length}
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col gap-2">
            <h1 className="font-medium text-black/70">Product Description</h1>
            <p className="text-[14.4px] leading-[21px] text-black/40">
              {item?.description}
            </p>
          </div>
          <div className="flex w-fit flex-col gap-2">
            <span className="text-2xl font-medium text-black/70">Stock</span>
            <div className="flex items-center justify-between gap-2 py-1">
              <button
                onClick={() => handleStockUpdate(stock + 1)}
                disabled={isUpdating}
                className="grid size-10 place-items-center rounded-md bg-moonstone/10 transition-colors hover:bg-moonstone/20 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Plus className="size-6 text-moonstone" />
              </button>
              {isEditing ? (
                <input
                  type="number"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                  onBlur={handleBlur}
                  className="w-20 text-center text-2xl font-medium text-darkBlue border border-moonstone rounded-md px-2"
                  autoFocus
                />
              ) : (
                <span 
                  className="text-2xl font-medium text-darkBlue cursor-pointer"
                  onClick={() => {
                    setIsEditing(true);
                    setEditValue(stock);
                  }}
                >
                  {stock}
                </span>
              )}
              <button
                onClick={() => handleStockUpdate(stock - 1)}
                disabled={isUpdating || stock <= 0}
                className="grid size-10 place-items-center rounded-md bg-moonstone/10 transition-colors hover:bg-moonstone/20 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Minus className="size-6 text-moonstone" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreProductDetailsCard;

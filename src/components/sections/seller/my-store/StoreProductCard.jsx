import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { updateProductStock } from "@/lib/api/product/updateStock";

const StoreProductCard = ({ item }) => {
  const [stock, setStock] = useState(item?.stock || 0);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(stock);

  let url = "/seller/my-store/product/" + item.id;
  if (item.status === "DRAFT") {
    if (
      item.stock === 0 ||
      item.weight === null ||
      item.length === null ||
      item.width === null ||
      item.categories.length === 0 ||
      item.condition === null ||
      item.conditionRating === null
    ) {
      url = "/seller/my-store/product/add/units-and-dimensions?id=" + item.id;
    } else {
      url = "/seller/my-store/product/add/price-and-shipping?id=" + item.id;
    }
  }

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
    <div className="flex w-full items-center justify-between gap-5">
      <Link
        href={url}
        className="flex h-full w-full items-center gap-3 text-start"
      >
        <div className="size-36 min-w-36 overflow-hidden rounded-2xl border border-black/10">
          <Image
            src={
              item.images && item.images[0] !== ""
                ? process.env.NEXT_PUBLIC_BACKEND_BASE_URL + item.images[0]
                : "/static/dummy-items/1.jpeg"
            }
            alt="image"
            width={200}
            height={200}
            loading="lazy"
            quality={100}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex h-full flex-1 flex-col justify-between py-1">
          <div className="flex items-center">
            <h1 className="max-w-[80%] truncate pr-5 text-2xl font-medium text-davyGray">
              {item.name}
            </h1>
            <div className="w-fit rounded-full bg-moonstone px-2 py-1 text-xs text-white">
              {item.status === "DRAFT" ? "Draft" : item.pricingFormat}
            </div>
          </div>
          {item.price ? (
            <h1 className="text-3xl font-medium">${item.price?.toFixed(2)}</h1>
          ) : (
            <h1 className="text-3xl">${item.buyItNow?.toFixed(2)}</h1>
          )}
        </div>
      </Link>
      <div className="flex h-full flex-col items-center justify-between py-1">
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
  );
};

export default StoreProductCard;

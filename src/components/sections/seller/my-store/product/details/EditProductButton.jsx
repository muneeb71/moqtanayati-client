"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { PenLineIcon } from "lucide-react";
import useTranslation from "@/hooks/useTranslation";

const EditProductButton = ({ productId }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  const handleClick = () => {
    if (isNavigating) return;
    try {
      if (typeof window !== "undefined") {
        sessionStorage.setItem("navLoading", "1");
      }
    } catch (_) {}
    setIsNavigating(true);
    setTimeout(() => {
      router.push(`/seller/my-store/product/add?id=${productId}`);
    }, 0);
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-1 disabled:opacity-60"
      disabled={isNavigating}
    >
      <div className="grid size-8 place-items-center rounded-full border-2 border-white bg-darkBlue text-white">
        {isNavigating ? (
          <svg
            className="h-4 w-4 animate-spin"
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
        ) : (
          <PenLineIcon className="size-4" />
        )}
      </div>
      <span className="text-lg font-medium text-darkBlue">
        {isNavigating ? t("seller.store.opening") : t("seller.store.edit")}
      </span>
    </button>
  );
};

export default EditProductButton;

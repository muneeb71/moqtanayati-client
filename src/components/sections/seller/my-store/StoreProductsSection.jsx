"use client";

import RoundedButton from "@/components/buttons/RoundedButton";
import { Plus } from "lucide-react";
import StoreProductCard from "./StoreProductCard";
import { dummyItems } from "@/lib/dummy-items";
import { useRouter } from "next/navigation";

const StoreProductsSection = () => {
  const router = useRouter();
  return (
    <div className="flex w-full flex-col gap-5">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-medium">Products</h1>
        <RoundedButton
          title="Add Product"
          className="max-h-[50px] flex-row-reverse gap-2 py-3 text-sm"
          showIcon
          icon={<Plus className="size-4" />}
          onClick={() => router.push("/seller/my-store/product/add")}
        />
      </div>
      <div className="grid w-full gap-x-20 gap-y-8 md:grid-cols-2">
        {dummyItems.slice(0, 4).map((item, index) => (
          <StoreProductCard item={item} key={index} />
        ))}
      </div>
    </div>
  );
};

export default StoreProductsSection;

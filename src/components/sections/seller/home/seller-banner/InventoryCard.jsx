"use client";

import { houseIcon } from "@/assets/icons/seller-icons";
import { useProfileStore } from "@/providers/profile-store-provider";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getProductsByStoreId } from "@/lib/api/product/getByStoreId";

const InventoryCard = () => {
  const store = useProfileStore((state) => state.store);
  const initialCount = Array.isArray(store?.products)
    ? store.products.length
    : 0;
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    const load = async () => {
      if (!store?.id) return;
      try {
        const products = await getProductsByStoreId(store.id);
        if (Array.isArray(products)) setCount(products.length);
      } catch (_) {}
    };
    load();
  }, [store?.id]);

  // Reflect local store updates immediately (e.g., optimistic add)
  useEffect(() => {
    if (Array.isArray(store?.products)) {
      setCount(store.products.length);
    }
  }, [store?.products]);

  return (
    <div className="flex h-full w-full flex-col gap-4 rounded-[30px] bg-[#FCF3F0] p-5">
      <div className="flex items-center gap-3">
        <div className="grid size-10 place-items-center rounded-lg bg-[#E6B9AA] lg:size-14 lg:rounded-[20px]">
          {houseIcon}
        </div>
        <h1 className="text-lg font-medium text-davyGray lg:text-2xl">
          My Inventory
        </h1>
      </div>
      <div className="flex items-baseline justify-center py-2 font-medium text-russianViolet">
        <span className="text-5xl">{count}</span>
        <span className="text-lg">items</span>
      </div>
      <div className="flex w-full justify-end">
        <Link
          className="group flex flex-col text-[#C88C78]"
          href="/seller/my-store"
        >
          <div className="flex items-center lg:text-lg">
            Manage
            <ChevronRight className="text-xl" />
          </div>
          <span className="h-[1px] w-0 bg-[#C88C78] transition-all duration-200 ease-in group-hover:w-[95%]"></span>
        </Link>
      </div>
    </div>
  );
};

export default InventoryCard;

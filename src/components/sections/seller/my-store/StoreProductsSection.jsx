"use client";

import RoundedButton from "@/components/buttons/RoundedButton";
import { Plus } from "lucide-react";
import StoreProductCard from "./StoreProductCard";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useProfileStore } from "@/providers/profile-store-provider";
import { useInventoryStore } from "@/providers/inventory-store-provider";

const StoreProductsSection = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isNavigating, setIsNavigating] = useState(false);
  const [isNavigatingProduct, setIsNavigatingProduct] = useState(false);
  const { store } = useProfileStore((state) => state);
  const { products, isLoadingProducts, productsError, fetchProducts } =
    useInventoryStore();

  useEffect(() => {
    const loadData = async () => {
      if (!store?.id) {
        console.log("Store not ready yet:", store?.id);
        return;
      }

      try {
        console.log("Fetching products for store:", store.id);
        const response = await fetchProducts(store.id);
        console.log("res :", response);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    loadData();
  }, [store?.id]);

  // Clear navigating states when route changes (navigation completed)
  useEffect(() => {
    if (isNavigating) setIsNavigating(false);
    if (isNavigatingProduct) setIsNavigatingProduct(false);
  }, [pathname]);

  return (
    <div className="relative flex w-full flex-col gap-5">
      {/* Product navigation overlay */}
      {isNavigatingProduct && (
        <div className="absolute inset-0 z-10 grid place-items-center rounded-2xl bg-black/5">
          <span className="rounded-md bg-moonstone px-4 py-2 text-sm text-white">
            Going to view product detail
          </span>
        </div>
      )}

      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-medium">Products</h1>
        <RoundedButton
          title={isNavigating ? "Opening..." : "Add Product"}
          className={`max-h-[50px] flex-row-reverse gap-2 py-3 text-sm ${
            isNavigating ? "opacity-60" : ""
          }`}
          showIcon={!isNavigating}
          icon={<Plus className="size-4" />}
          onClick={
            isNavigating
              ? undefined
              : () => {
                  setIsNavigating(true);
                  router.push("/seller/my-store/product/add");
                }
          }
        />
      </div>

      {isLoadingProducts ? (
        <span className="rounded-2xl bg-moonstone/20 py-20 text-center text-2xl text-black/80">
          Loading products...
        </span>
      ) : productsError ? (
        <span className="rounded-2xl bg-red-100 py-20 text-center text-2xl text-red-600">
          {productsError}
        </span>
      ) : products?.length > 0 ? (
        <div className="grid w-full gap-x-20 gap-y-8 md:grid-cols-2">
          {products.map((item) => (
            <StoreProductCard
              item={item}
              key={item.id || item._id}
              onNavigateStart={() => setIsNavigatingProduct(true)}
            />
          ))}
        </div>
      ) : (
        <span className="rounded-2xl bg-moonstone/20 py-20 text-center text-2xl text-black/80">
          No Products in store
        </span>
      )}
    </div>
  );
};

export default StoreProductsSection;

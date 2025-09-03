"use client";

import RoundedButton from "@/components/buttons/RoundedButton";
import { Plus } from "lucide-react";
import StoreProductCard from "./StoreProductCard";
import { useRouter } from "next/navigation";
import { useProfileStore } from "@/providers/profile-store-provider";
import { useEffect } from "react";
import { useInventoryStore } from "@/providers/inventory-store-provider";

const StoreProductsSection = () => {
  const router = useRouter();
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
            <StoreProductCard item={item} key={item.id || item._id} />
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

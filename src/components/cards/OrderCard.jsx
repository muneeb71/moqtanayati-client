import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const OrderCard = ({ item }) => {
  const product = item.product || {};
  const orderItem = item.OrderItem?.[0] || {};
  const image = product.images?.[0] || "/static/dummy-items/2.jpeg";
  const name = product.name || "Product Name";
  const price = item.totalAmount || product.price || 0;
  const quantity = orderItem.quantity || 1;
  const router = useRouter();
  const pathname = usePathname();
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    if (isNavigating) setIsNavigating(false);
  }, [pathname]);

  return (
    <div className="flex w-full items-center gap-4">
      <div className="size-24 min-w-24 overflow-hidden rounded-2xl border border-black/5 md:size-28 md:min-w-28">
        <Image
          src={image}
          width={120}
          height={120}
          quality={100}
          loading="lazy"
          alt={name}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex w-full justify-between">
        <div className="flex flex-col gap-4">
          <span className="font-medium md:text-lg">{name}</span>
          <span className="text-lg font-medium md:text-2xl">${price}</span>
        </div>
        <div className="flex flex-col items-end gap-4">
          <span className="grid size-8 place-items-center rounded-full bg-russianViolet font-medium text-white md:size-10 md:text-lg">
            {quantity}x
          </span>
          <button
            type="button"
            onClick={() => {
              if (isNavigating) return;
              setIsNavigating(true);
              router.push(`/seller/orders/details?id=${item.id}`);
            }}
            disabled={isNavigating}
            className="flex items-center gap-2 rounded-full border border-moonstone py-1 pl-3 pr-2 text-sm font-medium text-moonstone transition-opacity disabled:cursor-not-allowed disabled:opacity-60 md:py-1.5 md:pl-4 md:pr-3"
          >
            {isNavigating && (
              <span className="inline-block h-3 w-3 animate-spin rounded-full border border-current border-t-transparent" />
            )}
            View <span className="hidden md:inline">Order</span>
            <ChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;

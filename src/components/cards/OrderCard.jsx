import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const OrderCard = ({ item }) => {
  return (
    <div className="flex w-full items-center gap-4">
      <div className="size-24 min-w-24 overflow-hidden rounded-2xl border border-black/5 md:size-28 md:min-w-28">
        <Image
          src="/static/dummy-items/2.jpeg"
          width={120}
          height={120}
          quality={100}
          loading="lazy"
          alt="item"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex w-full justify-between">
        <div className="flex flex-col gap-4">
          <span className="font-medium md:text-lg">Coco Oil 150ml</span>
          <span className="text-lg font-medium md:text-2xl">$350.00</span>
        </div>
        <div className="flex flex-col items-end gap-4">
          <span className="grid size-8 place-items-center rounded-full bg-russianViolet font-medium text-white md:size-10 md:text-lg">
            1x
          </span>
          <Link
            href="/seller/orders/details"
            className="flex items-center gap-1 rounded-full border border-moonstone py-1 pl-3 pr-2 text-sm font-medium text-moonstone md:py-1.5 md:pl-4 md:pr-3"
          >
            View <span className="hidden md:inline">Order</span>{" "}
            <ChevronRight />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;

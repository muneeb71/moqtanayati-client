import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const StoreProductCard = ({ item }) => {
  return (
    <div className="flex w-full items-center justify-between gap-5">
      <Link
        href={"/seller/my-store/product/" + item.id}
        className="flex h-full w-full items-center gap-3 text-start"
      >
        <div className="size-36 min-w-36 overflow-hidden rounded-2xl border border-black/10">
          <Image
            src={item.image}
            alt="image"
            width={200}
            height={200}
            loading="lazy"
            quality={100}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex h-full flex-1 flex-col justify-between py-1">
          <h1 className="max-w-[80%] truncate pr-5 text-2xl font-medium text-davyGray">
            {item.title}
          </h1>
          <h1 className="text-3xl font-medium">${item.price.toFixed(2)}</h1>
        </div>
      </Link>
      <div className="flex h-full flex-col items-center justify-between py-1">
        <button className="grid size-10 place-items-center rounded-md bg-moonstone/10">
          <Plus className="size-6 text-moonstone" />
        </button>
        <span className="text-2xl font-medium text-darkBlue">10</span>
        <button className="grid size-10 place-items-center rounded-md bg-moonstone/10">
          <Minus className="size-6 text-moonstone" />
        </button>
      </div>
    </div>
  );
};

export default StoreProductCard;

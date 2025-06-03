"use client";

import { useProfileStore } from "@/providers/profile-store-provider";

const OrdersCard = () => {
  const orders = useProfileStore((state) => state.orders);
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[30px] bg-white px-5 py-4">
      <h1 className="z-10 text-xl lg:text-2xl font-medium text-davyGray">Orders</h1>
      <div className="z-10 w-full pb-12 pt-7 text-center text-6xl font-medium text-moonstone">
        {orders?.length}
      </div>
      <div className="absolute -bottom-3 right-20 size-10 rounded-full bg-moonstone/10"></div>
      <div className="absolute -right-3 -top-4 size-28 rounded-full bg-moonstone/10"></div>
    </div>
  );
};

export default OrdersCard;

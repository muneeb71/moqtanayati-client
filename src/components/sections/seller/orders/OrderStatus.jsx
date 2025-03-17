import {
  deliveredOrderIcon,
  processingOrderIcon,
  recievedOrderIcon,
  shippedOrderIcon,
} from "@/assets/icons/seller-icons";

const OrderStatus = () => {
  return (
    <div className="flex h-full w-full max-w-xl flex-col gap-5">
      <span className="text-3xl font-medium text-[#1A1A1ACC]">
        Order Status
      </span>
      <div className="flex h-full w-full items-center justify-between">
        <div className="flex h-full flex-col items-center gap-2">
          <div className="grid size-16 place-items-center rounded-full border-2 border-moonstone bg-moonstone/10 sm:size-20">
            {recievedOrderIcon}
          </div>
          <span className="text-sm font-medium sm:text-lg">Received</span>
        </div>
        <div className="flex h-full flex-col pb-8 sm:pb-10">
          <div className="h-1 w-2 rounded-full bg-moonstone sm:w-10"></div>
        </div>
        <div className="flex h-full flex-col items-center gap-2">
          <div className="grid size-16 place-items-center rounded-full border-2 border-moonstone bg-moonstone/10 sm:size-20">
            {processingOrderIcon}
          </div>
          <span className="text-sm font-medium sm:text-lg">Processing</span>
        </div>
        <div className="flex h-full flex-col pb-8 sm:pb-10">
          <div className="h-1 w-2 rounded-full bg-moonstone sm:w-10"></div>
        </div>
        <div className="flex h-full flex-col items-center gap-2">
          <div className="grid size-16 place-items-center rounded-full border-2 border-moonstone bg-moonstone/10 sm:size-20">
            {shippedOrderIcon}
          </div>
          <span className="text-sm font-medium sm:text-lg">Shipped</span>
        </div>
        <div className="flex h-full flex-col pb-8 sm:pb-10">
          <div className="h-1 w-2 rounded-full bg-moonstone sm:w-10"></div>
        </div>
        <div className="flex h-full flex-col items-center gap-2">
          <div className="grid size-16 place-items-center rounded-full border-2 border-moonstone bg-moonstone/10 sm:size-20">
            {deliveredOrderIcon}
          </div>
          <span className="text-sm font-medium sm:text-lg">Delivered</span>
        </div>
      </div>
    </div>
  );
};

export default OrderStatus;

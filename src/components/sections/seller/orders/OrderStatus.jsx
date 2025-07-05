import {
  deliveredOrderIcon,
  processingOrderIcon,
  recievedOrderIcon,
  shippedOrderIcon,
} from "@/assets/icons/seller-icons";

const statusSteps = [
  { key: "PENDING", label: "Received", icon: recievedOrderIcon },
  { key: "PROCESSING", label: "Processing", icon: processingOrderIcon },
  { key: "SHIPPED", label: "Shipped", icon: shippedOrderIcon },
  { key: "DELIVERED", label: "Delivered", icon: deliveredOrderIcon },
];

const OrderStatus = ({ order }) => {
  const currentStatus = order?.deliveryStatus || order?.status || "PENDING";
  const currentIndex = statusSteps.findIndex((step) => step.key === currentStatus);
  return (
    <div className="flex h-full w-full max-w-xl flex-col gap-5">
      <span className="text-3xl font-medium text-[#1A1A1ACC]">
        Order Status
      </span>
      <div className="flex h-full w-full items-center justify-between">
        {statusSteps.map((step, idx) => (
          <>
            <div key={step.key} className="flex h-full flex-col items-center gap-2">
              <div className={`grid size-16 place-items-center rounded-full border-2 ${idx <= currentIndex ? "border-moonstone bg-moonstone/10" : "border-gray-300 bg-gray-100"} sm:size-20`}>
                {step.icon}
              </div>
              <span className={`text-sm font-medium sm:text-lg ${idx <= currentIndex ? "text-moonstone" : "text-gray-400"}`}>{step.label}</span>
            </div>
            {idx < statusSteps.length - 1 && (
              <div className={`flex h-full flex-col pb-8 sm:pb-10`}>
                <div className={`h-1 w-2 rounded-full ${idx < currentIndex ? "bg-moonstone" : "bg-gray-300"} sm:w-10`}></div>
              </div>
            )}
          </>
        ))}
      </div>
    </div>
  );
};

export default OrderStatus;

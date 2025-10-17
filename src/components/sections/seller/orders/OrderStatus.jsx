import {
  deliveredOrderIcon,
  processingOrderIcon,
  recievedOrderIcon,
  shippedOrderIcon,
} from "@/assets/icons/seller-icons";
import { useState, useMemo, useEffect } from "react";
import toast from "react-hot-toast";
import { updateOrderStatus } from "@/lib/api/orders/updateOrderStatus";
import { useRouter } from "next/navigation";
import { useProfileStore } from "@/providers/profile-store-provider";

const statusSteps = [
  { key: "PENDING", label: "Received", icon: recievedOrderIcon },
  { key: "PROCESSING", label: "Processing", icon: processingOrderIcon },
  { key: "SHIPPED", label: "Shipped", icon: shippedOrderIcon },
  { key: "DELIVERED", label: "Delivered", icon: deliveredOrderIcon },
];

const OrderStatus = ({ order, onStatusUpdated }) => {
  const router = useRouter();
  // Normalize current delivery status for visualization
  const deriveStatus = (o) => {
    const ds = o?.deliveryStatus;
    if (ds) return ds;
    const s = o?.status;
    if (s === "COMPLETED") return "DELIVERED";
    if (s === "PENDING") return "PENDING";
    if (s === "PROCESSING") return "PROCESSING";
    if (s === "SHIPPED") return "SHIPPED";
    return "PENDING";
  };
  const initialStatus = deriveStatus(order);
  const [pending, setPending] = useState(false);
  const [localStatus, setLocalStatus] = useState(initialStatus);
  // Keep local status in sync if the order prop updates (e.g., after navigation/back)
  useEffect(() => {
    setLocalStatus(deriveStatus(order));
  }, [order?.deliveryStatus, order?.status, order?.id]);
  // profile store updaters
  let setOrders = null;
  let setSellerOrders = null;
  try {
    setOrders = useProfileStore((s) => s.setOrders);
    setSellerOrders = useProfileStore((s) => s.setSellerOrders);
  } catch (_) {}

  const currentIndex = useMemo(
    () => statusSteps.findIndex((step) => step.key === localStatus),
    [localStatus],
  );

  const handleChange = async (nextStatus) => {
    console.log("in handleChange");
    if (pending) return;
    // Disallow moving backwards (optional). Remove this guard if backward changes allowed
    const nextIndex = statusSteps.findIndex((s) => s.key === nextStatus);
    if (nextIndex < currentIndex) return;

    const prev = localStatus;
    setLocalStatus(nextStatus); // optimistic
    setPending(true);
    const tId = toast.loading("Updating order status...");
    try {
      console.log("[OrderStatus] calling updateOrderStatus", {
        orderId: order?.id,
        nextStatus,
      });
      const res = await updateOrderStatus(order?.id, nextStatus);
      console.log("[OrderStatus] updateOrderStatus response", res);
      if (res.success) {
        toast.success(`Status updated: ${prev} → ${nextStatus}`, { id: tId });
        setPending(false);
        onStatusUpdated?.(nextStatus);
        // Ensure fresh data when navigating back/forward
        try {
          router.refresh();
        } catch (_) {}
        // Update profile store orders so lists reflect new status immediately
        try {
          const applyUpdate = (arr) =>
            Array.isArray(arr)
              ? arr.map((o) =>
                  o.id === order?.id
                    ? {
                        ...o,
                        // Always set deliveryStatus to the UI key
                        deliveryStatus: nextStatus,
                        // If delivered, mark status COMPLETED; if first step, harmonize Pending
                        status:
                          nextStatus === "DELIVERED"
                            ? "COMPLETED"
                            : nextStatus === "PENDING"
                              ? "PENDING"
                              : o.status,
                      }
                    : o,
                )
              : arr;
          if (setOrders) setOrders((prevArr) => applyUpdate(prevArr));
          if (setSellerOrders)
            setSellerOrders((prevArr) => applyUpdate(prevArr));
        } catch (_) {}
      } else {
        setLocalStatus(prev); // revert
        setPending(false);
        toast.error(res.message || "Failed to update status", { id: tId });
      }
    } catch (e) {
      setLocalStatus(prev);
      setPending(false);
      toast.error(e?.message || "Failed to update status", { id: tId });
    }
  };
  return (
    <div className="flex h-full w-full max-w-xl flex-col gap-5">
      <span className="text-3xl font-medium text-[#1A1A1ACC]">
        Order Status
      </span>
      <div className="flex h-full w-full items-center justify-between">
        {statusSteps.map((step, idx) => (
          <div key={step.key} className="flex items-center gap-2">
            <div className="flex h-full flex-col items-center gap-2">
              <button
                type="button"
                disabled={pending || idx <= currentIndex}
                onClick={() => handleChange(step.key)}
                className={`grid size-16 place-items-center rounded-full border-2 transition-colors ${
                  idx <= currentIndex
                    ? "border-moonstone bg-moonstone/10"
                    : "border-gray-300 bg-gray-100 hover:border-moonstone/60 hover:bg-moonstone/5"
                } disabled:opacity-60 sm:size-20`}
              >
                {step.icon}
              </button>
              <span
                className={`text-sm font-medium sm:text-lg ${
                  idx <= currentIndex ? "text-moonstone" : "text-gray-400"
                }`}
              >
                {step.label}
              </span>
            </div>

            {idx < statusSteps.length - 1 && (
              <div className="flex h-full flex-col pb-8 sm:pb-10">
                <div
                  className={`h-1 w-2 rounded-full ${
                    idx < currentIndex ? "bg-moonstone" : "bg-gray-300"
                  } sm:w-10`}
                ></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderStatus;

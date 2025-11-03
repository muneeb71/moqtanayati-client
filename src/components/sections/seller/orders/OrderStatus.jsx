"use client";

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
import useTranslation from "@/hooks/useTranslation";

const statusStepsRaw = (t) => [
  {
    key: "PENDING",
    label: t("seller.orders.status.received"),
    icon: recievedOrderIcon,
  },
  {
    key: "PROCESSING",
    label: t("seller.orders.status.processing"),
    icon: processingOrderIcon,
  },
  {
    key: "SHIPPED",
    label: t("seller.orders.status.shipped"),
    icon: shippedOrderIcon,
  },
  {
    key: "DELIVERED",
    label: t("seller.orders.status.delivered"),
    icon: deliveredOrderIcon,
  },
];

const OrderStatus = ({ order, onStatusUpdated }) => {
  const { t } = useTranslation();
  const statusSteps = statusStepsRaw(t);
  const router = useRouter();
  // Normalize current delivery status for visualization
  const deriveStatus = (o) => {
    console.log("🔍 [OrderStatus] deriveStatus - Order data:", {
      id: o?.id,
      status: o?.status,
      deliveryStatus: o?.deliveryStatus,
    });

    const ds = o?.deliveryStatus;
    const s = o?.status;

    // If deliveryStatus exists and is not PENDING, use it
    if (ds && ds !== "PENDING") {
      console.log("🔍 [OrderStatus] Using deliveryStatus:", ds);
      return ds;
    }

    // If status is more advanced than deliveryStatus, use status
    if (s === "COMPLETED") {
      console.log("🔍 [OrderStatus] Status is COMPLETED, returning DELIVERED");
      return "DELIVERED";
    }
    if (s === "PROCESSING") {
      console.log(
        "🔍 [OrderStatus] Status is PROCESSING, returning PROCESSING",
      );
      return "PROCESSING";
    }
    if (s === "SHIPPED") {
      console.log("🔍 [OrderStatus] Status is SHIPPED, returning SHIPPED");
      return "SHIPPED";
    }
    if (s === "PENDING") {
      console.log("🔍 [OrderStatus] Status is PENDING, returning PENDING");
      return "PENDING";
    }

    // Fallback to deliveryStatus if available, otherwise PENDING
    const result = ds || "PENDING";
    console.log("🔍 [OrderStatus] Fallback result:", result);
    return result;
  };
  const initialStatus = deriveStatus(order);
  const [pending, setPending] = useState(false);
  const [localStatus, setLocalStatus] = useState(initialStatus);

  // Keep local status in sync if the order prop updates (e.g., after navigation/back)
  useEffect(() => {
    const newStatus = deriveStatus(order);
    console.log(
      "🔍 [OrderStatus] Status sync - Order status:",
      order?.status,
      "Delivery status:",
      order?.deliveryStatus,
      "Derived status:",
      newStatus,
    );
    setLocalStatus(newStatus);
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
    const tId = toast.loading(t("seller.orders.status.updating"));
    try {
      console.log("[OrderStatus] calling updateOrderStatus", {
        orderId: order?.id,
        nextStatus,
      });
      const res = await updateOrderStatus(order?.id, nextStatus);
      console.log("[OrderStatus] updateOrderStatus response", res);
      if (res.success) {
        toast.success(
          t("seller.orders.status.updated", { prev, next: nextStatus }),
          { id: tId },
        );
        setPending(false);
        onStatusUpdated?.(nextStatus);

        // Force refresh the page to get updated data from server
        try {
          console.log(
            "🔍 [OrderStatus] Refreshing page to get updated order data",
          );
          router.refresh();
          // Also try to reload the page after a short delay to ensure server data is fetched
          setTimeout(() => {
            window.location.reload();
          }, 1000);
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
                        // Update status based on the nextStatus
                        status:
                          nextStatus === "DELIVERED"
                            ? "COMPLETED"
                            : nextStatus === "PENDING"
                              ? "PENDING"
                              : nextStatus === "PROCESSING"
                                ? "PROCESSING"
                                : nextStatus === "SHIPPED"
                                  ? "SHIPPED"
                                  : o.status,
                      }
                    : o,
                )
              : arr;
          console.log(
            "🔍 [OrderStatus] Updating profile store with status:",
            nextStatus,
          );
          if (setOrders) setOrders((prevArr) => applyUpdate(prevArr));
          if (setSellerOrders)
            setSellerOrders((prevArr) => applyUpdate(prevArr));
        } catch (_) {}
      } else {
        setLocalStatus(prev); // revert
        setPending(false);
        toast.error(res.message || t("seller.orders.status.failed"), {
          id: tId,
        });
      }
    } catch (e) {
      setLocalStatus(prev);
      setPending(false);
      toast.error(e?.message || t("seller.orders.status.failed"), { id: tId });
    }
  };
  return (
    <div
      className="flex h-full w-full max-w-xl flex-col gap-5"
      key={`order-status-${order?.id}-${order?.deliveryStatus}-${order?.status}`}
    >
      <span className="text-3xl font-medium text-[#1A1A1ACC]">
        {t("seller.orders.status.title")}
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

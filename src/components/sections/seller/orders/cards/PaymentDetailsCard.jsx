"use client";
import useTranslation from "@/hooks/useTranslation";

const PaymentDetailsCard = ({ order }) => {
  const { t } = useTranslation();
  if (!order) return null;
  // These fields are placeholders, replace with real fields if available
  const paymentMethod = order.paymentMethod || order.paymentStatus || "N/A";
  const transactionId = order.transactionId || order.id || "N/A";
  const transactionDate = order.createdAt
    ? new Date(order.createdAt).toLocaleString()
    : "N/A";
  const estimatedDelivery = order.estimatedDelivery || "N/A";
  const shippingAddress = order.user?.address || "N/A";
  return (
    <div className="flex w-full flex-col gap-4 rounded-3xl border border-black/10 bg-[#F8F7FB] px-5 py-6">
      <span className="text-lg font-medium text-delftBlue">
        {t("seller.orders.payment_details.title")}
      </span>
      <div className="flex items-start justify-between gap-4">
        <span className="text-nowrap text-sm text-[#4D4D4DE5]">
          {t("seller.orders.payment_details.payment_method")}
        </span>
        <span className="text-right text-sm font-medium text-[#4D4D4DE5]">
          {paymentMethod}
        </span>
      </div>
      <div className="flex items-start justify-between gap-4">
        <span className="text-nowrap text-sm text-[#4D4D4DE5]">
          {t("seller.orders.payment_details.transaction_id")}
        </span>
        <span className="text-right text-sm font-medium text-[#4D4D4DE5]">
          {transactionId}
        </span>
      </div>
      <div className="flex items-start justify-between gap-4">
        <span className="text-nowrap text-sm text-[#4D4D4DE5]">
          {t("seller.orders.payment_details.transaction_date")}
        </span>
        <span className="text-right text-sm font-medium text-[#4D4D4DE5]">
          {transactionDate}
        </span>
      </div>
      <div className="flex items-start justify-between gap-4">
        <span className="text-nowrap text-sm text-[#4D4D4DE5]">
          {t("seller.orders.payment_details.estimated_delivery")}
        </span>
        <span className="text-right text-sm font-medium text-[#4D4D4DE5]">
          {estimatedDelivery}
        </span>
      </div>
      <div className="flex items-start justify-between gap-4">
        <span className="text-nowrap text-sm text-[#4D4D4DE5]">
          {t("seller.orders.payment_details.shipping_address")}
        </span>
        <span className="text-right text-sm font-medium text-[#4D4D4DE5]">
          {shippingAddress}
        </span>
      </div>
    </div>
  );
};

export default PaymentDetailsCard;

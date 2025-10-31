"use client";
import PageHeading from "@/components/headings/PageHeading";
import OrdersBar from "@/components/sections/seller/orders/OrdersBar";
import useTranslation from "@/hooks/useTranslation";

const SellerOrdersLayout = ({ children }) => {
  const { t } = useTranslation();
  return (
    <div className="flex w-full flex-col items-center justify-center gap-10 px-3">
      <PageHeading>{t("seller.orders.orders")}</PageHeading>
      <div className="flex w-full max-w-lg flex-col items-center justify-center pb-28">
        <OrdersBar />
        {children}
      </div>
    </div>
  );
};

export default SellerOrdersLayout;

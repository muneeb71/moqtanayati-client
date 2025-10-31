"use client";
import PageHeading from "@/components/headings/PageHeading";
import CustomerDetailsCard from "@/components/sections/seller/orders/cards/CustomerDetailsCard";
import OrderDetailsCard from "@/components/sections/seller/orders/cards/OrderDetailsCard";
import PaymentDetailsCard from "@/components/sections/seller/orders/cards/PaymentDetailsCard";
import OrderStatus from "@/components/sections/seller/orders/OrderStatus";
import { getOrderByIdClient } from "@/lib/api/orders/getOrderByIdClient";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import OrderDetailsSkeleton from "@/components/loaders/OrderDetailsSkeleton";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import useTranslation from "@/hooks/useTranslation";

const OrderDetailsPage = () => {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const orderId = searchParams.get("id");

  const fetchOrder = async (id) => {
    setLoading(true);
    try {
      const data = await getOrderByIdClient(id);
      setOrder(data?.data);
    } catch (error) {
      // Optionally handle error
      setOrder(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (orderId) {
      fetchOrder(orderId);
    }
  }, [orderId]);

  if (loading) return <OrderDetailsSkeleton />;

  return (
    <div className="flex w-full flex-col items-center justify-center gap-10 px-3 pb-28">
      <PageHeading>
        <div>
          <div className="flex w-full max-w-4xl items-center justify-start">
            <Link
              href="/seller/orders/active-orders"
              className="flex items-center gap-2 text-sm text-darkBlue hover:underline"
            >
              <ArrowLeft className="size-4" />
              <span>{t("header.back")}</span>
            </Link>
          </div>
          {t("orders.order_details")}
        </div>
      </PageHeading>
      <div className="flex w-full max-w-4xl flex-col items-center justify-center gap-20">
        <div className="grid w-full gap-10 md:grid-cols-[6fr_4fr]">
          <div className="flex w-full flex-col justify-center gap-8">
            <OrderDetailsCard order={order} />
            <CustomerDetailsCard order={order} />
          </div>
          <PaymentDetailsCard order={order} />
        </div>
        <OrderStatus order={order} />
      </div>
    </div>
  );
};

export default OrderDetailsPage;

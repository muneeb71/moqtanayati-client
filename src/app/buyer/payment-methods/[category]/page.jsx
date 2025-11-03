"use client";

import CreditCard from "@/components/sections/landing/payment-methods/CreditCard";
import { Plus } from "lucide-react";
import useTranslation from "@/hooks/useTranslation";

const PaymentMethodsPage = () => {
  const { t } = useTranslation();
  return (
    <div className="flex w-full flex-col gap-5 min-h-[40rem]">
      <button className="flex w-fit items-center gap-3 text-moonstone">
        <Plus />
        <span className="font-medium">{t("buyer.payment_methods.add_card")}</span>
      </button>
      <div className="flex flex-wrap items-center gap-7">
        <CreditCard />
        <CreditCard />
      </div>
    </div>
  );
};

export default PaymentMethodsPage;

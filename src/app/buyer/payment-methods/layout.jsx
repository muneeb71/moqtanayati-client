"use client";

import PageHeading from "@/components/headings/PageHeading";
import PaymentMethodsBar from "@/components/sections/landing/payment-methods/PaymentMethodsBar";
import useTranslation from "@/hooks/useTranslation";

const PaymentMethodsLayout = ({ children }) => {
  const { t } = useTranslation();
  return (
    <div className="flex w-full flex-col items-center justify-center gap-5 px-3">
      <PageHeading>{t("buyer.payment_methods.title")}</PageHeading>
      <div className="flex w-full max-w-7xl flex-col gap-5">
        <PaymentMethodsBar />
        {children}
      </div>
    </div>
  );
};

export default PaymentMethodsLayout;

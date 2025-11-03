"use client";

import PageHeading from "@/components/headings/PageHeading";
import useTranslation from "@/hooks/useTranslation";

const CartLayout = ({ children }) => {
  const { t } = useTranslation();
  return (
    <div className="flex w-full flex-col items-center justify-center gap-5 px-3">
      <PageHeading>{t("buyer.cart.breadcrumb")}</PageHeading>
      {children}
    </div>
  );
};

export default CartLayout;

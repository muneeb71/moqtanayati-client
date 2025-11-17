"use client";

import {
  masterCardIcon,
  payPalIcon,
  visaIcon,
} from "@/assets/icons/payment-icons";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import useTranslation from "@/hooks/useTranslation";

const PaymentMethodsBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useTranslation();

  const paymentMethodCategories = ["cards", "paypal"];

  return (
    <div className="flex w-full items-center gap-2 border-b-[1.5px] border-[#F0F1F4] pb-5 md:gap-[18px]">
      {paymentMethodCategories.map((bidCategory, index) => (
        <button
          onClick={() =>
            router.push("/payment-methods/" + bidCategory.toLowerCase())
          }
          key={index}
          className={cn(
            "flex items-center justify-center gap-1.5 rounded-[12px] border-[1.5px] px-3 py-1.5 md:px-5 md:py-2.5",
            pathname === "/payment-methods/" + bidCategory.toLowerCase()
              ? "border-moonstone bg-moonstone text-white"
              : "border-silver hover:border-moonstone hover:bg-moonstone/10",
          )}
        >
          {bidCategory == "cards"
            ? t("buyer.payment_methods.categories.cards")
            : t("buyer.payment_methods.categories.paypal")}
          {bidCategory == "cards" ? (
            <>
              {visaIcon}
              {masterCardIcon}
            </>
          ) : (
            payPalIcon
          )}
        </button>
      ))}
    </div>
  );
};

export default PaymentMethodsBar;

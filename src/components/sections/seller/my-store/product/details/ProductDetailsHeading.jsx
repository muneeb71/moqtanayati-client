"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import useTranslation from "@/hooks/useTranslation";

const ProductDetailsHeading = () => {
  const { t } = useTranslation();
  return (
    <div className="flex w-full items-center justify-between">
      <Link
        href="/seller/my-store"
        className="flex items-center gap-2 text-sm text-darkBlue hover:underline"
      >
        <ArrowLeft className="size-4" />
        <span>{t("header.back")}</span>
      </Link>
      <span>{t("seller.store.product_details")}</span>
      <span className="w-10" />
    </div>
  );
};

export default ProductDetailsHeading;

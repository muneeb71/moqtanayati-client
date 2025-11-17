"use client";
import PageHeading from "@/components/headings/PageHeading";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import useTranslation from "@/hooks/useTranslation";

const ProductDetailsLayout = ({ children }) => {
  const { t } = useTranslation();
  return (
    <div className="flex w-full flex-col items-center justify-center pb-28">
      <div className="flex w-full px-3">
        <PageHeading>
          <div className="flex w-full flex-col gap-2">
            <div className="flex w-full items-center justify-start">
              <Link
                href="/seller/auctions/live"
                className="flex items-center gap-2 text-sm text-darkBlue hover:underline"
              >
                <ArrowLeft className="size-4" />
                <span>{t("header.back")}</span>
              </Link>
            </div>
            <div className="flex w-full items-start justify-start">
              <span>
                {t("auctions.my_auctions")} {">"}{" "}
                {t("auctions.product_details")}
              </span>
            </div>
          </div>
        </PageHeading>
      </div>
      {children}
    </div>
  );
};

export default ProductDetailsLayout;

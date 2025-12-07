"use client";

import GoBackButton from "@/components/buttons/GoBackButton";
import PageHeading from "@/components/headings/PageHeading";
import { useSearchParams } from "next/navigation";
import useTranslation from "@/hooks/useTranslation";

const AddProductLayout = ({ children }) => {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const isEdit = Boolean(searchParams.get("id"));

  return (
    <div className="item-center flex w-full flex-col px-3">
      <PageHeading>
        <div className="flex flex-col w-full items-end">
          <GoBackButton />
          <div className="text-lg font-medium md:text-3xl">
            {t("common.my_store")} {">"}{" "}
            {isEdit ? t("common.edit_product") : t("common.add_product")}
          </div>
        </div>
      </PageHeading>
      <div className="flex flex-col items-center">{children}</div>
    </div>
  );
};

export default AddProductLayout;

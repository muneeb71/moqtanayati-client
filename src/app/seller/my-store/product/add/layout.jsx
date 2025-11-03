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
        <GoBackButton />
        {t("common.my_store")} {">"}{" "}
        {isEdit ? t("common.edit_product") : t("common.add_product")}
      </PageHeading>
      <div className="flex flex-col items-center">{children}</div>
    </div>
  );
};

export default AddProductLayout;

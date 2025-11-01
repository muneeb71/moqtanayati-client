"use client";

import GoBackButton from "@/components/buttons/GoBackButton";
import PageHeading from "@/components/headings/PageHeading";
import { useSearchParams } from "next/navigation";

const AddProductLayout = ({ children }) => {
  const searchParams = useSearchParams();
  const isEdit = Boolean(searchParams.get("id"));

  return (
    <div className="item-center flex w-full flex-col px-3">
      <PageHeading>
        <GoBackButton />
        My Store {">"} {isEdit ? "Edit Product" : "Add Product"}
      </PageHeading>
      <div className="flex flex-col items-center">{children}</div>
    </div>
  );
};

export default AddProductLayout;

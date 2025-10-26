import { Suspense } from "react";
import UnitsAndDimensionsForm from "@/components/sections/seller/my-store/product/add/forms/UnitsAndDimensionsForm";

const UnitsAndDimensionsPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UnitsAndDimensionsForm />
    </Suspense>
  );
};

export default UnitsAndDimensionsPage;

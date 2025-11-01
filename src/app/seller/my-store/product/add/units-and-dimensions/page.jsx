import { Suspense } from "react";
import UnitsAndDimensionsFormWrapper from "@/components/sections/seller/my-store/product/add/forms/UnitsAndDimensionsFormWrapper";

export const dynamic = 'force-dynamic';

const UnitsAndDimensionsPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UnitsAndDimensionsFormWrapper />
    </Suspense>
  );
};

export default UnitsAndDimensionsPage;

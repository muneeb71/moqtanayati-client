import { Suspense } from "react";
import PriceAndShippingFormWrapper from "@/components/sections/seller/my-store/product/add/forms/PriceAndShippingFormWrapper";

export const dynamic = 'force-dynamic';

const PriceAndShippingPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PriceAndShippingFormWrapper />
    </Suspense>
  );
};

export default PriceAndShippingPage;

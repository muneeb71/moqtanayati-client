import { Suspense } from "react";
import PriceAndShippingForm from "@/components/sections/seller/my-store/product/add/forms/PriceAndShippingForm";

const PriceAndShippingPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PriceAndShippingForm />
    </Suspense>
  );
};

export default PriceAndShippingPage;

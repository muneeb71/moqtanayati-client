"use client";

import { useSearchParams } from "next/navigation";
import PriceAndShippingFormContent from "./PriceAndShippingFormContent";

const PriceAndShippingFormWrapper = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  
  return <PriceAndShippingFormContent id={id} />;
};

export default PriceAndShippingFormWrapper;


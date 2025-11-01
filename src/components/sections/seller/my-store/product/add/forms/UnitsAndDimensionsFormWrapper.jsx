"use client";

import { useSearchParams } from "next/navigation";
import UnitsAndDimensionsFormContent from "./UnitsAndDimensionsFormContent";

const UnitsAndDimensionsFormWrapper = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  
  return <UnitsAndDimensionsFormContent id={id} />;
};

export default UnitsAndDimensionsFormWrapper;


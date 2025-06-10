"use client";

import { useState } from "react";
import PictureAndVideosForm from "./forms/PictureAndVideosForm";
import UnitsAndDimensionsForm from "./forms/UnitsAndDimensionsForm";
import PageHeading from "@/components/headings/PageHeading";
import { ChevronLeft } from "lucide-react";
import PriceAndShippingForm from "./forms/PriceAndShippingForm";

const AddProductFlow = () => {
  const tabs = ["Picture & Videos", "Unit & Dimensions", "Pricing & Shipping"];
  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  const prevTab = () => {
    if (currentTabIndex > 0) setCurrentTabIndex(currentTabIndex - 1);
  };
  const nextTab = () => {
    if (currentTabIndex < tabs.length - 1) {
      setCurrentTabIndex(currentTabIndex + 1);
    }
  };

  return (
    <div className="flex w-full flex-col items-center justify-center px-3">
      <PageHeading>
        {currentTabIndex != 0 && (
          <button
            onClick={() => prevTab()}
            className="flex w-fit items-center gap-1 text-start text-xl font-normal md:pb-10"
          >
            <ChevronLeft className="size-6" />
            <span className="hidden md:inline">Back</span>
          </button>
        )}
        My Store {">"} Add Product
      </PageHeading>
      {tabs[currentTabIndex] === tabs[0] ? (
        <PictureAndVideosForm prevTab={prevTab} nextTab={nextTab} />
      ) : tabs[currentTabIndex] === tabs[1] ? (
        <UnitsAndDimensionsForm prevTab={prevTab} nextTab={nextTab} />
      ) : (
        <PriceAndShippingForm />
      )}
    </div>
  );
};

export default AddProductFlow;

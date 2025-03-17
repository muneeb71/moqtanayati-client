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
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState(null);
  const [productTitle, setProductTitle] = useState("");
  const [productDescription, setProductDescription] = useState("");

  const [unitsAvailable, setUnitsAvailable] = useState("");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [conditionRating, setConditionRating] = useState("");
  const [productCategories, setProductCategories] = useState("");
  const productConditionsList = ["New", "Old"];
  const [productCondition, setProductCondition] = useState(
    productConditionsList[0],
  );

  const pricingFormats = ["Fixed Price", "Auctions"];
  const [selectedPricingFormat, setSelectedPricingFormat] = useState(
    pricingFormats[0],
  );
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const shippingMethods = [
    "Freight: Oversized items",
    "Local pickup only: Sell to Buyers near you",
  ];
  const [selectedShippingMethod, setSelectedShippingMethod] = useState(
    shippingMethods[0],
  );

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
            <ChevronLeft className="size-6" /> Back
          </button>
        )}
        My Store {">"} Add Product
      </PageHeading>
      {tabs[currentTabIndex] === tabs[0] ? (
        <PictureAndVideosForm
          prevTab={prevTab}
          nextTab={nextTab}
          images={images}
          setImages={setImages}
          video={video}
          setVideo={setVideo}
          productTitle={productTitle}
          setProductTitle={setProductTitle}
          productDescription={productDescription}
          setProductDescription={setProductDescription}
        />
      ) : tabs[currentTabIndex] === tabs[1] ? (
        <UnitsAndDimensionsForm
          prevTab={prevTab}
          nextTab={nextTab}
          unitsAvailable={unitsAvailable}
          setUnitsAvailable={setUnitsAvailable}
          length={length}
          setLength={setLength}
          width={width}
          setWidth={setWidth}
          height={height}
          setHeight={setHeight}
          weight={weight}
          setWeight={setWeight}
          conditionRating={conditionRating}
          setConditionRating={setConditionRating}
          productCategories={productCategories}
          setProductCategories={setProductCategories}
          productConditionsList={productConditionsList}
          productCondition={productCondition}
          setProductCondition={setProductCondition}
        />
      ) : (
        <PriceAndShippingForm
          pricingFormats={pricingFormats}
          selectedPricingFormat={selectedPricingFormat}
          setSelectedPricingFormat={setSelectedPricingFormat}
          price={price}
          setPrice={setPrice}
          quantity={quantity}
          setQuantity={setQuantity}
          shippingMethods={shippingMethods}
          selectedShippingMethod={selectedShippingMethod}
          setSelectedShippingMethod={setSelectedShippingMethod}
        />
      )}
    </div>
  );
};

export default AddProductFlow;

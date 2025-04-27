import { auctionHammerIcon, priceTagIcon } from "@/assets/icons/seller-icons";
import RoundedButton from "@/components/buttons/RoundedButton";
import CustomSelect from "@/components/form-fields/CustomSelect";
import InputField from "@/components/form-fields/InputField";
import Label from "@/components/form-fields/Label";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React from "react";

const PriceAndShippingForm = ({
  pricingFormats,
  selectedPricingFormat,
  setSelectedPricingFormat,
  price,
  setPrice,
  quantity,
  setQuantity,
  shippingMethods,
  selectedShippingMethod,
  setSelectedShippingMethod,
}) => {
  const router = useRouter();
  return (
    <div className="flex w-full max-w-[404px] flex-col gap-5 py-10">
      <span className="text-2xl">Pricing & Shipping</span>
      <div className="flex w-full flex-col gap-5">
        <div className="flex flex-col">
          <span className="text-lg font-medium text-[#3D3D5D]">Pricing</span>
          <span className="text-sm text-battleShipGray">
            Select Buy it now or Auction
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-medium text-darkBlue">Pricing Format</span>
          <div className="grid w-full grid-cols-2 gap-4">
            {pricingFormats.map((format, index) => (
              <button
                key={index}
                className={cn(
                  "flex items-center gap-3 rounded-lg p-4",
                  format === selectedPricingFormat
                    ? "border-[1.2px] border-moonstone bg-moonstone/5 font-medium text-moonstone"
                    : "bg-[#CCCCCC40]",
                )}
                onClick={() => setSelectedPricingFormat(format)}
              >
                <span
                  className={
                    selectedPricingFormat === format
                      ? "text-moonstone"
                      : "text-battleShipGray"
                  }
                >
                  {format == "Auctions" ? auctionHammerIcon : priceTagIcon}
                </span>
                <span className="">{format}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="grid w-full grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            {/* <Label text="Price" /> */}
            <InputField
              type="number"
              value={price}
              placeholder="Price"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            {/* <Label text="Quantity" /> */}
            <InputField
              type="number"
              value={quantity}
              placeholder="Quantity"
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
        </div>
        <Label text="Shipping" />
        <CustomSelect
          options={shippingMethods}
          selectedOption={selectedShippingMethod}
          setSelectedOption={setSelectedShippingMethod}
        />
      </div>
      <RoundedButton
        className="my-10 w-full max-w-60 self-center"
        title="Next"
        showIcon
        onClick={() => router.push("/seller/my-store")}
      />
    </div>
  );
};

export default PriceAndShippingForm;

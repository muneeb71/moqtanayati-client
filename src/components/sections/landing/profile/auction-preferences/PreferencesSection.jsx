"use client";

import {
  electronicsIcon,
  furnitureIcon,
} from "@/assets/icons/category-slider-icons";
import RoundedButton from "@/components/buttons/RoundedButton";
import InputField from "@/components/form-fields/InputField";
import { Switch } from "@/components/ui/switch";
import { X } from "lucide-react";
import { useState } from "react";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

const PreferencesSection = () => {
  const [selectedCategories, setSelectedCategories] = useState([
    {
      title: "Electronics",
      icon: electronicsIcon,
      bgColor: "#FFE9D3",
    },
    {
      title: "Furniture",
      icon: furnitureIcon,
      bgColor: "#FEE2EC",
    },
  ]);

  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [selectedPriceRange, setSelectedPriceRange] = useState([0, 2500]);

  const handleRemoveCategory = (title) => {
    setSelectedCategories((prevCategories) =>
      prevCategories.filter((category) => category.title !== title),
    );
  };

  const handleSliderChange = (values) => {
    setSelectedPriceRange(values);
  };

  const handleInputChange = (index, value) => {
    const newRange = [...priceRange];
    newRange[index] = value ? parseInt(value, 10) : 0;
    setPriceRange(newRange);
  };

  const handleSavePreferences = () => {
    console.log("Selected Categories:", selectedCategories);
    console.log("Price Range:", priceRange);
  };

  return (
    <div className="flex w-full max-w-[470px] flex-col gap-6 p-5">
      <div className="flex w-full flex-col gap-2">
        <h1 className="text-lg font-medium leading-[28px] text-darkBlue">
          Category Selection
        </h1>
        <button className="w-fit text-start font-semibold text-moonstone">
          Add
        </button>
        <div className="no-scrollbar flex max-w-full items-center gap-5 overflow-auto">
          {selectedCategories.length > 0 ? (
            selectedCategories.map((category, index) => (
              <div
                key={index}
                className="flex items-center gap-2 rounded-full bg-[#CCCCCC1A] py-2 pl-4 pr-3"
              >
                {category.title}
                <button onClick={() => handleRemoveCategory(category.title)}>
                  <X className="size-4" />
                </button>
              </div>
            ))
          ) : (
            <p className="text-sm text-battleShipGray">
              No categories selected
            </p>
          )}
        </div>
      </div>
      <div className="flex w-full flex-col gap-2">
        <h1 className="text-lg font-medium leading-[28px] text-darkBlue">
          Price Range
        </h1>
        <div className="flex w-full py-5">
          <RangeSlider
            min={priceRange[0]}
            max={priceRange[1]}
            value={selectedPriceRange}
            onInput={handleSliderChange}
            id="custom-slider"
          />
        </div>
        <div className="flex w-full items-center justify-between">
          <InputField
            className="w-full max-w-36"
            type="number"
            value={priceRange[0]}
            onChange={(e) => handleInputChange(0, e.target.value)}
            placeholder="$0"
          />
          <span>-</span>
          <InputField
            className="w-full max-w-36"
            type="number"
            value={priceRange[1]}
            onChange={(e) => handleInputChange(1, e.target.value)}
            placeholder="$5000"
          />
        </div>
      </div>
      <div className="flex w-full flex-col">
        <h1 className="text-lg font-medium leading-[28px] text-darkBlue">
          Auction Alerts
        </h1>
        <span className="text-xs text-battleShipGray">
          Toggles to enable notifications for:
        </span>
        <div className="flex w-full flex-col gap-2 py-5">
          <div className="flex items-center justify-between">
            <span className="font-medium text-davyGray">
              Auction ending soon
            </span>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <span className="font-medium text-davyGray">
              New listings in preferred categories
            </span>
            <Switch />
          </div>
        </div>
      </div>
      <RoundedButton
        title="Save Preferences"
        className="my-10 w-fit self-center"
        onClick={handleSavePreferences}
      />
    </div>
  );
};

export default PreferencesSection;

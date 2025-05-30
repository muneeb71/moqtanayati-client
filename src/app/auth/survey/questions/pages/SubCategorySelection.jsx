"use client";

import {
  ChevronRight,
  Home,
  Smartphone,
  Monitor,
  Sofa,
  Music,
  Heart,
  Gem,
  PawPrint,
  Car,
  Utensils,
  Gift,
  ChevronLeft,
} from "lucide-react";
import { categoryData } from "@/lib/dummy-category";

const iconMap = {
  Home,
  Smartphone,
  Monitor,
  Sofa,
  Music,
  Heart,
  Gem,
  PawPrint,
  Car,
  Utensils,
  Gift,
};

const SubcategorySelection = ({ formData, setFormData, setStep, goBack }) => {
  const selectedCategory = formData.productsAndServicesToSell;

  if (!selectedCategory || !categoryData[selectedCategory]) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 text-center">
        <p className="text-lg font-semibold text-darkBlue">
          Please select a valid category first.
        </p>
      </div>
    );
  }

  const { icon: iconName, subcategories } = categoryData[selectedCategory];
  const Icon = iconMap[iconName];
  const selectedSubcategories = formData.supplies || [];

  const handleToggle = (item) => {
    if (selectedSubcategories.includes(item)) {
      setFormData((prev) => ({
        ...prev,
        supplies: prev.supplies.filter((v) => v !== item),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        supplies: [...(prev.supplies || []), item],
      }));
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4">
      <div className="flex w-full justify-start">
        <Icon className="mb-4 h-10 w-10 text-moonstone" />
      </div>
      <h1 className="mb-2 w-full text-start text-2xl capitalize text-darkBlue">
        {selectedCategory.replace(/_/g, " ")}
      </h1>
      <p className="mb-7 w-full text-start text-base text-customGray">
        You can choose multiple categories
      </p>
      <div className="mb-12 flex w-full flex-wrap justify-center gap-3">
        {subcategories.map((item) => {
          const isSelected = selectedSubcategories.includes(item);
          return (
            <button
              key={item}
              type="button"
              onClick={() => handleToggle(item)}
              className={`flex select-none items-center rounded-full px-2 py-1 text-base transition ${
                isSelected
                  ? "bg-moonstone text-white"
                  : "border border-silver bg-white text-davyGray"
              } `}
            >
              {item}
              {isSelected && (
                <span className="ml-1 text-lg font-bold leading-none">
                  &times;
                </span>
              )}
            </button>
          );
        })}
      </div>
      <div className="flex w-full justify-center">
        <button
          className="mr-2 flex items-center rounded-full bg-grayishWhite p-2 text-xs"
          onClick={goBack}
        >
          <ChevronLeft />
          Go Back
        </button>
        <button
          className={`flex w-full max-w-xs items-center justify-center gap-2 rounded-full bg-moonstone py-3 text-base font-medium text-white transition ${
            selectedSubcategories.length === 0
              ? "cursor-not-allowed opacity-50"
              : "hover:bg-moonstone/90"
          }`}
          disabled={selectedSubcategories.length === 0}
          onClick={() => setStep((prev) => prev + 1)}
        >
          Next
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default SubcategorySelection;

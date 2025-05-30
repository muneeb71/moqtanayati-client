"use client";
import { useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { categories } from "@/lib/dummy-category";

const CategorySelection = ({ setFormData, setStep, goBack }) => {
  const [selected, setSelected] = useState("");

  const handleSelect = (value) => {
    setSelected(value);
    setFormData((prev) => ({
      ...prev,
      productsAndServicesToSell: value,
    }));
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4">
      <div className="flex w-full justify-start">
        <img src="/auth/moneybag.svg" alt="" className="mb-6 h-12 w-12" />
      </div>
      <h1 className="mb-2 w-full text-start text-2xl font-semibold text-darkBlue">
        Products and Services
      </h1>
      <p className="mb-7 text-start text-base text-customGray">
        Finally, what is your business activity? Choose the products and
        services you plan to sell
      </p>
      <div className="mb-10 grid max-w-xs grid-cols-4 gap-6">
        {categories.map((cat, i) => {
          const Icon = cat.icon;
          const isSelected = selected === cat.value;
          return (
            <div
              key={cat.value + i}
              className="flex flex-col items-center justify-center"
            >
              <button
                type="button"
                onClick={() => handleSelect(cat.value)}
                className={`flex aspect-square h-16 w-16 flex-col items-center justify-center rounded-full border-2 transition ${cat.bg} ${
                  isSelected
                    ? "border-moonstone ring-2 ring-moonstone"
                    : "border-transparent"
                }`}
              >
                <Icon
                  className={`mb-1 h-6 w-6 ${
                    isSelected ? "text-moonstone" : "text-davyGray"
                  }`}
                />
              </button>
              <span className="text-xs text-davyGray">{cat.label}</span>
            </div>
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
            !selected
              ? "cursor-not-allowed opacity-50"
              : "hover:bg-moonstone/90"
          }`}
          disabled={!selected}
          onClick={() => setStep((prev) => prev + 1)}
        >
          Next
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default CategorySelection;

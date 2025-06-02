"use client";

import RoundedButton from "@/components/buttons/RoundedButton";
import { productAndServicesCategories } from "@/lib/categories";
import { useSurveyStore } from "@/providers/survey-store-provider";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const ProductAndServicesForm = ({ role }) => {
  const router = useRouter();

  const { productsAndServices, toggleProductAndService } = useSurveyStore(
    (state) => state,
  );

  return (
    <div className="flex flex-col justify-center bg-white px-4">
      <Image
        src="/static/auth/moneybag.svg"
        width={52}
        height={52}
        alt=""
        className="mb-6 size-[52px]"
      />
      <h1 className="mb-2 text-start text-2xl text-black">
        Products and Services
      </h1>
      <p className="mb-7 text-xl text-darkBlue/50">
        Finally, what is your business activity? Choose the products and
        services you plan to sell
      </p>
      <div className="mb-10 grid max-w-xs grid-cols-4 gap-6">
        {productAndServicesCategories.map((category, i) => {
          const Icon = category.icon;
          const isSelected = productsAndServices?.includes(category.value);
          return (
            <div
              key={category.value + i}
              className="flex flex-col items-center justify-center"
            >
              <button
                type="button"
                onClick={() => toggleProductAndService(category.value)}
                className={`flex aspect-square h-16 w-16 flex-col items-center justify-center rounded-full border-2 transition ${category.bg} ${
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
              <span className="text-xs text-davyGray">{category.label}</span>
            </div>
          );
        })}
      </div>
      <RoundedButton
        title="Next"
        showIcon
        onClick={() => router.push("/survey/home-supplies")}
      />
    </div>
  );
};

export default ProductAndServicesForm;

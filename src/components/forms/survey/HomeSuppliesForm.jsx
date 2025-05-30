"use client";

import RoundedButton from "@/components/buttons/RoundedButton";
import {
  homeSuppliesCategories,
  productAndServicesCategories,
} from "@/lib/categories";
import { cn } from "@/lib/utils";
import { useSurveyStore } from "@/providers/survey-store-provider";
import { X } from "lucide-react/dist/cjs/lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const HomeSuppliesForm = ({ role }) => {
  const router = useRouter();

  const { homeSupplies, toggleHomeSupply } = useSurveyStore((state) => state);

  return (
    <div className="flex flex-col justify-center bg-white px-4">
      <Image
        src="/static/auth/house.svg"
        width={52}
        height={52}
        alt=""
        className="mb-6 size-[52px]"
      />
      <h1 className="mb-2 text-start text-2xl text-black">Home Supplies</h1>
      <p className="mb-7 text-xl text-darkBlue/50">
        You can choose multiple categories
      </p>
      <div className="mb-10 flex max-w-md flex-wrap items-center gap-x-2 gap-y-3">
        {homeSuppliesCategories.map((supply, i) => {
          const isSelected = homeSupplies?.includes(supply.value);
          return (
            <button
              key={supply.value + i}
              className={cn(
                "flex items-center justify-center gap-2 rounded-full px-3 py-2",
                isSelected
                  ? "bg-moonstone text-white"
                  : "border border-silver text-davyGray",
              )}
              onClick={() => toggleHomeSupply(supply.value)}
            >
              <span className="text-sm">{supply.label}</span>
              {isSelected && <X size={14} className="text-white" />}
            </button>
          );
        })}
      </div>
      <RoundedButton
        title="Next"
        showIcon
        onClick={() => router.push("/auth/" + role + "/survey/consent")}
      />
    </div>
  );
};

export default HomeSuppliesForm;

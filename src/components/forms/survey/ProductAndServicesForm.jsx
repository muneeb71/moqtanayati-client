"use client";

import RoundedButton from "@/components/buttons/RoundedButton";
import { productAndServicesCategories } from "@/lib/categories";
import { useSurveyStore } from "@/providers/survey-store-provider";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useTranslation from "@/hooks/useTranslation";

const ProductAndServicesForm = ({ role }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [navigating, setNavigating] = useState(false);

  const { productsAndServices, toggleProductAndService } = useSurveyStore(
    (state) => state,
  );

  const handleNext = () => {
    setNavigating(true);
    router.push("/survey/home-supplies");
  };

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
        {t("survey.pas.title")}
      </h1>
      <p className="mb-7 text-xl text-darkBlue/50">
        {t("survey.pas.subtitle")}
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
        title={navigating ? t("common.loading") : t("signup.next")}
        showIcon={!navigating}
        loading={navigating || undefined}
        onClick={handleNext}
        disabled={navigating}
      />
    </div>
  );
};

export default ProductAndServicesForm;

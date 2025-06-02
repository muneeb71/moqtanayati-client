"use client";

import RoundedButton from "@/components/buttons/RoundedButton";
import { useSurveyStore } from "@/providers/survey-store-provider";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import OptionButton from "./OptionButton";

const StartSellingForm = ({ role }) => {
  const options = [
    { label: "Yes, I have products", value: true },
    { label: "No, I am still working on it", value: false },
  ];

  const router = useRouter();

  const { haveProducts, setHaveProducts } = useSurveyStore((state) => state);

  return (
    <div className="flex flex-col justify-center bg-white px-4">
      <Image
        src="/static/auth/box.svg"
        width={52}
        height={52}
        alt=""
        className="mb-6 size-[52px]"
      />
      <h1 className="mb-2 text-start text-2xl text-black">Start Selling</h1>
      <p className="mb-7 text-xl text-darkBlue/50">
        Do you have a product ready to sell?
      </p>
      <div className="mb-10 flex w-full flex-col gap-3">
        {options.map((option) => (
          <OptionButton
            key={option.label}
            setOption={setHaveProducts}
            option={option.value}
            label={option.label}
            selectedOption={haveProducts}
          />
        ))}
      </div>
      <RoundedButton
        title="Next"
        showIcon
        onClick={() => router.push("/survey/experience")}
      />
    </div>
  );
};

export default StartSellingForm;

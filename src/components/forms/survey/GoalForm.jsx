"use client";

import RoundedButton from "@/components/buttons/RoundedButton";
import { useSurveyStore } from "@/providers/survey-store-provider";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import OptionButton from "./OptionButton";

const GoalForm = () => {
  const options = [
    { label: "Discover", value: "DISCOVER" },
    { label: "Increase Profit", value: "PROFIT" },
    { label: "Start New Business", value: "NEWBUSINESS" },
    { label: "Explore", value: "EXPLORE" },
  ];

  const router = useRouter();

  const { goal, setGoal } = useSurveyStore((state) => state);

  return (
    <div className="flex flex-col justify-center bg-white px-4">
      <Image
        src="/static/auth/flag.svg"
        width={52}
        height={52}
        alt=""
        className="mb-6 size-[52px]"
      />
      <h1 className="mb-2 text-start text-2xl text-black">
        What Brings You Here?
      </h1>
      <p className="mb-7 text-xl text-darkBlue/50">
        We would love to know your main goal. How do you plan on using this
        platform?
      </p>
      <div className="mb-10 flex w-full flex-col gap-3">
        {options.map((option) => (
          <OptionButton
            key={option.label}
            setOption={setGoal}
            option={option.value}
            label={option.label}
            selectedOption={goal}
          />
        ))}
      </div>
      <RoundedButton
        title="Next"
        showIcon
        onClick={() =>
          router.push("/survey/product-and-services")
        }
      />
    </div>
  );
};

export default GoalForm;

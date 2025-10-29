"use client";

import RoundedButton from "@/components/buttons/RoundedButton";
import { useSurveyStore } from "@/providers/survey-store-provider";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import OptionButton from "./OptionButton";

const ExperienceForm = ({ role }) => {
  const options = [
    { label: "Yes, I have experience", value: true },
    { label: "No, I am doing it for the first time", value: false },
  ];

  const router = useRouter();
  const [navigating, setNavigating] = useState(false);

  const { haveExperience, setHaveExperience } = useSurveyStore(
    (state) => state,
  );

  const handleNext = () => {
    setNavigating(true);
    router.push("/survey/goal");
  };

  return (
    <div className="flex flex-col justify-center bg-white px-4">
      <Image
        src="/static/auth/handshake.svg"
        width={52}
        height={52}
        alt=""
        className="mb-6 size-[52px]"
      />
      <h1 className="mb-2 text-start text-2xl text-black">
        Tried Selling Before?
      </h1>
      <p className="mb-7 text-xl text-darkBlue/50">
        Let us know if you have had any experience in selling, no matter how big
        or small
      </p>
      <div className="mb-10 flex w-full flex-col gap-3">
        {options.map((option) => (
          <OptionButton
            key={option.label}
            setOption={setHaveExperience}
            option={option.value}
            label={option.label}
            selectedOption={haveExperience}
          />
        ))}
      </div>
      <RoundedButton
        title={navigating ? "Loading..." : "Next"}
        showIcon={!navigating}
        loading={navigating || undefined}
        onClick={handleNext}
        disabled={navigating}
      />
    </div>
  );
};

export default ExperienceForm;

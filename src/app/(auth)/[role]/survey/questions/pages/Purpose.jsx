"use client";
import { useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

const options = [
  { label: "Discover", value: "discover" },
  { label: "Increase Profit", value: "increase profit" },
  { label: "Start New Business", value: "start new business" },
  { label: "Explore", value: "explore" },
];

const Purpose = ({ setFormData, setStep, goBack }) => {
  const [selected, setSelected] = useState("");

  const handleSelect = (value) => {
    setSelected(value);
    setFormData((prev) => ({
      ...prev,
      whatBringsYouHere: value,
    }));
  };

  return (
    <div className="flex min-h-screen flex-col justify-center bg-white px-4">
      <img src="/static/auth/flag.svg" alt="" className="mb-6 h-12 w-12" />
      <h1 className="mb-2 text-start text-2xl text-black">
        What Brings You Here?
      </h1>
      <p className="mb-7 text-xl text-darkBlue/50">
        We would love to know your main goal. How do you plan on using this
        platform?
      </p>
      <div className="mb-10 flex w-full flex-col gap-3">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => handleSelect(opt.value)}
            className={`w-full rounded-lg bg-grayishWhite py-3 text-base text-battleShipGray transition ${
              selected === opt.value
                ? "border border-moonstone"
                : "border border-transparent"
            } `}
            style={{
              borderWidth: selected === opt.value ? 1 : 0,
            }}
          >
            {opt.label}
          </button>
        ))}
      </div>
      <div className="flex w-full justify-center">
        <button
          className={`flex w-full max-w-xs items-center justify-center gap-2 rounded-full bg-moonstone py-3 text-base font-medium text-white transition ${!selected ? "cursor-not-allowed opacity-50" : "hover:bg-moonstone/90"} `}
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

export default Purpose;

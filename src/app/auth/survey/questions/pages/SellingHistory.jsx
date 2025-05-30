"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const options = [
  { label: "Yes, I have experience", value: "yes" },
  { label: "No, I am doing it for the first time", value: "no" },
];

const SellingHistory = ({ setFormData, setStep, goBack }) => {
  const [selected, setSelected] = useState("");

  const handleSelect = (value) => {
    setSelected(value);
    setFormData((prev) => ({
      ...prev,
      haveProductToSell: value,
    }));
  };

  return (
    <div className="flex min-h-screen flex-col justify-center bg-white px-4">
      <img src="/auth/handshake.svg" alt="" className="mb-6 h-12 w-12" />
      <h1 className="mb-2 text-start text-2xl text-black">
        Tried Selling Before?
      </h1>
      <p className="mb-7 text-xl text-darkBlue/50">
        Let us know if you have had any experience in selling, no matter how big
        or small
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
      <button className="flex items-center rounded-full text-xs mr-2 bg-grayishWhite p-2" onClick={goBack}>
          <ChevronLeft />
          Go Back
        </button>
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

export default SellingHistory;

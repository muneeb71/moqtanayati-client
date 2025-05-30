"use client";

import { cn } from "@/lib/utils";

const OptionButton = ({ setOption, option, label, selectedOption }) => {
  return (
    <button
      type="button"
      onClick={() => setOption(option)}
      className={cn(
        "w-full rounded-lg bg-grayishWhite px-4 py-4 text-start text-base text-battleShipGray transition",
        selectedOption === option
          ? "border border-moonstone"
          : "border border-transparent",
      )}
      style={{
        borderWidth: selectedOption === option ? 1 : 0,
      }}
    >
      {label}
    </button>
  );
};

export default OptionButton;

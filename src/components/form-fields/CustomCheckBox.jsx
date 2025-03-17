"use client";

import { cn } from "@/lib/utils";

const CustomCheckBox = ({ checked = false, setChecked = () => {} }) => {
  return (
    <div
      className="grid size-5 md:size-6 cursor-pointer place-items-center rounded-[4.8px] border border-moonstone/10 bg-moonstone/5 hover:border-moonstone"
      onClick={() => setChecked(!checked)}
    >
      <div
        className={cn(
          "grid size-5 md:size-6 place-items-center rounded-[4.8px] transition-all duration-200 ease-in",
          checked ? "bg-moonstone/50" : "bg-moonstone/0",
        )}
      >
        <svg
          width="12"
          height="10"
          viewBox="0 0 12 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={cn(
            checked ? "h-2.5 w-3" : "h-0 w-0",
            "transition-all duration-200 ease-in",
          )}
        >
          <path
            d="M11.8125 2.11563L10.3688 0.671875L4.2 6.83828L1.63125 4.27188L0.1875 5.71563L4.2 9.72813L11.8125 2.11563Z"
            fill="white"
          />
        </svg>
      </div>
    </div>
  );
};

export default CustomCheckBox;

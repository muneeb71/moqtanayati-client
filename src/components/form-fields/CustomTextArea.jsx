"use client";

import { cn } from "@/lib/utils";

const TextareaField = ({ icon, className = "", ...props }) => {
  return (
    <div className="flex items-start gap-2.5 rounded-[9.6px] border border-[#F8F7FB] bg-[#F8F7FB] px-3 py-3 has-[:focus]:border-moonstone md:px-5">
      {icon}
      <textarea
        className={cn(
          "w-full resize-none bg-transparent text-[16.8px] outline-none placeholder:text-[#858699]",
          className,
        )}
        {...props}
      />
    </div>
  );
};

export default TextareaField;

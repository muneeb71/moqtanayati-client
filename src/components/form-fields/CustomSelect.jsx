"use client";

import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CustomSelect = ({
  options = [],
  icon,
  className = "",
  placeholder = "Select",
  selectedOption,
  setSelectedOption,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onChange) onChange(option);
  };

  return (
    <div className="relative w-full">
      <div
        className={cn(
          "flex cursor-pointer items-center justify-between gap-2.5 rounded-[9.6px] border border-[#F8F7FB] bg-[#F8F7FB] px-3 py-3 has-[:focus]:border-moonstone md:h-[60px] md:px-5",
          className,
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2.5">
          {icon}
          <span className={cn("text-[16.8px]", !selectedOption && "text-[#858699]")}>
            {selectedOption || placeholder}
          </span>
        </div>
        <div className="text-moonstone">
          {isOpen ? (
            <ChevronUp className="size-6" />
          ) : (
            <ChevronDown className="size-6" />
          )}
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 top-full z-[101] mt-2 w-full rounded-[9.6px] border border-[#F8F7FB] bg-[#F8F7FB] shadow-md"
          >
            <div className="max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
              {options.map((option, index) => (
                <div
                  key={index}
                  className="cursor-pointer px-5 py-3 text-[16.8px] hover:bg-gray-200"
                  onClick={() => handleSelect(option)}
                >
                  {option}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomSelect;

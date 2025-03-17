"use client";

import { cn } from "@/lib/utils";
import { Eye, EyeClosed } from "lucide-react";
import React, { useState } from "react";


const InputField = ({
  icon,
  className = "",
  iconClassName,
  type = "text",
  placeholder = "",
  customIcon = false,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="flex items-center gap-2.5 rounded-[9.6px] border border-[#F8F7FB] bg-[#F8F7FB] px-3 py-3 has-[:focus]:border-moonstone md:h-[60px] md:px-5">
      {icon && React.cloneElement(icon, { className: iconClassName })}
      <input
        className={cn(
          "w-full bg-transparent text-[16.8px] outline-none placeholder:text-[#858699]",
          className,
        )}
        type={type === "password" ? (showPassword ? "text" : type) : type}
        placeholder={placeholder}
        {...props}
      />
      {type == "password" && (
        <div
          onClick={() => setShowPassword(!showPassword)}
          className="cursor-pointer text-moonstone"
        >
          {showPassword ? (
            <Eye className="size-6" />
          ) : (
            <EyeClosed className="size-6" />
          )}
        </div>
      )}
    </div>
  );
};

export default InputField;

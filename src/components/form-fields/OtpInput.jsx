"use client";

import { useState } from "react";

const OtpInput = ({ value = ["", "", "", "", "", ""], onChange }) => {
  const handleOtpChange = (e, index) => {
    const val = e.target.value;
    if (/^\d$/.test(val) || val === "") {
      if (onChange) onChange(val, index);
      if (val && index < value.length - 1) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleFocus = (e, index) => {
    if (e.key === "Backspace" && value[index] === "") {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };
  return (
    <div className="flex items-center gap-2">
      {value.map((digit, index) => (
        <input
          key={index}
          id={`otp-${index}`}
          type="text"
          maxLength="1"
          value={digit}
          onChange={(e) => handleOtpChange(e, index)}
          onKeyDown={(e) => handleFocus(e, index)}
          className="size-[50px] md:size-[65px] rounded-md bg-[#F8F7FB] text-center text-[29px] leading-[29px] text-delftBlue focus:outline-moonstone"
        />
      ))}
    </div>
  );
};

export default OtpInput;

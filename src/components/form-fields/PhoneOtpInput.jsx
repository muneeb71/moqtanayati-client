"use client";

const PhoneOtpInput = ({ otp, setOtp }) => {
  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (/^\d$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < otp.length - 1) {
        const nextInput = document.getElementById(`phone-otp-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };
  const handleFocus = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "") {
      const prevInput = document.getElementById(`phone-otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };
  return (
    <div className="flex items-center gap-2">
      {otp.map((digit, index) => (
        <input
          key={index}
          id={`phone-otp-${index}`}
          type="text"
          maxLength="1"
          value={digit}
          onChange={(e) => handleOtpChange(e, index)}
          onKeyDown={(e) => handleFocus(e, index)}
          className="size-[35px] md:size-[60px] rounded-md bg-[#F8F7FB] text-center text-[23px] leading-[23px] text-delftBlue focus:outline-moonstone"
        />
      ))}
    </div>
  );
};

export default PhoneOtpInput; 
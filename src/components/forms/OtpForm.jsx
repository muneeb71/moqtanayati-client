"use client";

import RoundedButton from "@/components/buttons/RoundedButton";
import Label from "@/components/form-fields/Label";
import OtpInput from "@/components/form-fields/OtpInput";
import CustomLink from "@/components/link/CustomLink";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { verifyForgotOtp, forgotPassword } from "@/lib/api/auth/forgotPassword";
import toast from "react-hot-toast";

const OtpForm = ({ role }) => {
  const searchParams = useSearchParams();
  const emailOrPhone = searchParams.get("emailOrPhone");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const otpValue = otp.join("");
      const isEmail = emailOrPhone.includes("@");
      await verifyForgotOtp(
        isEmail
          ? { email: emailOrPhone, otp: otpValue }
          : { phone: emailOrPhone, otp: otpValue },
      );
      router.push(
        `/${role}/login/forget-password/new-password?emailOrPhone=${encodeURIComponent(emailOrPhone)}`,
      );
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to verify OTP.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="flex w-full flex-col gap-10 pt-20 md:gap-[66px] md:pt-10 lg:pt-0"
      onSubmit={handleSubmit}
    >
      <div className="flex w-full flex-col gap-16">
        <div className="flex w-full flex-col gap-2">
          <h1 className="text-xl md:text-[33px] md:leading-[50px]">
            Verification Required
          </h1>
          <p className="text-darkBlue/50 md:text-[19px] md:leading-[29px]">
            We've sent a password reset OTP to{" "}
            <span className="text-delftBlue">{emailOrPhone}</span>
          </p>
        </div>
        <div className="flex flex-col gap-2 self-center">
          <Label
            text="Enter OTP"
            className="ml-7 text-[19px] text-eerieBlack"
          />
          <OtpInput value={otp} onChange={handleOtpChange} />
        </div>
        {error && <span className="self-center text-red-500">{error}</span>}
        <div className="flex flex-col items-center gap-5 self-center">
          <RoundedButton
            title={loading ? "Verifying..." : "Verify Code"}
            showIcon
            className="w-fit self-center px-16"
            type="submit"
            disabled={loading}
          />
          <div className="flex items-center gap-1 text-sm font-medium text-battleShipGray">
            Didn't receive the code?
            <button
              type="button"
              onClick={async () => {
                if (resending) return;
                setResending(true);
                setError("");
                try {
                  const isEmail = emailOrPhone.includes("@");
                  const res = await forgotPassword(
                    isEmail ? { email: emailOrPhone } : { phone: emailOrPhone }
                  );
                  if (res.success) {
                    toast.success("OTP resent successfully");
                    // Pre-fill OTP if available (for email in development)
                    if (res.otp && res.otp.length === 6) {
                      const otpArray = res.otp.split("");
                      setOtp(otpArray);
                    }
                  } else {
                    toast.error(res.message || "Failed to resend OTP");
                  }
                } catch (err) {
                  toast.error("Failed to resend OTP");
                } finally {
                  setResending(false);
                }
              }}
              disabled={resending}
              className="text-moonstone underline disabled:opacity-50"
            >
              {resending ? "Sending..." : "Resend OTP"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default OtpForm;

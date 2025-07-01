"use client";
import RoundedButton from "@/components/buttons/RoundedButton";
import Label from "@/components/form-fields/Label";
import PhoneOtpInput from "@/components/form-fields/PhoneOtpInput";
import CustomLink from "@/components/link/CustomLink";
import { sendPhoneOtp, verifyPhoneOtp } from "@/lib/api/auth/phone-verification";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const PhoneOtpForm = () => {
  const searchParams = useSearchParams();
  const phone = searchParams.get("phone");
  const role = searchParams.get("role") || "buyer";
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [verifying, setVerifying] = useState(false);
  const [sending, setSending] = useState(false);

  // Send OTP on mount
  useEffect(() => {
    const sendOtp = async () => {
      setSending(true);
      try {
        const res = await sendPhoneOtp({ phone });
        if (res.success) {
          toast.success("OTP sent to your phone.");
        } else {
          toast.error(res.error || "Failed to send OTP.");
        }
      } catch (e) {
        toast.error("Failed to send OTP.");
      }
      setSending(false);
    };
    if (phone) sendOtp();
  }, [phone]);

  const handleVerifyOtp = async () => {
    const otpValue = otp.join("");
    if (otpValue.length !== 6) {
      toast.error("Please enter the 6-digit OTP.");
      return;
    }
    setVerifying(true);
    try {
      const res = await verifyPhoneOtp({ phone, otp: otpValue });
      if (res.success) {
        toast.success("Phone verified!");
        router.push(`/auth/${role}/sign-up/id-proof`);
      } else {
        toast.error(res.error || "Invalid OTP.");
      }
    } catch (e) {
      toast.error("Failed to verify OTP.");
    }
    setVerifying(false);
  };

  const handleResend = async () => {
    setSending(true);
    try {
      const res = await sendPhoneOtp({ phone });
      if (res.success) {
        toast.success("OTP resent to your phone.");
      } else {
        toast.error(res.error || "Failed to resend OTP.");
      }
    } catch (e) {
      toast.error("Failed to resend OTP.");
    }
    setSending(false);
  };

  return (
    <div className="flex w-full flex-col gap-10 pt-20 md:gap-[66px] md:pt-10 lg:pt-0">
      <div className="flex w-full flex-col gap-16">
        <div className="flex w-full flex-col gap-2">
          <h1 className="text-2xl mt-20">Verify Your Phone Number</h1>
          <p className="text-darkBlue/50 md:text-[19px] md:leading-[29px]">
            We've sent a 6-digit verification code to your phone: {" "}
            <span className="text-delftBlue">{phone}</span>. Enter the code below to verify your phone and continue.
          </p>
        </div>
        <div className="flex flex-col gap-2 self-center">
          <Label text="Enter 6-digit Code" className="text-[19px] text-eerieBlack" />
          <PhoneOtpInput otp={otp} setOtp={setOtp} />
        </div>
        <div className="flex flex-col items-center gap-5 self-center">
          <RoundedButton
            title={verifying ? "Verifying..." : "Verify & Continue"}
            showIcon
            className="w-fit self-center px-16"
            onClick={handleVerifyOtp}
            disabled={verifying || otp.join("").length !== 6}
            loading={verifying.toString()}
          />
          <div className="flex items-center gap-1 text-sm font-medium text-battleShipGray">
            Didn't receive the code?
            <button className="text-moonstone underline" onClick={handleResend} disabled={sending}>
              Resend OTP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneOtpForm; 
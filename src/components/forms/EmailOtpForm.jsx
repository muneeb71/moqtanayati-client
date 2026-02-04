"use client";

import RoundedButton from "@/components/buttons/RoundedButton";
import Label from "@/components/form-fields/Label";
import EmailOtpInput from "@/components/form-fields/EmailOtpInput";
import PhoneOtpInput from "@/components/form-fields/PhoneOtpInput";
import InputField from "@/components/form-fields/InputField";
import { profilePhoneIcon } from "@/assets/icons/profile-icons";
import { envelopeIcon } from "@/assets/icons/input-icons";
import CustomLink from "@/components/link/CustomLink";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState, useEffect } from "react";
import { sendOtp, verifyOtp } from "@/lib/api/auth/otp";
import toast from "react-hot-toast";

const EmailOtpContent = ({ role }) => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const phoneParam = searchParams.get("phone");
  const router = useRouter();
  const [otpMethod, setOtpMethod] = useState(phoneParam ? "phone" : "email");
  const [phone, setPhone] = useState(phoneParam || "");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [verifying, setVerifying] = useState(false);
  const [sending, setSending] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const handleSendOtp = async () => {
    if (otpMethod === "phone" && !phone) {
      toast.error("Please enter your phone number");
      return;
    }
    setSending(true);
    try {
      const res = otpMethod === "phone" 
        ? await sendOtp({ phone })
        : await sendOtp({ email });
      if (res.success) {
        toast.success("OTP sent successfully");
        setOtpSent(true);
      } else {
        toast.error(res.message || "Failed to send OTP");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to send OTP");
    } finally {
      setSending(false);
    }
  };

  const handleVerifyOtp = async () => {
    const otpValue = otp.join("");
    if (otpValue.length !== 6) {
      toast.error("Please enter the 6-digit OTP");
      return;
    }
    setVerifying(true);
    try {
      const res = otpMethod === "phone"
        ? await verifyOtp({ phone, otp: otpValue })
        : await verifyOtp({ email, otp: otpValue });
      if (res.success) {
        toast.success(res.message || "Verified successfully!");
        router.push(`/sign-up/id-proof`);
      } else {
        toast.error(res.message || "Invalid OTP");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to verify OTP");
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="flex w-full flex-col gap-10 pt-20 md:gap-[66px] md:pt-10 lg:pt-0">
      <div className="flex w-full flex-col gap-16">
        <div className="flex w-full flex-col gap-2">
          <h1 className="text-2xl mt-20">
            {otpMethod === "phone" ? "Verify Your Phone Number" : "Verify Your Email Address"}
          </h1>
          <p className="text-darkBlue/50 md:text-[19px] md:leading-[29px]">
            {otpMethod === "phone" ? (
              <>
                We've sent a 6-digit verification code to your phone:{" "}
                <span className="text-delftBlue">{phone || "your phone number"}</span>. Enter the code below to verify and continue.
              </>
            ) : (
              <>
                We've sent a 6-digit verification code to your email:{" "}
                <span className="text-delftBlue">{email}</span>. Enter the code below to verify your email and continue.
              </>
            )}
          </p>
        </div>

        <div className="flex flex-col gap-4 self-center w-full max-w-md">
          <div className="flex gap-2 mb-2">
            <button
              type="button"
              onClick={() => {
                setOtpMethod("email");
                setOtpSent(false);
                setOtp(["", "", "", "", "", ""]);
              }}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                otpMethod === "email"
                  ? "bg-moonstone text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Email
            </button>
            <button
              type="button"
              onClick={() => {
                setOtpMethod("phone");
                setOtpSent(false);
                setOtp(["", "", "", "", "", ""]);
              }}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                otpMethod === "phone"
                  ? "bg-moonstone text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Phone
            </button>
          </div>

          {otpMethod === "phone" && !otpSent && (
            <div className="flex w-full flex-col">
              <Label htmlFor="phone" text="Phone Number" />
              <InputField
                icon={profilePhoneIcon}
                type="tel"
                placeholder="Enter your phone number (e.g., +966501234567)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          )}

          {otpSent || otpMethod === "email" ? (
            <>
              <div className="flex flex-col gap-2 self-center">
                <Label text="Enter 6-digit Code" className="text-[19px] text-eerieBlack" />
                {otpMethod === "phone" ? (
                  <PhoneOtpInput otp={otp} setOtp={setOtp} />
                ) : (
                  <EmailOtpInput otp={otp} setOtp={setOtp} />
                )}
              </div>
            </>
          ) : null}
        </div>

        <div className="flex flex-col items-center gap-5 self-center">
          {!otpSent && otpMethod === "phone" ? (
            <RoundedButton
              title={sending ? "Sending..." : "Send OTP"}
              showIcon
              className="w-fit self-center px-16"
              onClick={handleSendOtp}
              disabled={sending || !phone}
              loading={sending || undefined}
            />
          ) : (
            <RoundedButton
              title={verifying ? "Verifying..." : "Verify & Continue"}
              showIcon
              className="w-fit self-center px-16"
              onClick={handleVerifyOtp}
              disabled={verifying || otp.join("").length !== 6}
              loading={verifying || undefined}
            />
          )}
          <div className="flex items-center gap-1 text-sm font-medium text-battleShipGray">
            Didn't receive the code?
            {otpSent || otpMethod === "email" ? (
              <button
                className="text-moonstone underline"
                onClick={handleSendOtp}
                disabled={sending}
              >
                {sending ? "Sending..." : "Resend OTP"}
              </button>
            ) : (
              <CustomLink href="/sign-up">Resend OTP</CustomLink>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const EmailOtpForm = (props) => (
  <Suspense fallback={<div>Loading...</div>}>
    <EmailOtpContent {...props} />
  </Suspense>
);

export default EmailOtpForm;
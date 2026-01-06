"use client";
import RoundedButton from "@/components/buttons/RoundedButton";
import Label from "@/components/form-fields/Label";
import EmailOtpInput from "@/components/form-fields/EmailOtpInput";
import PhoneOtpInput from "@/components/form-fields/PhoneOtpInput";
import InputField from "@/components/form-fields/InputField";
import { profilePhoneIcon } from "@/assets/icons/profile-icons";
import CustomLink from "@/components/link/CustomLink";
import { sendOtp, verifyOtp } from "@/lib/api/auth/otp";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import useTranslation from "@/hooks/useTranslation";

const EmailOtpForm = () => {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const role = searchParams.get("role") || "buyer";
  const name = searchParams.get("name") || "";
  const phoneParam = searchParams.get("phone") || "";
  const otpFromUrl = searchParams.get("otp");
  const router = useRouter();
  const [otpMethod, setOtpMethod] = useState(phoneParam ? "phone" : "email");
  const [phone, setPhone] = useState(phoneParam);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [verifying, setVerifying] = useState(false);
  const [sending, setSending] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  // // Send OTP on mount
  // const sendOtp = async () => {
  //   setSending(true);
  //   try {
  //     const res = await sendEmailOtp({ email });
  //     if (res.success) {
  //       toast.success("OTP sent to your email.");
  //     }
  //   } catch (e) {
  //     toast.error("Failed to send OTP.");
  //   }
  //   setSending(false);
  // };

  useEffect(() => {
    if (otpFromUrl && otpFromUrl.length === 6) {
      const otpArray = otpFromUrl.split("");
      setOtp(otpArray);
    }
  }, [otpFromUrl]);

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
        toast.success(res.message || "OTP sent successfully");
        setOtpSent(true);
        if (res.otp && res.otp.length === 6) {
          const otpArray = res.otp.split("");
          setOtp(otpArray);
        }
      } else {
        toast.error(res.message || "Failed to send OTP");
      }
    } catch (e) {
      toast.error(e?.response?.data?.message || "Failed to send OTP");
    } finally {
      setSending(false);
    }
  };

  const handleVerifyOtp = async () => {
    const otpValue = otp.join("");
    if (otpValue.length !== 6) {
      toast.error("Please enter the 6-digit OTP.");
      return;
    }
    setVerifying(true);
    try {
      const res = otpMethod === "phone"
        ? await verifyOtp({ phone, otp: otpValue })
        : await verifyOtp({ email, otp: otpValue });
      if (res.success) {
        toast.success(res.message || (otpMethod === "phone" ? "Phone verified!" : "Email verified!"));
        const qs = new URLSearchParams({
          role,
        });
        if (otpMethod === "phone") {
          qs.set("phoneVerified", "true");
          qs.set("phone", phone);
        } else {
          qs.set("emailVerified", "true");
          qs.set("email", email);
        }
        if (name) qs.set("name", name);
        if (otpMethod === "phone" && email) qs.set("email", email);
        if (otpMethod === "email" && phoneParam) qs.set("phone", phoneParam);
        router.push(`/${role}/sign-up?${qs.toString()}`);
      } else {
        toast.error(res.message || "Invalid OTP.");
      }
    } catch (e) {
      toast.error(e?.response?.data?.message || "Failed to verify OTP.");
    }
    setVerifying(false);
  };

  const handleResend = async () => {
    setSending(true);
    try {
      const res = otpMethod === "phone"
        ? await sendOtp({ phone })
        : await sendOtp({ email });
      if (res.success) {
        toast.success(res.message || (otpMethod === "phone" ? "OTP resent to your phone." : "OTP resent to your email."));
        if (res.otp && res.otp.length === 6) {
          const otpArray = res.otp.split("");
          setOtp(otpArray);
        }
      } else {
        toast.error(res.message || "Failed to resend OTP.");
      }
    } catch (e) {
      toast.error(e?.response?.data?.message || "Failed to resend OTP.");
    }
    setSending(false);
  };

  return (
    <div className="flex w-full flex-col gap-10 pt-20 md:gap-[66px] md:pt-10 lg:pt-0">
      <div className="flex w-full flex-col gap-16">
        <div className="flex w-full flex-col gap-2">
          <h1 className="mt-20 text-2xl">
            {otpMethod === "phone" ? t("phone_otp.title") || "Verify Your Phone Number" : t("email_otp.title")}
          </h1>
          <p className="text-darkBlue/50 md:text-[19px] md:leading-[29px]">
            {otpMethod === "phone" ? (
              <>
                {t("phone_otp.subtitle_prefix") || "We've sent a password reset OTP to"}{" "}
                <span className="text-delftBlue">{phone || "your phone number"}</span>.{" "}
                {t("phone_otp.subtitle_suffix") || "Enter the code below to verify and continue."}
              </>
            ) : (
              <>
                {t("email_otp.subtitle_prefix")}{" "}
                <span className="text-delftBlue">{email}</span>.{" "}
                {t("email_otp.subtitle_suffix")}
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

          {(otpSent || otpMethod === "email") && (
            <div className="flex flex-col gap-2 self-center">
              <Label
                text={otpMethod === "phone" ? (t("phone_otp.enter_code") || "Enter 6-digit Code") : t("email_otp.enter_code")}
                className="text-[19px] text-eerieBlack"
              />
              {otpMethod === "phone" ? (
                <PhoneOtpInput otp={otp} setOtp={setOtp} />
              ) : (
                <EmailOtpInput otp={otp} setOtp={setOtp} />
              )}
            </div>
          )}
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
              title={
                verifying
                  ? (otpMethod === "phone" ? (t("phone_otp.verifying") || "Verifying...") : t("email_otp.verifying"))
                  : (otpMethod === "phone" ? (t("phone_otp.verify_continue") || "Verify & Continue") : t("email_otp.verify_continue"))
              }
              showIcon
              className="w-fit self-center px-16"
              onClick={handleVerifyOtp}
              disabled={verifying || otp.join("").length !== 6}
              loading={verifying || undefined}
            />
          )}
          <div className="flex items-center gap-1 text-sm font-medium text-battleShipGray">
            {otpMethod === "phone" ? (t("phone_otp.no_code") || "Didn't receive the code?") : t("email_otp.no_code")}
            <button
              className="text-moonstone underline"
              onClick={handleResend}
              disabled={sending}
            >
              {otpMethod === "phone" ? (t("phone_otp.resend") || "Resend") : t("email_otp.resend")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailOtpForm;

"use client";
import RoundedButton from "@/components/buttons/RoundedButton";
import Label from "@/components/form-fields/Label";
import EmailOtpInput from "@/components/form-fields/EmailOtpInput";
import CustomLink from "@/components/link/CustomLink";
import {
  sendEmailOtp,
  verifyEmailOtp,
} from "@/lib/api/auth/email-verification";
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
  const phone = searchParams.get("phone") || "";
  const otpFromUrl = searchParams.get("otp");
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [verifying, setVerifying] = useState(false);
  const [sending, setSending] = useState(false);

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

  // Pre-fill OTP if it's provided in the URL
  useEffect(() => {
    if (otpFromUrl && otpFromUrl.length === 6) {
      const otpArray = otpFromUrl.split("").map((digit) => digit);
      setOtp(otpArray);
      console.log("Pre-filled OTP from URL:", otpFromUrl);
    }
  }, [otpFromUrl]);

  const handleVerifyOtp = async () => {
    const otpValue = otp.join("");
    if (otpValue.length !== 6) {
      toast.error("Please enter the 6-digit OTP.");
      return;
    }
    setVerifying(true);
    try {
      console.log("otp : ", email, otpValue);
      const res = await verifyEmailOtp({ email, otp: otpValue });
      if (res.success) {
        toast.success("Email verified!");
        const qs = new URLSearchParams({
          emailVerified: "true",
          email,
          role,
        });
        if (name) qs.set("name", name);
        if (phone) qs.set("phone", phone);
        router.push(`/${role}/sign-up?${qs.toString()}`);
      } else {
        toast.error("Invalid OTP.");
      }
    } catch (e) {
      toast.error("Failed to verify OTP.");
    }
    setVerifying(false);
  };

  const handleResend = async () => {
    setSending(true);
    try {
      const res = await sendEmailOtp({ email });
      console.log("res 0 : ", res);

      if (res.success) {
        toast.success("OTP resent to your email.");

        // Pre-fill the new OTP if it's available in the response
        if (res.data?.otp && res.data.otp.length === 6) {
          const otpArray = res.data.otp.split("").map((digit) => digit);
          setOtp(otpArray);
          console.log("Pre-filled new OTP from resend:", res.data.otp);
        }
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
          <h1 className="mt-20 text-2xl">{t("email_otp.title")}</h1>
          <p className="text-darkBlue/50 md:text-[19px] md:leading-[29px]">
            {t("email_otp.subtitle_prefix")}{" "}
            <span className="text-delftBlue">{email}</span>.{" "}
            {t("email_otp.subtitle_suffix")}
          </p>
        </div>
        <div className="flex flex-col gap-2 self-center">
          <Label
            text={t("email_otp.enter_code")}
            className="text-[19px] text-eerieBlack"
          />
          <EmailOtpInput otp={otp} setOtp={setOtp} />
        </div>
        <div className="flex flex-col items-center gap-5 self-center">
          <RoundedButton
            title={
              verifying
                ? t("email_otp.verifying")
                : t("email_otp.verify_continue")
            }
            showIcon
            className="w-fit self-center px-16"
            onClick={handleVerifyOtp}
            disabled={verifying || otp.join("").length !== 6}
            loading={verifying || undefined}
          />
          <div className="flex items-center gap-1 text-sm font-medium text-battleShipGray">
            {t("email_otp.no_code")}
            <button
              className="text-moonstone underline"
              onClick={handleResend}
              disabled={sending}
            >
              {t("email_otp.resend")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailOtpForm;

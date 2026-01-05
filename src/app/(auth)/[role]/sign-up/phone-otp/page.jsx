"use client";
import RoundedButton from "@/components/buttons/RoundedButton";
import Label from "@/components/form-fields/Label";
import PhoneOtpInput from "@/components/form-fields/PhoneOtpInput";
import CustomLink from "@/components/link/CustomLink";
import { sendOtp, verifyOtp } from "@/lib/api/auth/otp";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import useTranslation from "@/hooks/useTranslation";

const PhoneOtpForm = () => {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const phone = searchParams.get("phone");
  const role = searchParams.get("role") || "buyer";
  const email = searchParams.get("email") || "";
  const emailVerified = searchParams.get("emailVerified") === "true";
  const otpFromUrl = searchParams.get("otp");
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [verifying, setVerifying] = useState(false);
  const [sending, setSending] = useState(false);

  // Pre-fill OTP if it's provided in the URL
  useEffect(() => {
    if (otpFromUrl && otpFromUrl.length === 6) {
      const otpArray = otpFromUrl.split("");
      setOtp(otpArray);
    }
  }, [otpFromUrl]);

  useEffect(() => {
    const sendOtpToPhone = async () => {
      setSending(true);
      try {
        const res = await sendOtp({ phone });
        if (res.success) {
          toast.success(res.message || t("phone_otp.sent"));
          if (res.otp && res.otp.length === 6) {
            const otpArray = res.otp.split("");
            setOtp(otpArray);
          }
        } else {
          toast.error(res.message || t("phone_otp.send_failed"));
        }
      } catch (e) {
        toast.error(e?.response?.data?.message || t("phone_otp.send_failed"));
      }
      setSending(false);
    };
    if (phone && !otpFromUrl) sendOtpToPhone();
  }, [phone, otpFromUrl, t]);

  const handleVerifyOtp = async () => {
    const otpValue = otp.join("");
    if (otpValue.length !== 6) {
      toast.error(t("phone_otp.enter_six_digit"));
      return;
    }
    setVerifying(true);
    try {
      const res = await verifyOtp({ phone, otp: otpValue });
      if (res.success) {
        toast.success(res.message || t("phone_otp.verified"));
        const qs = new URLSearchParams({
          role,
          phoneVerified: "true",
          phone,
        });
        if (emailVerified) {
          qs.set("emailVerified", "true");
        }
        if (email) {
          qs.set("email", email);
        }
        router.push(`/${role}/sign-up?${qs.toString()}`);
      } else {
        toast.error(res.message || t("phone_otp.invalid"));
      }
    } catch (e) {
      toast.error(e?.response?.data?.message || t("phone_otp.verify_failed"));
    }
    setVerifying(false);
  };

  const handleResend = async () => {
    setSending(true);
    try {
      const res = await sendOtp({ phone });
      if (res.success) {
        toast.success(res.message || t("phone_otp.resent"));
        if (res.otp && res.otp.length === 6) {
          const otpArray = res.otp.split("");
          setOtp(otpArray);
        }
      } else {
        toast.error(res.message || t("phone_otp.resend_failed"));
      }
    } catch (e) {
      toast.error(e?.response?.data?.message || t("phone_otp.resend_failed"));
    }
    setSending(false);
  };

  return (
    <div className="flex w-full flex-col gap-10 pt-20 md:gap-[66px] md:pt-10 lg:pt-0">
      <div className="flex w-full flex-col gap-16">
        <div className="flex w-full flex-col gap-2">
          <h1 className="mt-20 text-2xl">{t("phone_otp.title")}</h1>
          <p className="text-darkBlue/50 md:text-[19px] md:leading-[29px]">
            {t("phone_otp.subtitle_prefix")}{" "}
            <span className="text-delftBlue">{phone}</span>.{" "}
            {t("phone_otp.subtitle_suffix")}
          </p>
        </div>
        <div className="flex flex-col gap-2 self-center">
          <Label
            text={t("phone_otp.enter_code")}
            className="text-[19px] text-eerieBlack"
          />
          <PhoneOtpInput otp={otp} setOtp={setOtp} />
        </div>
        <div className="flex flex-col items-center gap-5 self-center">
          <RoundedButton
            title={
              verifying
                ? t("phone_otp.verifying")
                : t("phone_otp.verify_continue")
            }
            showIcon
            className="w-fit self-center px-16"
            onClick={handleVerifyOtp}
            disabled={verifying || otp.join("").length !== 6}
            loading={verifying || undefined}
          />
          <div className="flex items-center gap-1 text-sm font-medium text-battleShipGray">
            {t("phone_otp.no_code")}
            <button
              className="text-moonstone underline"
              onClick={handleResend}
              disabled={sending}
            >
              {t("phone_otp.resend")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneOtpForm;

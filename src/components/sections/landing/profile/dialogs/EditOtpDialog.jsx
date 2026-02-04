"use client";

import { useState } from "react";
import RoundedButton from "@/components/buttons/RoundedButton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import OtpInput from "@/components/form-fields/OtpInput";
import PhoneOtpInput from "@/components/form-fields/PhoneOtpInput";
import EmailOtpInput from "@/components/form-fields/EmailOtpInput";
import InputField from "@/components/form-fields/InputField";
import { profilePhoneIcon } from "@/assets/icons/profile-icons";
import Label from "@/components/form-fields/Label";
import useTranslation from "@/hooks/useTranslation";
import { sendOtp, verifyOtp } from "@/lib/api/auth/otp";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";

const EditOtpDialog = ({ onVerify, email: propEmail, phone: propPhone }) => {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const emailFromParams = searchParams.get("email") || propEmail || "";
  const phoneFromParams = searchParams.get("phone") || propPhone || "";
  
  const [otpMethod, setOtpMethod] = useState(phoneFromParams ? "phone" : "email");
  const [phone, setPhone] = useState(phoneFromParams);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [verifying, setVerifying] = useState(false);
  const [sending, setSending] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSendOtp = async () => {
    if (otpMethod === "phone" && !phone) {
      toast.error("Please enter your phone number");
      return;
    }
    setSending(true);
    try {
      const res = otpMethod === "phone"
        ? await sendOtp({ phone })
        : await sendOtp({ email: emailFromParams });
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
        : await verifyOtp({ email: emailFromParams, otp: otpValue });
      if (res.success) {
        toast.success(res.message || "OTP verified successfully!");
        if (onVerify) {
          onVerify();
        }
        setOpen(false);
        setOtp(["", "", "", "", "", ""]);
        setOtpSent(false);
      } else {
        toast.error(res.message || "Invalid OTP");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to verify OTP");
    } finally {
      setVerifying(false);
    }
  };

  const handleResend = async () => {
    await handleSendOtp();
  };

  const handleOpenChange = (isOpen) => {
    setOpen(isOpen);
    if (!isOpen) {
      setOtp(["", "", "", "", "", ""]);
      setOtpSent(false);
      setPhone(phoneFromParams);
      setOtpMethod(phoneFromParams ? "phone" : "email");
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger className="flex h-[64px] w-[80%] min-w-fit items-center justify-center gap-3 text-nowrap rounded-full bg-moonstone px-8 text-lg font-medium text-white transition-all duration-200 ease-in hover:bg-delftBlue disabled:bg-battleShipGray">
        {t("buyer.profile.settings.otp.trigger_save")}
      </DialogTrigger>
      <DialogContent className="max-w-[350px] rounded-[24px] sm:max-w-[471px] sm:rounded-[24px]">
        <DialogHeader>
          <DialogTitle className="border-b-[1.2px] border-[#F0F1F4] pb-4 text-center text-[21.6px] font-medium">
            {t("buyer.profile.settings.otp.title")}
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-10 py-5">
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-2xl text-darkBlue md:text-[33.6px] md:leading-[50.4px]">
              {t("buyer.profile.settings.otp.heading")}
            </h1>
            <span className="max-w-[399px] text-center text-xs md:text-[14.4px] md:leading-[29px]">
              {t("buyer.profile.settings.otp.sub")}
            </span>
          </div>

          <div className="flex flex-col gap-4 w-full max-w-sm">
            <div className="flex gap-2 justify-center">
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
              <div className="flex flex-col items-center gap-3">
                <Label
                  text={t("buyer.profile.settings.otp.enter_otp_label")}
                  className="text-[19.2px]"
                />
                {otpMethod === "phone" ? (
                  <PhoneOtpInput otp={otp} setOtp={setOtp} />
                ) : (
                  <EmailOtpInput otp={otp} setOtp={setOtp} />
                )}
              </div>
            )}
          </div>

          <div className="flex flex-col items-center gap-5">
            {!otpSent && otpMethod === "phone" ? (
              <RoundedButton
                title={sending ? "Sending..." : "Send OTP"}
                onClick={handleSendOtp}
                disabled={sending || !phone}
                loading={sending || undefined}
              />
            ) : (
              <RoundedButton
                title={verifying ? "Verifying..." : t("buyer.profile.settings.otp.verify_save")}
                onClick={handleVerifyOtp}
                disabled={verifying || otp.join("").length !== 6}
                loading={verifying || undefined}
              />
            )}
            <button
              type="button"
              onClick={handleResend}
              disabled={sending}
              className="text-sm font-medium text-moonstone underline disabled:opacity-50"
            >
              {t("buyer.profile.settings.otp.resend_otp")}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditOtpDialog;

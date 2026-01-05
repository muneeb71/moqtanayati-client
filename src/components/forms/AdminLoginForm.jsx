"use client";

import { envelopeIcon, lockIcon } from "@/assets/icons/input-icons";
import { profilePhoneIcon } from "@/assets/icons/profile-icons";
import CustomCheckBox from "@/components/form-fields/CustomCheckBox";
import InputField from "@/components/form-fields/InputField";
import Label from "@/components/form-fields/Label";
import OtpInput from "@/components/form-fields/OtpInput";
import CustomLink from "@/components/link/CustomLink";
import { useState } from "react";
import RoundedButton from "../buttons/RoundedButton";
import { useRouter } from "next/navigation";
import { loginUser } from "@/lib/api/auth/login";
import { loginUserWithPhone } from "@/lib/api/auth/phone-login";
import { sendOtp, verifyOtp } from "@/lib/api/auth/otp";
import toast from "react-hot-toast";
import useTranslation from "@/hooks/useTranslation";

const AdminLoginForm = () => {
  const { t } = useTranslation();
  const [loginMethod, setLoginMethod] = useState("email");
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpSent, setOtpSent] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSendOtp = async () => {
    if (!phone) {
      toast.error("Please enter your phone number");
      return;
    }
    setSendingOtp(true);
    try {
      const res = await sendOtp({ phone });
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
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to send OTP");
    } finally {
      setSendingOtp(false);
    }
  };

  const handleVerifyOtpAndLogin = async () => {
    const otpValue = otp.join("");
    if (otpValue.length !== 6) {
      toast.error("Please enter the 6-digit OTP");
      return;
    }

    setVerifyingOtp(true);
    try {
      const verifyRes = await verifyOtp({ phone, otp: otpValue });
      if (verifyRes.success) {
        toast.success(verifyRes.message || "OTP verified successfully");
        const response = await loginUserWithPhone(phone, "admin", "");
        if (response.success) {
          toast.success(t("admin.login.success"));
          router.push("/admin");
        } else {
          toast.error(response.message || t("admin.login.failed"));
        }
      } else {
        toast.error(verifyRes.message || "Invalid OTP");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to verify OTP and login");
    } finally {
      setVerifyingOtp(false);
    }
  };

  const handleLogin = async () => {
    if (loginMethod === "phone") {
      if (!otpSent) {
        await handleSendOtp();
        return;
      }
      await handleVerifyOtpAndLogin();
      return;
    }

    if (!email.trim()) {
      toast.error(t("admin.login.email_required"));
      return;
    }

    if (!password.trim()) {
      toast.error(t("admin.login.password_required"));
      return;
    }

    setLoading(true);
    const res = await loginUser(email, password, "admin");
    setLoading(false);
    if (res.success) {
      toast.success(t("admin.login.success"));
      router.push("/admin");
    } else {
      toast.error(res.message || t("admin.login.failed"));
    }
  };

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  const resetOtpFlow = () => {
    setOtpSent(false);
    setOtp(["", "", "", "", "", ""]);
  };

  return (
    <div className="relative z-30 flex w-full max-w-md flex-col gap-6 rounded-3xl border-[3px] border-moonstone/20 bg-white p-5 text-darkBlue md:gap-10 md:rounded-[40px] md:p-7">
      <div className="flex flex-col gap-2">
        <h1 className="text-xl md:text-3xl">
          {t("admin.login.welcome_admin")}
        </h1>
        <p className="max-w-xs text-sm leading-tight text-darkBlue/50 md:text-lg">
          {t("admin.login.subtitle")}
        </p>
      </div>
      <div className="flex w-full flex-col gap-5">
        <div className="flex items-center gap-4 mb-2">
          <button
            type="button"
            onClick={() => {
              setLoginMethod("email");
              resetOtpFlow();
            }}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              loginMethod === "email"
                ? "bg-moonstone text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {t("admin.login.email")} / {t("admin.login.password")}
          </button>
          <button
            type="button"
            onClick={() => {
              setLoginMethod("phone");
              resetOtpFlow();
            }}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              loginMethod === "phone"
                ? "bg-moonstone text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Phone / OTP
          </button>
        </div>

        {loginMethod === "email" ? (
          <>
            <div className="flex flex-col gap-1">
              <Label text={t("admin.login.email")} />
              <InputField
                type="email"
                icon={envelopeIcon}
                placeholder={t("admin.login.email_placeholder")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label text={t("admin.login.password")} />
              <InputField
                type="password"
                icon={lockIcon}
                placeholder={t("admin.login.password_placeholder")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="mt-1 flex items-center justify-between">
                <div className="flex items-center gap-1.5 sm:gap-2.5">
                  <CustomCheckBox
                    checked={keepLoggedIn}
                    setChecked={setKeepLoggedIn}
                  />
                  <span className="text-xs sm:text-sm">
                    {t("admin.login.keep_me_logged_in")}
                  </span>
                </div>
                <CustomLink
                  className="text-xs font-medium sm:text-sm"
                  href="/forget-password"
                >
                  {t("admin.login.forget_password")}
                </CustomLink>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col gap-1">
              <Label text="Phone Number" />
              <InputField
                type="tel"
                icon={profilePhoneIcon}
                placeholder="Enter your phone number (e.g., +966501234567)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={otpSent}
              />
            </div>
            {otpSent && (
              <div className="flex flex-col gap-2">
                <Label text="Enter OTP" />
                <OtpInput value={otp} onChange={handleOtpChange} />
                <div className="flex items-center justify-between py-2">
                  <button
                    type="button"
                    onClick={resetOtpFlow}
                    className="text-sm text-moonstone underline"
                  >
                    Change phone number
                  </button>
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={sendingOtp}
                    className="text-sm text-moonstone underline disabled:opacity-50"
                  >
                    {sendingOtp ? "Sending..." : "Resend OTP"}
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      <RoundedButton
        className="mt-10 w-full max-w-72 self-center"
        title={
          loginMethod === "phone"
            ? otpSent
              ? verifyingOtp
                ? "Verifying..."
                : "Verify & Login"
              : sendingOtp
                ? "Sending OTP..."
                : "Send OTP"
            : loading
              ? t("admin.login.logging_in")
              : t("admin.login.login_cta")
        }
        onClick={handleLogin}
        disabled={loading || sendingOtp || verifyingOtp}
      />
    </div>
  );
};

export default AdminLoginForm;

"use client";

import {
  profileEmailIcon,
  profilePhoneIcon,
  profileUserIcon,
} from "@/assets/icons/profile-icons";
import RoundedButton from "@/components/buttons/RoundedButton";
import InputField from "@/components/form-fields/InputField";
import Label from "@/components/form-fields/Label";
import CustomLink from "@/components/link/CustomLink";
import { sendEmailOtp } from "@/lib/api/auth/email-verification";
import { sendPhoneOtp } from "@/lib/api/auth/phone-verification";
import { useRegisterStore } from "@/providers/register-provider";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const SignUpForm1 = ({ role: propRole }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const role = propRole || searchParams.get("role") || "buyer";

  const { name, email, phone, setName, setEmail, setPhone } = useRegisterStore(
    (state) => state,
  );

  const [emailVerified, setEmailVerified] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [phoneLoading, setPhoneLoading] = useState(false);
  const [continueLoading, setContinueLoading] = useState(false);

  // On mount, check for emailVerified/phoneVerified and email/phone in query params
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (params.get("emailVerified") === "true") {
      setEmailVerified(true);
      if (params.get("email")) setEmail(params.get("email"));
    }
    if (params.get("phoneVerified") === "true") {
      setPhoneVerified(true);
      if (params.get("phone")) setPhone(params.get("phone"));
    }
  }, [setEmail, setPhone]);

  const handleVerifyEmail = async () => {
    if (emailLoading) return;
    console.log("email : ", email);
    if (!name || !email) {
      toast.error("Please fill in your name and email.");
      return;
    }

    try {
      setEmailLoading(true);
      console.log("send otp", email);
      const res = await sendEmailOtp(email);

      console.log("res data email verify : ", res.data?.otp);

      if (res.success) {
        toast.success("OTP sent to your email.");

        // Pass the OTP in the URL if it's available in the response
        const otpParam = res.data?.otp ? `&otp=${res.data.otp}` : "";
        router.push(
          `/${role}/sign-up/email-otp?email=${encodeURIComponent(email)}&role=${role}${otpParam}`,
        );
      } else {
        toast.error(res.message || "Failed to send OTP.");
      }
    } catch (e) {
      toast.error("Failed to send OTP.");
      setEmailLoading(false);
    }
  };

  const handleVerifyPhone = async () => {
    if (phoneLoading) return;
    if (!name || !email || !phone) {
      toast.error("Please fill in all fields (name, email, and phone).");
      return;
    }
    if (!emailVerified) {
      toast.error("Please verify your email first.");
      return;
    }
    try {
      setPhoneLoading(true);
      console.log("send otp to phone", phone);
      const res = await sendPhoneOtp({ phone });

      if (res.success) {
        toast.success("OTP sent to your phone.");
        // Pass the OTP in the URL if it's available in the response
        const otpParam = res.data?.otp ? `&otp=${res.data.otp}` : "";

        router.push(
          `/${role}/sign-up/phone-otp?phone=${encodeURIComponent(phone)}&role=${role}&emailVerified=${emailVerified}&email=${encodeURIComponent(
            email,
          )}${otpParam}`,
        );
      } else {
        toast.error(res.message || "Failed to send OTP.");
      }
    } catch (e) {
      toast.error("Failed to send OTP.");
    } finally {
      setPhoneLoading(false);
    }
  };

  return (
    <>
      <div className="flex w-full flex-col gap-2 px-2 py-5 md:gap-5 md:py-10">
        <h1 className="text-lg md:text-2xl">Tell us about yourself</h1>
        <div className="flex w-full flex-col gap-1">
          <Label text="Full Name" />
          <InputField
            placeholder="Enter your full name"
            icon={profileUserIcon}
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            autoFocus
            autoComplete="name"
          />
        </div>
        <div className="flex w-full flex-col gap-1">
          <Label text="Email" />
          <InputField
            placeholder="Enter your email"
            icon={profileEmailIcon}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            autoComplete="email"
          />
        </div>
        <div className="flex w-full flex-col gap-1">
          <Label text="Phone" />
          <InputField
            placeholder="Enter your phone number"
            icon={profilePhoneIcon}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="tel"
            autoComplete="tel"
          />
        </div>
      </div>
      <div className="flex flex-col items-center gap-8 self-center">
        {!emailVerified ? (
          <div className="flex items-center gap-2">
            <RoundedButton
              type="button"
              onClick={handleVerifyEmail}
              title="Verify Email"
              showIcon
              disabled={emailLoading}
              loading={emailLoading.toString()}
              className="min-w-72"
            />
            {emailLoading && (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            )}
          </div>
        ) : !phoneVerified ? (
          <RoundedButton
            onClick={handleVerifyPhone}
            title={phoneLoading ? "Verifying..." : "Verify Phone"}
            showIcon
            disabled={phoneLoading}
            className="min-w-72"
          />
        ) : (
          <div className="flex items-center gap-2">
            <RoundedButton
              type="button"
              onClick={async () => {
                if (continueLoading) return;
                setContinueLoading(true);
                try {
                  await new Promise((r) => setTimeout(r, 100));
                  router.push(`/${role}/sign-up/id-proof`);
                } catch (_) {
                  setContinueLoading(false);
                }
              }}
              title="Continue to ID Proof"
              showIcon
              disabled={continueLoading}
              loading={continueLoading.toString()}
              className="min-w-72"
            />
            {continueLoading && (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            )}
          </div>
        )}
        <div className="flex items-center gap-1">
          Already have an account?{" "}
          <CustomLink href={"/" + role + "/login"}>Sign in</CustomLink>
        </div>
      </div>
    </>
  );
};

export default SignUpForm1;

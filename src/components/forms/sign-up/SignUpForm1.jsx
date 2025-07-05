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
import { useRegisterStore } from "@/providers/register-provider";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const SignUpForm1 = ({ role: propRole }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const role = propRole || searchParams.get("role") || "buyer";

  const { name, email, phone, setName, setEmail, setPhone } = useRegisterStore((state) => state);
  

  const [emailVerified, setEmailVerified] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);

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

  const handleVerifyEmail = () => {
    if (!name || !email) {
      toast.error("Please fill in your name and email.");
      return;
    }
    router.push(`/auth/${role}/sign-up/email-otp?email=${encodeURIComponent(email)}&role=${role}`);
  };

  const handleVerifyPhone = () => {
    if (!name || !email || !phone) {
      toast.error("Please fill in all fields (name, email, and phone).");
      return;
    }
    if (!emailVerified) {
      toast.error("Please verify your email first.");
      return;
    }
    router.push(`/auth/${role}/sign-up/phone-otp?phone=${encodeURIComponent(phone)}&role=${role}`);
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
          <RoundedButton
            onClick={handleVerifyEmail}
            title="Verify Email"
            showIcon
            className="min-w-72"
          />
        ) : !phoneVerified ? (
          <RoundedButton
            onClick={handleVerifyPhone}
            title="Verify Phone"
            showIcon
            className="min-w-72"
          />
        ) : (
          <RoundedButton
            onClick={() => router.push(`/auth/${role}/sign-up/id-proof`)}
            title="Continue to ID Proof"
            showIcon
            className="min-w-72"
          />
        )}
        <div className="flex items-center gap-1">
          Already have an account?{" "}
          <CustomLink href={"/auth/" + role + "/login"}>Sign in</CustomLink>
        </div>
      </div>
    </>
  );
};

export default SignUpForm1;

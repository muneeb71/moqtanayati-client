"use client";

import InputField from "@/components/form-fields/InputField";
import Label from "@/components/form-fields/Label";
import { useState } from "react";
import RoundedButton from "../buttons/RoundedButton";
import { useRouter } from "next/navigation";
import Form from "next/form";
import { forgotPassword } from "@/lib/api/auth/forgotPassword";

const ForgetPasswordForm = ({ role }) => {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const isEmail = emailOrPhone.includes("@");
      await forgotPassword(
        isEmail ? { email: emailOrPhone } : { phone: emailOrPhone },
      );
      router.push(
        `/${role}/login/forget-password/otp?emailOrPhone=${encodeURIComponent(emailOrPhone)}`,
      );
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to send reset link.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      className="flex w-full flex-col gap-20"
      action={`/login/${role}/forget-password/otp`}
      onSubmit={handleSubmit}
    >
      <div className="flex w-full flex-col">
        <Label htmlFor="emailOrPhone" text="Email Or Phone" />
        <InputField
          type="text"
          name="emailOrPhone"
          placeholder="Enter your Email / Phone"
          value={emailOrPhone}
          onChange={(e) => setEmailOrPhone(e.target.value)}
        />
      </div>
      {error && <span className="self-center text-red-500">{error}</span>}
      <RoundedButton
        title={loading ? "Sending..." : "Send Reset Link"}
        className="w-fit self-center px-10"
        type="submit"
        showIcon
        disabled={loading}
      />
    </Form>
  );
};

export default ForgetPasswordForm;

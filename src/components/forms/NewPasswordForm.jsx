"use client";

import { useState } from "react";
import InputField from "@/components/form-fields/InputField";
import Label from "@/components/form-fields/Label";
import RoundedButton from "../buttons/RoundedButton";
import { lockIcon } from "@/assets/icons/input-icons";
import { useRouter, useSearchParams } from "next/navigation";
import { resetPassword } from "@/lib/api/auth/forgotPassword";

const NewPasswordForm = ({ role }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();
  const emailOrPhone = searchParams.get("emailOrPhone");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const isEmail = emailOrPhone.includes("@");
      await resetPassword(
        isEmail
          ? { email: emailOrPhone, newPassword: password, confirmPassword }
          : { phone: emailOrPhone, newPassword: password, confirmPassword },
      );
      router.push(`/${role}/login`);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to reset password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="flex w-full flex-col gap-20" onSubmit={handleSubmit}>
      <div className="flex flex-col items-center gap-5">
        <div className="flex w-full flex-col">
          <Label htmlFor="password" text="Password" />
          <InputField
            type="password"
            name="password"
            placeholder="Enter your Password"
            value={password}
            icon={lockIcon}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex w-full flex-col">
          <Label htmlFor="confirmPassword" text="Confirm Password" />
          <InputField
            type="password"
            name="confirmPassword"
            placeholder="Re-enter your Password"
            value={confirmPassword}
            icon={lockIcon}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
      </div>
      {error && <span className="self-center text-red-500">{error}</span>}
      <RoundedButton
        title={loading ? "Resetting..." : "Reset Password"}
        className="w-fit self-center px-20"
        type="submit"
        disabled={loading}
      />
    </form>
  );
};

export default NewPasswordForm;

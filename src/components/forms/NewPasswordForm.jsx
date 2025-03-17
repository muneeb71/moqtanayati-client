"use client";

import { useState } from "react";
import InputField from "@/components/form-fields/InputField";
import Label from "@/components/form-fields/Label";
import RoundedButton from "../buttons/RoundedButton";
import { lockIcon } from "@/assets/icons/input-icons";
import { useRouter } from "next/navigation";

const NewPasswordForm = ({ role }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, confirmPassword }),
    });

    if (response.ok) {
      router.push(`/login/${role}`);
    } else {
      alert("Failed to reset password.");
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
      <RoundedButton
        title="Reset Password"
        className="w-fit self-center px-20"
        type="submit"
      />
    </form>
  );
};

export default NewPasswordForm;

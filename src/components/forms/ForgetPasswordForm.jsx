"use client";

import InputField from "@/components/form-fields/InputField";
import Label from "@/components/form-fields/Label";
import { useState } from "react";
import RoundedButton from "../buttons/RoundedButton";
import { useRouter } from "next/navigation";
import Form from "next/form";

const ForgetPasswordForm = ({ role }) => {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const router = useRouter();
  return (
    <Form
      className="flex w-full flex-col gap-20"
      action={`/login/${role}/forget-password/otp`}
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
      <RoundedButton
        title="Send Reset Link"
        className="w-fit self-center px-10"
        type="submit"
        showIcon
      />
    </Form>
  );
};

export default ForgetPasswordForm;

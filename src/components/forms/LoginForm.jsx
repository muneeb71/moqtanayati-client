"use client";

import { envelopeIcon, lockIcon } from "@/assets/icons/input-icons";
import CustomCheckBox from "@/components/form-fields/CustomCheckBox";
import InputField from "@/components/form-fields/InputField";
import Label from "@/components/form-fields/Label";
import { useState } from "react";
import RoundedButton from "../buttons/RoundedButton";
import CustomLink from "../link/CustomLink";
import { appName } from "@/lib/app-name";
import { useRouter } from "next/navigation";

const LoginForm = ({ role = "seller" }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const router = useRouter();
  return (
    <div className="flex w-full flex-col gap-5">
      <div className="flex w-full flex-col">
        <Label htmlFor="email" text="Email" />
        <InputField
          icon={envelopeIcon}
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="flex w-full flex-col">
        <Label htmlFor="password" text="Password" />
        <InputField
          icon={lockIcon}
          placeholder="Enter your password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center gap-2">
            <CustomCheckBox
              checked={keepLoggedIn}
              setChecked={setKeepLoggedIn}
            />
            <span className="text-sm">Keep me logged in</span>
          </div>
          <CustomLink
            className="text-sm"
            href={`/login/${role}/forget-password`}
          >
            Forgot password ?
          </CustomLink>
        </div>
      </div>
      <div className="flex flex-col items-center gap-5 self-center pt-16">
        <RoundedButton
          onClick={() => router.push("/")}
          title="Log into your account"
          className="w-fit px-10"
        />
        <div className="flex items-center gap-1 text-sm font-medium text-battleShipGray">
          New to {appName}?
          <CustomLink href="/sign-up">Create Account</CustomLink>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

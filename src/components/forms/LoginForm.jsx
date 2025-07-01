"use client";

import { envelopeIcon, lockIcon } from "@/assets/icons/input-icons";
import CustomCheckBox from "@/components/form-fields/CustomCheckBox";
import InputField from "@/components/form-fields/InputField";
import Label from "@/components/form-fields/Label";
import { useState, useTransition } from "react";
import RoundedButton from "../buttons/RoundedButton";
import CustomLink from "../link/CustomLink";
import { appName } from "@/lib/app-name";
import { useRouter } from "next/navigation";
import { loginUser } from "@/lib/api/auth/login";
import toast from "react-hot-toast";

const LoginForm = ({ role = "seller" }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    startTransition(async () => {
      const response = await loginUser(email, password, role);
      if (response.success) {
        if (response.data.user.sellerSuvery) {
          router.push("/" + response.data.user.role.toLowerCase());
        } else {
          router.push("/" + response.data.user.role.toLowerCase());
        }
      } else {
        toast.error(response.message || "Login failed");
      }
    });
  };

  return (
    <form onSubmit={handleLogin} className="flex w-full flex-col gap-5">
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
            href={`/auth/${role}/login/forget-password`}
          >
            Forgot password ?
          </CustomLink>
        </div>
      </div>
      <div className="flex flex-col items-center gap-5 self-center pt-16">
        <RoundedButton
          type="submit"
          className="w-fit px-10"
          disabled={isPending}
          loading={isPending.toString()}
          title={isPending ? "Logging in..." : "Log into your account"}
        />
        <div className="flex items-center gap-1 text-sm font-medium text-battleShipGray">
          New to {appName}?
          <CustomLink
            href={
              role === "buyer"
                ? "/auth/" + role + "/sign-up"
                : "/auth/" + role + "/seller-type"
            }
          >
            Create Account
          </CustomLink>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;

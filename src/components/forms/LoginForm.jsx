"use client";

import { envelopeIcon, lockIcon } from "@/assets/icons/input-icons";
import {
  profileEmailIcon,
  profilePhoneIcon,
  profileUserIcon,
} from "@/assets/icons/profile-icons";
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
  const [phone, setPhone] = useState();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState("email");
  return (
    <div className="flex w-full flex-col gap-5">
      <div className="flex w-full flex-col">
        {role === "buyer" && (
          <div className="mb-1 md:mb-7 flex h-12 w-full items-center justify-between rounded-md bg-grayishWhite px-2">
            <input
              className={`h-10 cursor-pointer rounded-lg px-8 text-sm ${selectedOption === "email" && "bg-white font-medium text-moonstone"}`}
              type="button"
              value={"Email"}
              onClick={() => {
                setSelectedOption("email");
              }}
            />
            <input
              className={`h-10 cursor-pointer rounded-lg px-8 text-sm ${selectedOption === "phone" && "bg-white font-medium text-moonstone"}`}
              type="button"
              value={"Phone"}
              onClick={() => {
                setSelectedOption("phone");
              }}
            />
            <input
              className={`h-10 cursor-pointer rounded-lg px-8 text-sm ${selectedOption === "username" && "bg-white font-medium text-moonstone"}`}
              type="button"
              value={"Username"}
              onClick={() => {
                setSelectedOption("username");
              }}
            />
          </div>
        )}
        {role === "seller" ? (
          <>
            <Label htmlFor="email" text="Email" />
            <InputField
              icon={envelopeIcon}
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </>
        ) : (
          <>
            {selectedOption === "email" && (
              <>
                <Label htmlFor="email" text="Email" />
                <InputField
                  icon={profileEmailIcon}
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </>
            )}
            {selectedOption === "phone" && (
              <>
                <Label htmlFor="phone" text="Phone" />
                <InputField
                  icon={profilePhoneIcon}
                  type="tel"
                  placeholder="Enter your Phone No"
                  value={email}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </>
            )}
            {selectedOption === "username" && (
              <>
                <Label htmlFor="username" text="Username" />
                <InputField
                  icon={profileUserIcon}
                  type="text"
                  placeholder="Enter your username"
                  value={email}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </>
            )}
          </>
        )}
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
          onClick={() => {
            role === "seller" ? router.push("/seller") : router.push("/");
          }}
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

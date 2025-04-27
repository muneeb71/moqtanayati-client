"use client";

import { lockIcon } from "@/assets/icons/input-icons";
import {
  profileEmailIcon,
  profilePhoneIcon,
  profileUserIcon,
} from "@/assets/icons/profile-icons";
import RoundedButton from "@/components/buttons/RoundedButton";
import InputField from "@/components/form-fields/InputField";
import Label from "@/components/form-fields/Label";
import CustomLink from "@/components/link/CustomLink";
import { useRouter } from "next/navigation";

const PasswordStepPage = () => {
  const router = useRouter();
  return (
    <>
      <div className="flex w-full flex-col gap-5 px-2 py-10">
        <h1 className="text-lg md:text-2xl">Tell us about yourself</h1>
        <div className="flex w-full flex-col">
          {/* <Label text="Password" /> */}
          <InputField
            type="password"
            placeholder="Enter your Password"
            icon={lockIcon}
          />
        </div>
        <div className="flex w-full flex-col">
          {/* <Label text="Confirm Password" /> */}
          <InputField
            type="password"
            placeholder="Re-enter your Password"
            icon={lockIcon}
          />
        </div>
      </div>
      <div className="flex flex-col items-center gap-8 self-center">
        <RoundedButton
          onClick={() => router.push("/location-selection")}
          title="Create my account"
          className="min-w-72"
        />
        <div className="flex items-center gap-1">
          Already have an account?{" "}
          <CustomLink href="/login">Sign in</CustomLink>
        </div>
      </div>
    </>
  );
};

export default PasswordStepPage;

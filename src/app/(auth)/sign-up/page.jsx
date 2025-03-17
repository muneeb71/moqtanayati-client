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
import { useRouter } from "next/navigation";

const PersonalDetailsStepPage = () => {
  const router = useRouter();
  return (
    <>
      <div className="flex w-full flex-col gap-2 md:gap-5 px-2 py-5 md:py-10">
        <h1 className="text-lg md:text-2xl">Tell us about yourself</h1>
        <div className="flex w-full flex-col gap-1">
          <Label text="Full Name" />
          <InputField
            placeholder="Enter your full name"
            icon={profileUserIcon}
          />
        </div>
        <div className="flex w-full flex-col gap-1">
          <Label text="Email" />
          <InputField placeholder="Enter your email" icon={profileEmailIcon} />
        </div>
        <div className="flex w-full flex-col gap-1">
          <Label text="Phone" />
          <InputField
            placeholder="Enter your phone number"
            icon={profilePhoneIcon}
          />
        </div>
      </div>
      <div className="flex flex-col items-center gap-8 self-center">
        <RoundedButton
          onClick={() => router.push("/sign-up/id-proof")}
          title="Next"
          showIcon
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

export default PersonalDetailsStepPage;

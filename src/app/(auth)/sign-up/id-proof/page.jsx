"use client";

import { profileIDIcon } from "@/assets/icons/profile-icons";
import RoundedButton from "@/components/buttons/RoundedButton";
import InputField from "@/components/form-fields/InputField";
import Label from "@/components/form-fields/Label";
import CustomLink from "@/components/link/CustomLink";
import { useRouter } from "next/navigation";

const IdProofStepPage = () => {
  const router = useRouter();
  return (
    <>
      <div className="flex w-full flex-col gap-5 px-2 py-10">
        <h1 className="text-lg md:text-2xl">Verification details</h1>
        <div className="flex w-full flex-col gap-1">
          <Label text="National ID" />
          <InputField placeholder="Enter your ID" icon={profileIDIcon} />
        </div>
      </div>
      <div className="flex flex-col items-center gap-8 self-center">
        <RoundedButton
          onClick={() => router.push("/sign-up/password")}
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

export default IdProofStepPage;

"use client";

import { profileIDIcon } from "@/assets/icons/profile-icons";
import RoundedButton from "@/components/buttons/RoundedButton";
import InputField from "@/components/form-fields/InputField";
import Label from "@/components/form-fields/Label";
import CustomLink from "@/components/link/CustomLink";
import { useRegisterStore } from "@/providers/register-provider";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const SignUpForm2 = ({ role }) => {
  const router = useRouter();
  const { nationalId, setNationalId } = useRegisterStore((state) => state);

  const [loading, setLoading] = useState(false);

  const handleNextClick = async () => {
    if (loading) return;
    if (!nationalId) {
      toast.error("Please enter National ID.");
      return;
    }
    try {
      setLoading(true);
      await new Promise((r) => setTimeout(r, 100));
      router.push(`/${role}/sign-up/password`);
    } catch (_) {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex w-full flex-col gap-5 px-2 py-10">
        <h1 className="text-lg md:text-2xl">Verification details</h1>
        <div className="flex w-full flex-col gap-1">
          <Label text="National ID" />
          <InputField
            placeholder="Enter your ID"
            icon={profileIDIcon}
            value={nationalId}
            onChange={(e) => setNationalId(e.target.value)}
            type="text"
            autoFocus
            autoComplete="off"
          />
        </div>
      </div>
      <div className="flex flex-col items-center gap-8 self-center">
        <div className="flex items-center gap-2">
          <RoundedButton
            type="button"
            onClick={handleNextClick}
            title="Next"
            showIcon
            disabled={loading}
            loading={loading.toString()}
            className="min-w-72"
          />
          {loading && (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          )}
        </div>
        <div className="flex items-center gap-1">
          Already have an account?{" "}
          <CustomLink href={"/auth/" + role + "/login"}>Sign in</CustomLink>
        </div>
      </div>
    </>
  );
};

export default SignUpForm2;

"use client";

import { envelopeIcon, lockIcon } from "@/assets/icons/input-icons";
import CustomCheckBox from "@/components/form-fields/CustomCheckBox";
import InputField from "@/components/form-fields/InputField";
import Label from "@/components/form-fields/Label";
import CustomLink from "@/components/link/CustomLink";
import { useState } from "react";
import RoundedButton from "../buttons/RoundedButton";
import { useRouter } from "next/navigation";

const AdminLoginForm = () => {
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const router = useRouter();
  return (
    <div className="relative z-30 flex w-full max-w-md flex-col gap-6 rounded-3xl border-[3px] border-moonstone/20 bg-white p-5 text-darkBlue md:gap-10 md:rounded-[40px] md:p-7">
      <div className="flex flex-col gap-2">
        <h1 className="text-xl md:text-3xl">Welcome Admin</h1>
        <p className="max-w-xs text-sm leading-tight text-darkBlue/50 md:text-lg">
          Log in to explore exciting auctions and unique finds.
        </p>
      </div>
      <div className="flex w-full flex-col gap-5">
        <div className="flex flex-col gap-1">
          <Label text="Email" />
          <InputField
            type="email"
            icon={envelopeIcon}
            placeholder="Enter your email"
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label text="Password" />
          <InputField
            type="password"
            icon={lockIcon}
            placeholder="Enter your email"
          />
          <div className="mt-1 flex items-center justify-between">
            <div className="flex items-center gap-1.5 sm:gap-2.5">
              <CustomCheckBox
                checked={keepLoggedIn}
                setChecked={setKeepLoggedIn}
              />
              <span className="text-xs sm:text-sm">Keep me logged in</span>
            </div>
            <CustomLink
              className="text-xs font-medium sm:text-sm"
              href="/forget-password"
            >
              Forget Password ?
            </CustomLink>
          </div>
        </div>
      </div>
      <RoundedButton
        className="mt-10 w-full max-w-72 self-center"
        title="Log into your account"
        onClick={() => router.push("/admin")}
      />
    </div>
  );
};

export default AdminLoginForm;

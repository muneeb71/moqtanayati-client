"use client";

import RoundedButton from "@/components/buttons/RoundedButton";
import Label from "@/components/form-fields/Label";
import OtpInput from "@/components/form-fields/OtpInput";
import CustomLink from "@/components/link/CustomLink";
import { useRouter, useSearchParams } from "next/navigation";

const OtpForm = ({ role }) => {
  const searchParams = useSearchParams();
  const emailOrPhone = searchParams.get("emailOrPhone");
  const router = useRouter();

  return (
    <div className="flex w-full flex-col gap-10 pt-20 md:gap-[66px] md:pt-10 lg:pt-0">
      <div className="flex w-full flex-col gap-16">
        <div className="flex w-full flex-col gap-2">
          <h1 className="text-xl md:text-[33px] md:leading-[50px]">
            Verification Required
          </h1>
          <p className="text-darkBlue/50 md:text-[19px] md:leading-[29px]">
            We've sent a password reset link to{" "}
            <span className="text-delftBlue">{emailOrPhone}</span>
          </p>
        </div>
        <div className="flex flex-col gap-2 self-center">
          {/* <Label text="Enter OTP" className="text-[19px] text-eerieBlack" /> */}
          <OtpInput />
        </div>
        <div className="flex flex-col items-center gap-5 self-center">
          <RoundedButton
            title="Verify Code"
            showIcon
            className="w-fit self-center px-16"
            onClick={() =>
              router.push(`/login/${role}/forget-password/new-password`)
            }
          />
          <div className="flex items-center gap-1 text-sm font-medium text-battleShipGray">
            Didn't receive the code?
            <CustomLink href="/sign-up">Resend OTP</CustomLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpForm;

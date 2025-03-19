"use client";

import RoundedButton from "@/components/buttons/RoundedButton";
import Label from "@/components/form-fields/Label";
import EmailOtpInput from "@/components/form-fields/EmailOtpInput";
import CustomLink from "@/components/link/CustomLink";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

const EmailOtpContent = ({ role }) => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const router = useRouter();

  return (
    <div className="flex w-full flex-col gap-10 pt-20 md:gap-[66px] md:pt-10 lg:pt-0">
      <div className="flex w-full flex-col gap-16">
        <div className="flex w-full flex-col gap-2">
          <h1 className="text-2xl mt-20">Verify Your Email Address</h1>
          <p className="text-darkBlue/50 md:text-[19px] md:leading-[29px]">
            We’ve sent a 6-digit verification code to your email:{" "}
            <span className="text-delftBlue">{email}</span>. Enter the code below to verify your email and
            continue.
          </p>
        </div>
        <div className="flex flex-col gap-2 self-center">
          <Label text="Enter 6-digit Code" className="text-[19px] text-eerieBlack" />
          <EmailOtpInput />
        </div>
        <div className="flex flex-col items-center gap-5 self-center">
          <RoundedButton
            title="Verify & Continue"
            showIcon
            className="w-fit self-center px-16"
            onClick={() => router.push(`/sign-up/id-proof`)}
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

const EmailOtpForm = (props) => (
  <Suspense fallback={<div>Loading...</div>}>
    <EmailOtpContent {...props} />
  </Suspense>
);

export default EmailOtpForm;

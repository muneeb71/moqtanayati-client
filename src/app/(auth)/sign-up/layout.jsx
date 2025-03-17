import RegisterSteps from "@/components/RegisterSteps";
import React from "react";

const SignInLayout = ({ children }) => {
  return (
    <div className="flex w-full flex-col justify-end pt-20 sm:pt-0">
      <RegisterSteps />
      <div className="flex h-full min-h-[30rem] w-full flex-col justify-between md:min-h-[45rem]">
        {children}
      </div>
    </div>
  );
};

export default SignInLayout;

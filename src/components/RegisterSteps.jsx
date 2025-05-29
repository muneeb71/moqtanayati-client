"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const RegisterSteps = ({ role }) => {
  const steps = [
    {
      title: "Personal Details",
      href: "/auth/" + role + "/sign-up",
    },
    {
      title: "ID Proof",
      href: "/auth/" + role + "/sign-up/id-proof",
    },
    {
      title: "Password",
      href: "/auth/" + role + "/sign-up/password",
    },
  ];

  const pathname = usePathname();

  return (
    <div className="flex flex-col items-center gap-8">
      <h1 className="text-center text-xl font-medium text-delftBlue">
        Create Your Account
      </h1>
      <div className="grid w-full grid-cols-3 gap-5 px-2">
        {steps.map((step, index) => {
          const isActive =
            index === 0 || // Personal Details always active
            (index === 1 &&
              [
                "/auth/" + role + "/sign-up/id-proof",
                "/auth/" + role + "/sign-up/password",
              ].includes(pathname)) ||
            (index === 2 && pathname === "/auth/" + role + "/sign-up/password");

          return (
            <Link href={step.href} className="flex flex-col gap-1" key={index}>
              <span
                className={cn(
                  "text-nowrap text-center text-xs text-silver sm:text-sm",
                  isActive ? "text-moonstone" : "text-silver",
                )}
              >
                {step.title}
              </span>
              <span
                className={cn(
                  "h-[4.4px] w-full rounded-full",
                  isActive ? "bg-moonstone" : "bg-silver",
                )}
              ></span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default RegisterSteps;

"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useTranslation from "@/hooks/useTranslation";

const RegisterSteps = ({ role }) => {
  const { t } = useTranslation();
  const steps = [
    {
      title: t("signup.step_personal_details"),
      href: "/" + role + "/sign-up",
    },
    {
      title: t("signup.step_id_proof"),
      href: "/" + role + "/sign-up/id-proof",
    },
    {
      title: t("signup.step_password"),
      href: "/" + role + "/sign-up/password",
    },
  ];

  const pathname = usePathname();

  return (
    <div className="flex flex-col items-center gap-8">
      <h1 className="text-center text-xl font-medium text-delftBlue">
        {t("signup.create_account_title")}
      </h1>
      <div className="grid w-full grid-cols-3 gap-5 px-2">
        {steps.map((step, index) => {
          const base = "/" + role + "/sign-up";
          const isActive =
            index === 0 || // Personal Details always active
            (index === 1 &&
              (pathname === base + "/id-proof" ||
                pathname === base + "/password")) ||
            (index === 2 && pathname === base + "/password");

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

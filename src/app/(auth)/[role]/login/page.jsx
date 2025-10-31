"use client";
import LoginForm from "@/components/forms/LoginForm";
import useTranslation from "@/hooks/useTranslation";
import { useParams } from "next/navigation";

const RoleBasedLoginPage = () => {
  const { t } = useTranslation();
  const params = useParams();
  const role = params?.role;
  return (
    <div className="flex w-full flex-col justify-center gap-8 pb-10 pt-28 md:gap-12">
      <div className="flex w-full flex-col gap-1">
        <h1 className="text-xl md:text-[33px] md:leading-[50px]">
          {t("login.welcome_back")}
        </h1>
        <span className="max-w-[332px] text-darkBlue/50 md:text-[19px] md:leading-[29px]">
          {t("login.subtitle")}
        </span>
      </div>
      <LoginForm role={role} />
    </div>
  );
};

export default RoleBasedLoginPage;

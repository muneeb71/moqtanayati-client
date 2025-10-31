"use client";

import { envelopeIcon, lockIcon } from "@/assets/icons/input-icons";
import CustomCheckBox from "@/components/form-fields/CustomCheckBox";
import InputField from "@/components/form-fields/InputField";
import Label from "@/components/form-fields/Label";
import CustomLink from "@/components/link/CustomLink";
import { useState } from "react";
import RoundedButton from "../buttons/RoundedButton";
import { useRouter } from "next/navigation";
import { loginUser } from "@/lib/api/auth/login";
import toast from "react-hot-toast";
import useTranslation from "@/hooks/useTranslation";

const AdminLoginForm = () => {
  const { t } = useTranslation();
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!email.trim()) {
      toast.error(t("admin.login.email_required"));
      return;
    }

    if (!password.trim()) {
      toast.error(t("admin.login.password_required"));
      return;
    }

    setLoading(true);
    const res = await loginUser(email, password, "admin");
    setLoading(false);
    if (res.success) {
      toast.success(t("admin.login.success"));
      router.push("/admin");
    } else {
      toast.error(res.message || t("admin.login.failed"));
    }
  };

  return (
    <div className="relative z-30 flex w-full max-w-md flex-col gap-6 rounded-3xl border-[3px] border-moonstone/20 bg-white p-5 text-darkBlue md:gap-10 md:rounded-[40px] md:p-7">
      <div className="flex flex-col gap-2">
        <h1 className="text-xl md:text-3xl">
          {t("admin.login.welcome_admin")}
        </h1>
        <p className="max-w-xs text-sm leading-tight text-darkBlue/50 md:text-lg">
          {t("admin.login.subtitle")}
        </p>
      </div>
      <div className="flex w-full flex-col gap-5">
        <div className="flex flex-col gap-1">
          <Label text={t("admin.login.email")} />
          <InputField
            type="email"
            icon={envelopeIcon}
            placeholder={t("admin.login.email_placeholder")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label text={t("admin.login.password")} />
          <InputField
            type="password"
            icon={lockIcon}
            placeholder={t("admin.login.password_placeholder")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="mt-1 flex items-center justify-between">
            <div className="flex items-center gap-1.5 sm:gap-2.5">
              <CustomCheckBox
                checked={keepLoggedIn}
                setChecked={setKeepLoggedIn}
              />
              <span className="text-xs sm:text-sm">
                {t("admin.login.keep_me_logged_in")}
              </span>
            </div>
            <CustomLink
              className="text-xs font-medium sm:text-sm"
              href="/forget-password"
            >
              {t("admin.login.forget_password")}
            </CustomLink>
          </div>
        </div>
      </div>
      <RoundedButton
        className="mt-10 w-full max-w-72 self-center"
        title={
          loading ? t("admin.login.logging_in") : t("admin.login.login_cta")
        }
        onClick={handleLogin}
        disabled={loading}
      />
    </div>
  );
};

export default AdminLoginForm;

"use client";

import { lockIcon } from "@/assets/icons/input-icons";
import RoundedButton from "@/components/buttons/RoundedButton";
import InputField from "@/components/form-fields/InputField";
import Label from "@/components/form-fields/Label";
import CustomLink from "@/components/link/CustomLink";
import { useRegisterStore } from "@/providers/register-provider";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import useTranslation from "@/hooks/useTranslation";

const SignUpForm3 = ({ role }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { password, confirmPassword, setPassword, setConfirmPassword } =
    useRegisterStore((state) => state);

  const [loading, setLoading] = useState(false);

  const handleNextClick = async () => {
    if (loading) return;
    if (!password) {
      toast.error(t("signup.enter_password"));
      return;
    } else if (!confirmPassword) {
      toast.error(t("signup.reenter_password"));
      return;
    }

    if (password !== confirmPassword) {
      toast.error(t("signup.passwords_not_match"));
      return;
    }

    try {
      setLoading(true);
      await new Promise((r) => setTimeout(r, 100));
      router.push(`/${role}/location-selection`);
    } catch (_) {
      // noop
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="flex w-full flex-col gap-5 px-2 py-10">
        <h1 className="text-lg md:text-2xl">{t("signup.secure_account")}</h1>
        <div className="flex w-full flex-col">
          <Label text={t("login.password_label")} />
          <InputField
            type="password"
            placeholder={t("login.password_placeholder")}
            icon={lockIcon}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
          />
        </div>
        <div className="flex w-full flex-col">
          <Label text={t("signup.confirm_password")} />
          <InputField
            type="password"
            placeholder={t("signup.reenter_password_placeholder")}
            icon={lockIcon}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-col items-center gap-8 self-center">
        <div className="flex items-center gap-2">
          <RoundedButton
            type="button"
            onClick={handleNextClick}
            title={t("signup.create_my_account")}
            className="min-w-72"
            disabled={loading}
            loading={loading || undefined}
          />
        </div>
        <div className="flex items-center gap-1">
          {t("signup.already_account")}{" "}
          <CustomLink href={"/" + role + "/login"}>
            {t("signup.sign_in")}
          </CustomLink>
        </div>
      </div>
    </>
  );
};

export default SignUpForm3;

"use client";

import {
  profileEmailIcon,
  profilePhoneIcon,
  profileUserIcon,
} from "@/assets/icons/profile-icons";
import RoundedButton from "@/components/buttons/RoundedButton";
import InputField from "@/components/form-fields/InputField";
import Label from "@/components/form-fields/Label";
import CustomLink from "@/components/link/CustomLink";
import { sendEmailOtp } from "@/lib/api/auth/email-verification";
import { sendPhoneOtp } from "@/lib/api/auth/phone-verification";
import { useRegisterStore } from "@/providers/register-provider";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useTranslation from "@/hooks/useTranslation";

const SignUpForm1 = ({ role: propRole }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();

  const role = propRole || searchParams.get("role") || "buyer";

  const { name, email, phone, setName, setEmail, setPhone } = useRegisterStore(
    (state) => state,
  );

  const [emailVerified, setEmailVerified] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [phoneLoading, setPhoneLoading] = useState(false);
  const [continueLoading, setContinueLoading] = useState(false);

  // On mount, check for emailVerified/phoneVerified and email/phone in query params
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (params.get("emailVerified") === "true") {
      setEmailVerified(true);
    }
    if (params.get("phoneVerified") === "true") {
      setPhoneVerified(true);
    }
    const emailParam = params.get("email");
    if (emailParam) setEmail(emailParam);
    const nameParam = params.get("name");
    if (nameParam) setName(nameParam);
    const phoneParam = params.get("phone");
    if (phoneParam) setPhone(phoneParam);
  }, [setEmail, setPhone, setName]);

  const handleVerifyEmail = async () => {
    if (emailLoading) return;
    console.log("email : ", email);
    if (!name || !email) {
      toast.error(t("signup.fill_name_email"));
      return;
    }

    try {
      setEmailLoading(true);
      console.log("send otp", email);
      const res = await sendEmailOtp(email);

      console.log("res data email verify : ", res.data?.otp);

      if (res.success) {
        toast.success(t("signup.otp_sent_email"));

        // Pass the OTP in the URL if it's available in the response
        const otpParam = res.data?.otp ? `&otp=${res.data.otp}` : "";
        const qs = new URLSearchParams({
          email,
          role,
        });
        if (name) qs.set("name", name);
        if (phone) qs.set("phone", phone);
        if (otpParam) {
          // otpParam begins with &otp=...; we will append below
        }
        const base = `/${role}/sign-up/email-otp?${qs.toString()}`;
        router.push(`${base}${otpParam}`);
      } else {
        toast.error(res.message || t("signup.failed_send_otp"));
      }
    } catch (e) {
      toast.error(t("signup.failed_send_otp"));
    } finally {
      setEmailLoading(false);
    }
  };

  const handleVerifyPhone = async () => {
    if (phoneLoading) return;
    if (!name || !email || !phone) {
      toast.error(t("signup.fill_all_fields"));
      return;
    }
    if (!emailVerified) {
      toast.error(t("signup.verify_email_first"));
      return;
    }
    try {
      setPhoneLoading(true);
      console.log("send otp to phone", phone);
      const res = await sendPhoneOtp({ phone });

      if (res.success) {
        toast.success(t("signup.otp_sent_phone"));
        // Pass the OTP in the URL if it's available in the response
        const otpParam = res.data?.otp ? `&otp=${res.data.otp}` : "";

        router.push(
          `/${role}/sign-up/phone-otp?phone=${encodeURIComponent(phone)}&role=${role}&emailVerified=${emailVerified}&email=${encodeURIComponent(
            email,
          )}${otpParam}`,
        );
      } else {
        toast.error(res.message || t("signup.failed_send_otp"));
      }
    } catch (e) {
      toast.error(t("signup.failed_send_otp"));
    } finally {
      setPhoneLoading(false);
    }
  };

  return (
    <>
      <div className="flex w-full flex-col gap-2 px-2 py-5 md:gap-5 md:py-10">
        <h1 className="text-lg md:text-2xl">{t("signup.tell_us")}</h1>
        <div className="flex w-full flex-col gap-1">
          <Label text={t("signup.full_name")} />
          <InputField
            placeholder={t("signup.full_name_placeholder")}
            icon={profileUserIcon}
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            autoFocus
            autoComplete="name"
          />
        </div>
        <div className="flex w-full flex-col gap-1">
          <Label text={t("login.email_label")} />
          <InputField
            placeholder={t("login.email_placeholder")}
            icon={profileEmailIcon}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            autoComplete="email"
          />
        </div>
        <div className="flex w-full flex-col gap-1">
          <Label text={t("signup.phone")} />
          <InputField
            placeholder={t("signup.phone_placeholder")}
            icon={profilePhoneIcon}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="tel"
            autoComplete="tel"
          />
        </div>
      </div>
      <div className="flex flex-col items-center gap-8 self-center">
        {!emailVerified ? (
          <div className="flex items-center gap-2">
            <RoundedButton
              type="button"
              onClick={handleVerifyEmail}
              title={t("signup.verify_email")}
              showIcon
              disabled={emailLoading}
              loading={emailLoading || undefined}
              className="min-w-72"
            />
          </div>
        ) : !phoneVerified ? (
          <RoundedButton
            onClick={handleVerifyPhone}
            title={
              phoneLoading ? t("signup.verifying") : t("signup.verify_phone")
            }
            showIcon
            disabled={phoneLoading}
            className="min-w-72"
          />
        ) : (
          <div className="flex items-center gap-2">
            <RoundedButton
              type="button"
              onClick={async () => {
                if (continueLoading) return;
                setContinueLoading(true);
                try {
                  await new Promise((r) => setTimeout(r, 100));
                  router.push(`/${role}/sign-up/id-proof`);
                } catch (_) {
                  // noop
                } finally {
                  setContinueLoading(false);
                }
              }}
              title={t("signup.continue_id_proof")}
              showIcon
              disabled={continueLoading}
              loading={continueLoading || undefined}
              className="min-w-72"
            />
          </div>
        )}
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

export default SignUpForm1;

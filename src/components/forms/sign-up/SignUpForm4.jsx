"use client";

import { locationIcon } from "@/assets/icons/common-icons";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import SecondaryButton from "@/components/buttons/SecondaryButton";
import LocationSelectionDialog from "@/components/sections/auth/location-selection/LocationSelectionDialog";
import { signUpUser } from "@/lib/api/auth/register";
import { useRegisterStore } from "@/providers/register-provider";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useTranslation from "@/hooks/useTranslation";

const SignUpForm4 = ({ role = "" }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const {
    name,
    email,
    phone,
    address,
    nationalId,
    iban,
    crNumber,
    vatNumber,
    password,
    latitude,
    longitude,
    sellerType,
    isVerified,
  } = useRegisterStore((state) => state);

  const [type, setType] = useState();
  const [registerLoading, setRegisterLoading] = useState(false);

  const handleRegisterUser = async () => {
    if (registerLoading) return;
    const roleUppercase = role.toUpperCase();
    const payload = {
      role: roleUppercase,
      name,
      email,
      phone,
      address,
      nationalId,
      password,
      latitude,
      longitude,
      isVerified: true,
      sellerType: role === "buyer" ? "INDIVIDUAL" : sellerType || "BUSINESS",
    };
    console.log("register payload : ", payload);
    setRegisterLoading(true);

    try {
      const response = await signUpUser(payload);
      console.log("register response 2 : ", response);
      if (response?.success) {
        // Check if user is a BUSINESS seller, redirect to survey
        if (roleUppercase === "SELLER" && payload.sellerType === "BUSINESS") {
          // Store user data in sessionStorage for survey
          sessionStorage.setItem(
            "surveyUserData",
            JSON.stringify({
              id: response.data?.user?.id || response.data?.id,
              name: payload.name,
              email: payload.email,
              phone: payload.phone,
              address: payload.address,
              nationalId: payload.nationalId,
              sellerType: payload.sellerType,
              iban: (iban || "").trim(),
              crNumber: (crNumber || "").trim(),
              vatNumber: (vatNumber || "").trim(),
            }),
          );
          router.push("/survey");
        } else {
          // For buyers and individual sellers, go to login
          router.push(`/${role}/login`);
        }
      } else {
        // show error to user
        alert(response?.message || "Registration failed");
        setRegisterLoading(false);
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert(
        error?.response?.data?.message ||
          error?.message ||
          "Registration failed",
      );
    } finally {
      setRegisterLoading(false);
    }
  };

  return (
    <div className="flex w-full max-w-96 flex-col gap-10 px-2 py-10">
      <Image
        src="/static/bg/location.svg"
        width={312}
        alt="location svg"
        loading="lazy"
        quality={100}
        height={312}
        className="hidden md:block"
      />
      <div className="flex flex-col gap-3">
        <h1 className="text-2xl font-medium">
          {role === "buyer"
            ? t("signup.where_buyer")
            : t("signup.where_seller")}
        </h1>
        <span className="text-black/50">
          {role === "buyer"
            ? t("signup.where_buyer_sub")
            : t("signup.where_seller_sub")}
        </span>
      </div>
      <div className="flex flex-col gap-2">
        {latitude && longitude && address && (
          <div className="flex flex-col gap-2">
            <h1 className="text-">{t("signup.current_location")}</h1>
            <div className="flex flex-col rounded-md bg-secondaryCyan/20 p-3">
              <span className="text-sm text-black/50">{address}</span>
            </div>
          </div>
        )}
        <LocationSelectionDialog
          trigger={
            <PrimaryButton
              className="w-100"
              title={
                latitude && longitude && address
                  ? t("signup.enter_different_location")
                  : role === "buyer"
                    ? t("signup.near_me")
                    : t("signup.exact_location")
              }
              icon={locationIcon}
            />
          }
        />
        {latitude && longitude && address && (
          <div className="flex items-center gap-2">
            <SecondaryButton
              type="button"
              title={
                registerLoading
                  ? t("signup.registering")
                  : t("signup.register_account")
              }
              onClick={handleRegisterUser}
              disabled={registerLoading}
              loading={registerLoading || undefined}
              className="w-full"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUpForm4;

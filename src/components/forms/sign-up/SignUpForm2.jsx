"use client";

import { profileIDIcon } from "@/assets/icons/profile-icons";
import RoundedButton from "@/components/buttons/RoundedButton";
import InputField from "@/components/form-fields/InputField";
import Label from "@/components/form-fields/Label";
import CustomLink from "@/components/link/CustomLink";
import { useRegisterStore } from "@/providers/register-provider";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import useTranslation from "@/hooks/useTranslation";

const SignUpForm2 = ({ role }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const {
    nationalId,
    setNationalId,
    sellerType,
    iban,
    setIban,
    crNumber,
    setCrNumber,
    vatNumber,
    setVatNumber,
  } = useRegisterStore((state) => state);

  const [loading, setLoading] = useState(false);

  const [documents, setDocuments] = useState([]);
  const fileInputRef = useRef(null);

  const handleNextClick = async () => {
    if (loading) return;
    if (!nationalId) {
      toast.error(t("signup.enter_national_id"));
      return;
    }
    if ((sellerType || "").toUpperCase() === "BUSINESS") {
      if (!iban?.trim()) {
        toast.error(t("signup.enter_iban"));
        return;
      }
      if (!crNumber?.trim()) {
        toast.error(t("signup.enter_cr"));
        return;
      }
      if (!vatNumber?.trim()) {
        toast.error(t("signup.enter_vat"));
        return;
      }
    }
    try {
      setLoading(true);
      await new Promise((r) => setTimeout(r, 100));
      router.push(`/${role}/sign-up/password`);
    } catch (_) {
      // noop
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex w-full flex-col gap-5 px-2 py-10">
        <h1 className="text-lg md:text-2xl">
          {t("signup.verification_details")}
        </h1>
        <div className="flex w-full flex-col gap-1">
          <Label text={t("signup.national_id")} />
          <InputField
            placeholder={t("signup.enter_id_placeholder")}
            icon={profileIDIcon}
            value={nationalId}
            onChange={(e) => setNationalId(e.target.value)}
            type="text"
            autoFocus
            autoComplete="off"
          />
        </div>
        {(sellerType || "").toUpperCase() === "BUSINESS" && (
          <>
            <div className="flex w-full flex-col gap-1">
              <Label text={t("signup.bank_iban_encrypted")} />
              <InputField
                placeholder={t("signup.enter_iban_placeholder")}
                value={iban}
                onChange={(e) => setIban(e.target.value)}
                type="text"
                autoComplete="off"
              />
            </div>
            <div className="flex w-full flex-col gap-1">
              <Label text={t("signup.cr_number")} />
              <InputField
                placeholder={t("signup.enter_cr_placeholder")}
                value={crNumber}
                onChange={(e) => setCrNumber(e.target.value)}
                type="text"
                autoComplete="off"
              />
            </div>
            <div className="flex w-full flex-col gap-1">
              <Label text={t("signup.vat_number")} />
              <InputField
                placeholder={t("signup.enter_vat_placeholder")}
                value={vatNumber}
                onChange={(e) => setVatNumber(e.target.value)}
                type="text"
                autoComplete="off"
              />
            </div>
            <div className="flex w-full flex-col gap-2">
              <Label text={t("signup.upload_documents")} />
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="rounded-md border border-gray-200 bg-white px-4 py-2 text-sm hover:bg-gray-50"
                >
                  {t("signup.choose_files")}
                </button>
                <span className="text-sm text-gray-600">
                  {Array.isArray(documents) && documents.length > 0
                    ? t("signup.files_selected").replace(
                        "{count}",
                        String(documents.length),
                      )
                    : t("signup.no_file_chosen")}
                </span>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                onChange={(e) => setDocuments(Array.from(e.target.files || []))}
                className="hidden"
              />
            </div>
          </>
        )}
      </div>
      <div className="flex flex-col items-center gap-8 self-center">
        <div className="flex items-center gap-2">
          <RoundedButton
            type="button"
            onClick={handleNextClick}
            title={t("signup.next")}
            showIcon
            disabled={loading}
            loading={loading || undefined}
            className="min-w-72"
          />
        </div>
        <div className="flex items-center gap-1">
          {t("signup.already_account")}{" "}
          <CustomLink href={"/auth/" + role + "/login"}>
            {t("signup.sign_in")}
          </CustomLink>
        </div>
      </div>
    </>
  );
};

export default SignUpForm2;

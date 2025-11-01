"use client";

import { profileIDIcon } from "@/assets/icons/profile-icons";
import RoundedButton from "@/components/buttons/RoundedButton";
import InputField from "@/components/form-fields/InputField";
import Label from "@/components/form-fields/Label";
import CustomLink from "@/components/link/CustomLink";
import { useRegisterStore } from "@/providers/register-provider";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const SignUpForm2 = ({ role }) => {
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

  const handleNextClick = async () => {
    if (loading) return;
    if (!nationalId) {
      toast.error("Please enter National ID.");
      return;
    }
    if ((sellerType || "").toUpperCase() === "BUSINESS") {
      if (!iban?.trim()) {
        toast.error("Please enter IBAN.");
        return;
      }
      if (!crNumber?.trim()) {
        toast.error("Please enter CR Number.");
        return;
      }
      if (!vatNumber?.trim()) {
        toast.error("Please enter VAT Number.");
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
        <h1 className="text-lg md:text-2xl">Verification details</h1>
        <div className="flex w-full flex-col gap-1">
          <Label text="National ID" />
          <InputField
            placeholder="Enter your ID"
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
              <Label text="Bank IBAN (Encrypted)" />
              <InputField
                placeholder="Enter your IBAN"
                value={iban}
                onChange={(e) => setIban(e.target.value)}
                type="text"
                autoComplete="off"
              />
            </div>
            <div className="flex w-full flex-col gap-1">
              <Label text="CR Number" />
              <InputField
                placeholder="Enter your CR number"
                value={crNumber}
                onChange={(e) => setCrNumber(e.target.value)}
                type="text"
                autoComplete="off"
              />
            </div>
            <div className="flex w-full flex-col gap-1">
              <Label text="VAT Number" />
              <InputField
                placeholder="Enter VAT number"
                value={vatNumber}
                onChange={(e) => setVatNumber(e.target.value)}
                type="text"
                autoComplete="off"
              />
            </div>
            <div className="flex w-full flex-col gap-1">
              <Label text="Upload Documents" />
              <input
                type="file"
                multiple
                onChange={(e) => setDocuments(Array.from(e.target.files || []))}
                className="rounded-md border border-gray-200 px-4 py-3 text-sm"
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
            title="Next"
            showIcon
            disabled={loading}
            loading={loading || undefined}
            className="min-w-72"
          />
        </div>
        <div className="flex items-center gap-1">
          Already have an account?{" "}
          <CustomLink href={"/auth/" + role + "/login"}>Sign in</CustomLink>
        </div>
      </div>
    </>
  );
};

export default SignUpForm2;

"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import PageHeading from "@/components/headings/PageHeading";
import CustomerSupportBar from "@/components/sections/landing/profile/settings/customer-support/CustomerSupportBar";
import CustomerSupportContactForm from "@/components/sections/landing/profile/settings/customer-support/CustomerSupportContactForm";
import useTranslation from "@/hooks/useTranslation";

const CustomerSupportPage = () => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState("contact");
  const pathname = usePathname();
  const role = pathname.includes("/seller/") ? "seller" : "buyer";
  return (
    <div className="flex w-full flex-col items-center justify-center gap-5 px-3">
      <PageHeading>
        {t("seller.profile.profile")} {">"} {t("seller.profile.settings")} {">"}{" "}
        {t("seller.profile.support.title")}
      </PageHeading>
      <div className="flex w-full flex-col items-center justify-center pb-20 pt-10">
        <div className="no-scrollbar flex w-full max-w-xl items-center justify-center overflow-auto">
          <CustomerSupportBar
            selected={selected}
            setSelected={setSelected}
            role={role}
          />
        </div>
        {selected === "contact" && <CustomerSupportContactForm />}
        {selected === "whatsapp" && (
          <div className="flex flex-col items-center py-10">
            <p className="mb-2 text-lg font-semibold">
              {t("seller.profile.support.whatsapp_label")}
            </p>
            <a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="text-moonstone underline"
            >
              {t("seller.profile.support.open_whatsapp")}
            </a>
          </div>
        )}
        {selected === "email" && (
          <div className="flex flex-col items-center py-10">
            <p className="mb-2 text-lg font-semibold">
              {t("seller.profile.support.email_support")}
            </p>
            <a
              href="mailto:support@moqtanayati.com"
              className="text-moonstone underline"
            >
              support@moqtanayati.com
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerSupportPage;

"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import PageHeading from "@/components/headings/PageHeading";
import CustomerSupportBar from "@/components/sections/landing/profile/settings/customer-support/CustomerSupportBar";
import CustomerSupportContactForm from "@/components/sections/landing/profile/settings/customer-support/CustomerSupportContactForm";

const CustomerSupportPage = () => {
  const [selected, setSelected] = useState("contact");
  const pathname = usePathname();
  const role = pathname.includes("/seller/") ? "seller" : "buyer";
  return (
    <div className="flex w-full flex-col items-center justify-center gap-5 px-3">
      <PageHeading>
        Profile {">"} Settings {">"} Customer Support
      </PageHeading>  
      <div className="flex w-full flex-col items-center justify-center pb-20 pt-10">
        <div className="no-scrollbar flex w-full max-w-xl items-center justify-center overflow-auto">
          <CustomerSupportBar selected={selected} setSelected={setSelected} role={role} />
        </div>
        {selected === "contact" && <CustomerSupportContactForm />}
        {selected === "whatsapp" && (
          <div className="flex flex-col items-center py-10">
            <p className="text-lg font-semibold mb-2">Contact us on WhatsApp</p>
            <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="text-moonstone underline">Open WhatsApp</a>
          </div>
        )}
        {selected === "email" && (
          <div className="flex flex-col items-center py-10">
            <p className="text-lg font-semibold mb-2">Email Support</p>
            <a href="mailto:support@moqtanayati.com" className="text-moonstone underline">support@moqtanayati.com</a>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerSupportPage;

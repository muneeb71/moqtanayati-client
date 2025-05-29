import PageHeading from "@/components/headings/PageHeading";
import CustomerSupportBar from "@/components/sections/landing/profile/settings/customer-support/CustomerSupportBar";
import CustomerSupportContactForm from "@/components/sections/landing/profile/settings/customer-support/CustomerSupportContactForm";

const CustomerSupportPage = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-5 px-3">
      <PageHeading>
        Profile {">"} Settings {">"} Customer Support
      </PageHeading>
      <div className="flex w-full flex-col items-center justify-center pb-20 pt-10">
        <div className="no-scrollbar flex w-full max-w-xl items-center justify-center overflow-auto">
          <CustomerSupportBar />
        </div>
        <CustomerSupportContactForm />
      </div>
    </div>
  );
};

export default CustomerSupportPage;

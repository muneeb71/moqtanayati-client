import PageHeading from "@/components/headings/PageHeading";
import PaymentMethodsBar from "@/components/sections/landing/payment-methods/PaymentMethodsBar";

const PaymentMethodsLayout = ({ children }) => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-5 px-3">
      <PageHeading>Payment Methods</PageHeading>
      <div className="flex w-full max-w-7xl flex-col gap-5">
        <PaymentMethodsBar />
        {children}
      </div>
    </div>
  );
};

export default PaymentMethodsLayout;

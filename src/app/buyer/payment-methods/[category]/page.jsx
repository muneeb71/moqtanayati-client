import CreditCard from "@/components/sections/landing/payment-methods/CreditCard";
import { Plus } from "lucide-react";

const PaymentMethodsPage = () => {
  return (
    <div className="flex w-full flex-col gap-5 min-h-[40rem]">
      <button className="flex w-fit items-center gap-3 text-moonstone">
        <Plus />
        <span className="font-medium">Add Card</span>
      </button>
      <div className="flex flex-wrap items-center gap-7">
        <CreditCard />
        <CreditCard />
      </div>
    </div>
  );
};

export default PaymentMethodsPage;

"use client";

import RoundedButton from "@/components/buttons/RoundedButton";
import SellerTypeCard from "@/components/cards/SellerType";
import { sellerTypes } from "@/lib/seller-types";
import { useRegisterStore } from "@/providers/register-provider";
import { useRouter } from "next/navigation";

const ChooseSellerTypeForm = ({ role }) => {
  const router = useRouter();
  const { sellerType, setSellerType } = useRegisterStore((state) => state);

  return (
    <div className="flex flex-col gap-12">
      <p className="text-center text-[20px] font-medium">
        Choose Your Seller Type
      </p>
      <div className="flex flex-col gap-8">
        {sellerTypes.map((type) => (
          <SellerTypeCard
            key={type.value}
            className={`bg-[#EEF4FF] ${sellerType === type.value ? "border-2 border-moonstone" : "border-2 border-transparent"}`}
            title={type.label}
            description={type.desc}
            image={type.image}
            onClick={() => setSellerType(type.value)}
            isSelected={sellerType === type.value}
          />
        ))}
      </div>

      <RoundedButton
        title="Get Started"
        showIcon
        className="w-fit self-center px-16"
        onClick={() => router.push("/" + role + "/sign-up")}
      />
    </div>
  );
};

export default ChooseSellerTypeForm;

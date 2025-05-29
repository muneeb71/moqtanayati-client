"use client";

import RoundedButton from "@/components/buttons/RoundedButton";
import SellerTypeCard from "@/components/cards/SellerType";
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
        <SellerTypeCard
          className={`bg-[#EEF4FF] ${sellerType === "Individual Owner" ? "border-2 border-moonstone" : "border-2 border-white"}`}
          title="Individual Owner"
          description="Perfect for displaying singular items. No inventory management or auction access required."
          image="/static/individual.svg"
          onClick={() => setSellerType("Individual Owner")}
          isSelected={sellerType === "Individual Owner"}
          imageClassName="w-[140px] h-[60px]"
        />
        <SellerTypeCard
          className={`bg-[#FCF3FB] ${sellerType === "Business Owner" ? "border-2 border-moonstone" : "border-2 border-white"}`}
          title="Business Owner"
          description="For businesses with stock items. Includes online store, inventory management, and auction access."
          image="/static/business.svg"
          onClick={() => setSellerType("Business Owner")}
          isSelected={sellerType === "Business Owner"}
          imageClassName="w-[150px] h-[60px]"
        />
        <SellerTypeCard
          className={`bg-[#EEFCF5] ${sellerType === "Productive Family Owner" ? "border-2 border-moonstone" : "border-2 border-white"}`}
          title="Productive Family Owner"
          description="Ideal for family businesses selling homemade items and food products."
          image="/static/family.svg"
          onClick={() => setSellerType("Productive Family Owner")}
          isSelected={sellerType === "Productive Family Owner"}
          imageClassName="w-[110px] h-[60px]"
        />
      </div>

      <RoundedButton
        title="Get Started"
        showIcon
        className="w-fit self-center px-16"
        onClick={() => router.push("/auth/" + role + "/sign-up")}
      />
    </div>
  );
};

export default ChooseSellerTypeForm;

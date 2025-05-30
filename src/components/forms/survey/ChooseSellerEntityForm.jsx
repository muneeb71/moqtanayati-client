"use client";

import RoundedButton from "@/components/buttons/RoundedButton";
import SellerTypeCard from "@/components/cards/SellerType";
import { sellerEntities } from "@/lib/seller-entities";
import { useSurveyStore } from "@/providers/survey-store-provider";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ChooseSellerEntityForm = ({ role }) => {
  const router = useRouter();
  const { sellerEntity, setSellerEntity } = useSurveyStore((state) => state);

  return (
    <div className="flex flex-col gap-12 py-5">
      <div className="flex w-full flex-col gap-2">
        <Image src="/static/house.svg" width={40} height={40} alt="House" />
        <h1 className="text-2xl">Choose Your Seller Entity</h1>
        <span className="text-darkBlue/50">
          It will help you start your e-commerce business in a systematic and
          documented way
        </span>
      </div>
      <div className="flex flex-col gap-8">
        {sellerEntities.map((type) => (
          <SellerTypeCard
            key={type.value}
            className={`bg-[#EEF4FF] ${sellerEntity === type.value ? "border-2 border-moonstone" : "border-2 border-transparent"}`}
            title={type.label}
            description="Perfect for displaying singular items. No inventory management or auction access required."
            image={type.image}
            onClick={() => setSellerEntity(type.value)}
            isSelected={sellerEntity === type.value}
            imageClassName="w-[140px] h-[60px]"
          />
        ))}
      </div>

      <RoundedButton
        title="Get Started"
        showIcon
        className="w-fit self-center px-16"
        onClick={() => router.push("/auth/" + role + "/survey/start-selling")}
      />
    </div>
  );
};

export default ChooseSellerEntityForm;

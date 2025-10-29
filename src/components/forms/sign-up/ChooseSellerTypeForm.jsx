"use client";

import RoundedButton from "@/components/buttons/RoundedButton";
import SellerTypeCard from "@/components/cards/SellerType";
import { sellerTypes } from "@/lib/seller-types";
import { useRegisterStore } from "@/providers/register-provider";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ChooseSellerTypeForm = ({ role }) => {
  const router = useRouter();
  const { sellerType, setSellerType } = useRegisterStore((state) => state);

  const [loading, setLoading] = useState(false);

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

      <div className="w-fit self-center">
        <div className="flex items-center gap-2">
          <RoundedButton
            title={loading ? "Loading..." : "Get Started"}
            showIcon
            className="px-16"
            onClick={async () => {
              if (loading) return;
              setLoading(true);
              try {
                await new Promise((r) => setTimeout(r, 100));
                router.push("/" + role + "/sign-up");
              } catch (_) {
                setLoading(false);
              }
            }}
            disabled={loading}
            loading={loading.toString()}
          />
          {loading && (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChooseSellerTypeForm;

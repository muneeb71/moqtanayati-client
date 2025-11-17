"use client";

import RoundedButton from "@/components/buttons/RoundedButton";
import SellerTypeCard from "@/components/cards/SellerType";
import { sellerTypes } from "@/lib/seller-types";
import { useRegisterStore } from "@/providers/register-provider";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useTranslation from "@/hooks/useTranslation";

const ChooseSellerTypeForm = ({ role }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { sellerType, setSellerType } = useRegisterStore((state) => state);

  const [loading, setLoading] = useState(false);

  return (
    <div className="flex flex-col gap-12">
      <p className="text-center text-[20px] font-medium">
        {t("signup.choose_seller_type")}
      </p>
      <div className="flex flex-col gap-8">
        {sellerTypes.map((type) => {
          const keyBase = `signup.seller_type.${type.value}`;
          const tTitle = t(`${keyBase}.title`);
          const tDesc = t(`${keyBase}.desc`);
          const title = tTitle === `${keyBase}.title` ? type.label : tTitle;
          const description = tDesc === `${keyBase}.desc` ? type.desc : tDesc;
          return (
            <SellerTypeCard
              key={type.value}
              className={`bg-[#EEF4FF] ${sellerType === type.value ? "border-2 border-moonstone" : "border-2 border-transparent"}`}
              title={title}
              description={description}
              image={type.image}
              onClick={() => setSellerType(type.value)}
              isSelected={sellerType === type.value}
            />
          );
        })}
      </div>

      <div className="w-fit self-center">
        <div className="flex items-center gap-2">
          <RoundedButton
            title={loading ? t("common.loading") : t("signup.get_started")}
            showIcon
            className="px-16"
            onClick={async () => {
              if (loading) return;
              setLoading(true);
              try {
                await new Promise((r) => setTimeout(r, 100));
                router.push("/" + role + "/sign-up");
              } catch (_) {
                // noop
              } finally {
                setLoading(false);
              }
            }}
            disabled={loading}
            loading={loading || undefined}
          />
        </div>
      </div>
    </div>
  );
};

export default ChooseSellerTypeForm;

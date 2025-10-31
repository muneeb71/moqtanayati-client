"use client";

import RoundedButton from "@/components/buttons/RoundedButton";
import SellerTypeCard from "@/components/cards/SellerType";
import { sellerEntities } from "@/lib/seller-entities";
import { useSurveyStore } from "@/providers/survey-store-provider";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useTranslation from "@/hooks/useTranslation";

const ChooseSellerEntityForm = ({ userData }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { sellerEntity, setSellerEntity } = useSurveyStore((state) => state);
  const [navigating, setNavigating] = useState(false);

  const handleGetStarted = () => {
    setNavigating(true);
    router.push("/survey/start-selling");
  };

  return (
    <div className="flex flex-col gap-12 py-5">
      <div className="flex w-full flex-col gap-2">
        <Image src="/static/house.svg" width={40} height={40} alt="House" />
        <h1 className="text-2xl">{t("survey.entity.title")}</h1>
        <span className="text-darkBlue/50">{t("survey.entity.subtitle")}</span>
      </div>
      <div className="flex flex-col gap-8">
        {sellerEntities.map((type) => {
          const base = `survey.entity.types.${type.value}`;
          const titleTr = t(`${base}.title`);
          const descTr = t(`${base}.desc`);
          const title = titleTr === `${base}.title` ? type.label : titleTr;
          const description =
            descTr === `${base}.desc` ? type.desc || "" : descTr;
          return (
            <SellerTypeCard
              key={type.value}
              className={`bg-[#EEF4FF] ${sellerEntity === type.value ? "border-2 border-moonstone" : "border-2 border-transparent"}`}
              title={title}
              description={description}
              image={type.image}
              onClick={() => setSellerEntity(type.value)}
              isSelected={sellerEntity === type.value}
              imageClassName="w-[140px] h-[60px]"
            />
          );
        })}
      </div>

      <RoundedButton
        title={
          navigating
            ? t("survey.common.starting")
            : t("survey.common.get_started")
        }
        showIcon={!navigating}
        loading={navigating || undefined}
        className="w-fit self-center px-16"
        onClick={handleGetStarted}
        disabled={navigating}
      />
    </div>
  );
};

export default ChooseSellerEntityForm;

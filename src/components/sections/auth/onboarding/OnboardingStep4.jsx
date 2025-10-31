"use client";

import Image from "next/image";
import RoundedButton from "@/components/buttons/RoundedButton";
import { useState } from "react";
import useTranslation from "@/hooks/useTranslation";

const Feature = ({ title, desc }) => (
  <div className="rounded-xl border border-gray-200 p-4">
    <h4 className="text-base font-semibold text-eerieBlack">{title}</h4>
    <p className="text-sm text-darkBlue/60">{desc}</p>
  </div>
);

const OnboardingStep4 = ({ onNext, onBack }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  return (
    <div className="relative flex w-full flex-col items-center gap-6 p-6 md:p-12">
      {/* Back button provided by layout */}
      <div className="mx-auto max-w-xl">
        <h2 className="mb-2 text-3xl font-semibold text-eerieBlack">
          {t("onboarding.step4.title")}
        </h2>
        <p className="text-darkBlue/60">{t("onboarding.step4.subtitle")}</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Feature
          title={t("onboarding.step4.features.rank")}
          desc={t("onboarding.step4.features.rank_desc")}
        />
        <Feature
          title={t("onboarding.step4.features.discounts")}
          desc={t("onboarding.step4.features.discounts_desc")}
        />
        <Feature
          title={t("onboarding.step4.features.affiliates")}
          desc={t("onboarding.step4.features.affiliates_desc")}
        />
        <Feature
          title={t("onboarding.step4.features.campaigns")}
          desc={t("onboarding.step4.features.campaigns_desc")}
        />
        <Feature
          title={t("onboarding.step4.features.advertise")}
          desc={t("onboarding.step4.features.advertise_desc")}
        />
        <Feature
          title={t("onboarding.step4.features.highlight")}
          desc={t("onboarding.step4.features.highlight_desc")}
        />
      </div>
      <div className="mx-auto mt-10">
        <RoundedButton
          title={loading ? t("common.loading") : t("onboarding.common.next")}
          onClick={() => {
            if (loading) return;
            setLoading(true);
            onNext();
          }}
          showIcon={!loading}
          loading={loading || undefined}
          className="px-20"
        />
      </div>
    </div>
  );
};

export default OnboardingStep4;

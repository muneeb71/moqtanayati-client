"use client";

import { dummyFaqs } from "@/lib/dummy-faqs";
import { cn } from "@/lib/utils";
import { useState } from "react";
import useTranslation from "@/hooks/useTranslation";

const FaqSection = ({ category, subCategory }) => {
  const { t } = useTranslation();
  const [selectedFaq, setSelectedFaq] = useState(dummyFaqs[0]);
  return (
    <div className="grid w-full max-w-7xl gap-10 py-5 md:grid-cols-[364px_1fr]">
      <div className="flex w-full flex-col gap-5">
        <h1 className="text-4xl font-semibold tracking-[-1.29px] text-russianViolet">
          {t("seller.help_center.faqs_title")}
        </h1>
        <div className="flex w-full flex-col gap-2">
          {dummyFaqs.map((faq, index) => (
            <button
              onClick={() => setSelectedFaq(faq)}
              key={index}
              className={cn(
                "rounded px-3 py-3 text-start text-xs font-semibold",
                selectedFaq.question == faq.question
                  ? "bg-russianViolet text-white"
                  : "bg-[#F8F7FB] text-eerieBlack",
              )}
            >
              {faq.question}
            </button>
          ))}
        </div>
      </div>
      <div className="flex w-full flex-col gap-5">
        <h1 className="text-4xl font-semibold tracking-[-1.29px] text-moonstone">
          {t("seller.help_center.answer_title")}
        </h1>
        <div className="max-w-sm rounded-lg bg-moonstone p-6 pb-12 text-white">
          {selectedFaq.answer}
        </div>
      </div>
    </div>
  );
};

export default FaqSection;

"use client";

import { dummyFaqs } from "@/lib/dummy-faqs";
import { cn } from "@/lib/utils";
import { useState } from "react";

const UserGuidesSection = ({ category, subCategory }) => {
  const [selectedFaq, setSelectedFaq] = useState(dummyFaqs[0]);
  return (
    <div className="grid w-full max-w-7xl gap-10 py-5 md:grid-cols-[364px_1fr]">
      <div className="flex w-full flex-col gap-5">
        <h1 className="text-4xl font-semibold tracking-[-1.29px] text-russianViolet">
          User Guide
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
      <div className="rounded-2xl border border-[#DDDFE2] bg-[#F8F7FB] p-6 pb-12">
        {selectedFaq.answer}
      </div>
    </div>
  );
};

export default UserGuidesSection;

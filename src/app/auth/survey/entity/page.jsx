"use client";

import { useState } from "react";
import { Home, User, Building2, HeartHandshake, ChevronRight } from "lucide-react";
import Link from "next/link";

const entities = [
  {
    label: "Individual Seller",
    desc: "Perfect for displaying singular items. No inventory management or auction access required.",
    icon: <User className="w-6 h-6 text-moonstone" />,
    bg: "bg-moonstone/10",
    border: "border-transparent",
    text: "text-moonstone"
  },
  {
    label: "Established Company",
    desc: "For businesses with stock items. Includes online store, inventory management, and auction access.",
    icon: <Building2 className="w-6 h-6 text-russianViolet" />,
    bg: "bg-russianViolet/10",
    border: "border-transparent",
    text: "text-russianViolet"
  },
  {
    label: "Charitable Association",
    desc: "Ideal for family businesses. Includes buying and selling to fund meaningful causes and community impact",
    icon: <HeartHandshake className="w-6 h-6 text-shamrockGreen" />,
    bg: "bg-shamrockGreen/10",
    border: "border-transparent",
    text: "text-shamrockGreen"
  }
];

const Page = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  return (
    <div className="flex flex-col items-center justify-center px-4">
      <div className="flex flex-col w-full max-w-xs">
        <img src="/auth/house.svg" className="w-8 h-8 text-moonstone mb-4" />
        <h1 className="text-2xl text-black mb-2 text-start">Choose your Entity</h1>
        <p className="text-darkBlue/50 text-start text-base mb-7">
          It will help you start your e-commerce business in a systematic and documented way
        </p>
        <div className="flex flex-col gap-4 w-full mb-8">
          {entities.map((e, i) => {
            const isSelected = i === selectedIndex;
            return (
              <div
                key={e.label}
                onClick={() => setSelectedIndex(i)}
                className={`
                  rounded-xl px-4 py-4 flex gap-3 items-start cursor-pointer transition
                  ${e.bg} ${e.border}
                  ${isSelected ? "ring-2 ring-offset-2 ring-moonstone" : ""}
                  ${isSelected ? "bg-opacity-30" : ""}
                `}
              >
                <div className="flex-shrink-0 mt-1">{e.icon}</div>
                <div>
                  <div className={`text-base mb-0.5`}>{e.label}</div>
                  <div className="text-sm text-davyGray">{e.desc}</div>
                </div>
              </div>
            );
          })}
        </div>
        <Link
            href="/survey/questions"
          disabled={selectedIndex === null}
          className={`
            w-full flex items-center justify-center gap-2 bg-moonstone text-white text-base font-medium py-3 rounded-full shadow transition
            ${selectedIndex === null ? "opacity-50 cursor-not-allowed" : "hover:bg-moonstone/90"}
          `}
        >
          Next
          <ChevronRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
};

export default Page;

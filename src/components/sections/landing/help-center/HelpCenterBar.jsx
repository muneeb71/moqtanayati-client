"use client";

import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";

const HelpCenterBar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const helpCenterCategories = [
    { title: "FAQs", href: "faqs" },
    { title: "User Guides", href: "user-guides" },
  ];

  const helpCenterSubCategories = [
    { title: "All", href: "all" },
    { title: "Buying", href: "buying" },
    { title: "Selling", href: "selling" },
    { title: "Account", href: "account-management" },
  ];

  return (
    <div className="flex w-full flex-col">
      <div className="flex w-full items-center gap-2 border-b-[1.5px] border-[#F0F1F4] pb-5 md:gap-[18px]">
        {helpCenterCategories.map((helpCenterCategory, index) => (
          <button
            onClick={() =>
              router.push(
                "/help-center/" +
                  helpCenterCategory.href +
                  "/" +
                  helpCenterSubCategories[0].href,
              )
            }
            key={index}
            className={cn(
              "flex items-center justify-center rounded-[12px] border-[1.5px] px-3 py-1.5 md:px-5 md:py-2.5",
              pathname.includes("/help-center/" + helpCenterCategory.href)
                ? "border-moonstone bg-moonstone text-white"
                : "border-silver hover:border-moonstone hover:bg-moonstone/10",
            )}
          >
            {helpCenterCategory.title}
          </button>
        ))}
      </div>
      <div className="flex justify-between gap-5 py-5">
        <div className="flex items-center gap-3">
          {helpCenterSubCategories.map((helpCenterSubCategory, index) => (
            <button
              onClick={() =>
                router.push(
                  "/help-center" +
                    (pathname.includes("faqs") ? "/faqs/" : "/user-guides/") +
                    helpCenterSubCategory.href,
                )
              }
              key={index}
              className={cn(
                "flex items-center justify-center rounded-[8px] border px-2 py-1 text-xs md:px-3.5 md:py-2",
                pathname ===
                  "/help-center" +
                    (pathname.includes("faqs") ? "/faqs/" : "/user-guides/") +
                    helpCenterSubCategory.href
                  ? "border-moonstone bg-moonstone text-white"
                  : "border-silver hover:border-moonstone hover:bg-moonstone/10",
              )}
            >
              {helpCenterSubCategory.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HelpCenterBar;

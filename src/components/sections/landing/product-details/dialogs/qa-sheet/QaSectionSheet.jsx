"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import { useState } from "react";
import AskQuestion from "../../qa/AskQuestion";
import ProductQuestionsList from "../../qa/ProductQuestionsList";
import useTranslation from "@/hooks/useTranslation";

const QaSectionSheet = () => {
  const { t } = useTranslation();
  const params = useParams();
  const productId = params?.id;
  const [refreshKey, setRefreshKey] = useState(0);

  const handleQuestionAdded = () => {
    setRefreshKey((prev) => prev + 1);
  };
  return (
    <Sheet>
      <SheetTrigger
        className={cn(
          "h-[34.8px] text-nowrap rounded-[5.6px] bg-[#3F175F1A] px-3 text-xs text-[#3F175F] md:text-sm",
        )}
      >
        {t("seller.qa.section_title")}
      </SheetTrigger>
      <SheetContent className="h-[100vh] max-h-[100vh] w-full rounded-tl-[30px] border-none p-0 py-5 md:min-w-[483px]">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between border-b border-[#F0F1F4] pb-5 text-center text-[21px] font-medium text-darkBlue">
            <span className="w-full text-center">
              {t("seller.qa.section_title")}
            </span>
          </SheetTitle>
        </SheetHeader>
        <div className="flex h-full w-full flex-col">
          <div className="flex-1 overflow-y-auto pb-4">
            <ProductQuestionsList key={refreshKey} productId={productId} />
          </div>
          <div className="flex-shrink-0 border-t border-gray-200 bg-white pb-4">
            <AskQuestion
              productId={productId}
              onQuestionAdded={handleQuestionAdded}
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default QaSectionSheet;

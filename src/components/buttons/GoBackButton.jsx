"use client";

import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const GoBackButton = ({ className = "", onClick }) => {
  const router = useRouter();
  return (
    <button
      className={cn("flex items-center gap-1 md:text-[24px]", className)}
      onClick={onClick || (() => router.back())}
    >
      <ChevronLeft className="size-5 md:size-8" />
      <span className="hidden md:inline">Back</span>
    </button>
  );
};

export default GoBackButton;

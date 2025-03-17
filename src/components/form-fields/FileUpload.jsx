"use client";

import { cn } from "@/lib/utils";
import { UploadCloud } from "lucide-react";

const FileUpload = ({ className }) => {
  return (
    <div
      className={cn(
        "flex min-h-[150px] w-full cursor-pointer flex-col items-center justify-center rounded-[9.6px]",
        "border-[1.5px] border-dashed border-moonstone/50 p-5 hover:border-moonstone",
        className,
      )}
    >
      <UploadCloud className="size-7 text-[#3E3065]" />
      <p className="text-or Upload images mt-2 text-xs">or Upload images</p>
      <input type="file" className="hidden" />
    </div>
  );
};

export default FileUpload;

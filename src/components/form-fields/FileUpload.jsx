"use client";

import { cn } from "@/lib/utils";
import { UploadCloud } from "lucide-react";
import useTranslation from "@/hooks/useTranslation";

const FileUpload = ({ className, value, onChange }) => {
  const { t } = useTranslation();
  return (
    <label
      className={cn(
        "flex min-h-[150px] w-full cursor-pointer flex-col items-center justify-center rounded-[9.6px]",
        "border-[1.5px] border-dashed border-moonstone/50 p-5 hover:border-moonstone",
        className,
      )}
    >
      <UploadCloud className="size-7 text-[#3E3065]" />
      <p className="text-or Upload images mt-2 text-xs">
        {t("seller.store.or_upload_images")}
      </p>
      <input
        type="file"
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            onChange(e.target.files[0]);
          }
        }}
      />
      {value && (
        <span className="mt-2 text-xs text-moonstone">{value.name}</span>
      )}
    </label>
  );
};

export default FileUpload;

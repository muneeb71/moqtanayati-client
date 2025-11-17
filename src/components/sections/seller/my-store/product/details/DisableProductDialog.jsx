"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { updateProductStatus } from "@/lib/api/product/updateStatus";
import { cn } from "@/lib/utils";
import { useState } from "react";
import useTranslation from "@/hooks/useTranslation";

const DisableProductDialog = ({ product }) => {
  const { t } = useTranslation();
  const [status, setStatus] = useState(product.status);

  const handleDisableClick = async () => {
    let res;
    if (status === "ACTIVE") {
      res = await updateProductStatus(product.id, "DISABLED");
    } else if (status === "DISABLED") {
      res = await updateProductStatus(product.id, "ACTIVE");
    }
    if (res.status) setStatus(res.status);
  };

  return (
    <div className="flex h-[72px] w-fit items-center justify-between gap-10 rounded-[15px] border border-delftBlue/10 px-4 py-3.5">
      <span className="text-[17px] font-medium text-battleShipGray">
        {status === "DISABLED"
          ? t("seller.store.make_available")
          : t("seller.store.disable_product")}
      </span>
      <Dialog>
        <DialogTrigger
          className={cn(
            "flex h-[24px] w-[48px] items-center rounded-full px-[3px] py-[5px] transition-colors duration-300 ease-in-out",
            status === "DISABLED" ? "bg-[#9799A8]" : "bg-[#C1C2CB80]",
          )}
        >
          <div
            className={cn(
              "size-[19px] transform rounded-full transition-all duration-300 ease-in-out",
              status === "DISABLED"
                ? "translate-x-[24px] bg-white"
                : "translate-x-0 bg-[#9799A8]",
            )}
          ></div>
        </DialogTrigger>
        <DialogContent className="max-w-[350px] rounded-[24px] p-0 sm:max-w-[402px] sm:rounded-[24px]">
          <DialogHeader>
            <DialogTitle></DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center gap-10 pb-3">
            <div className="flex flex-col items-center gap-2">
              <span className="max-w-80 pt-6 text-center text-xl text-davyGray">
                {t("seller.store.disable_confirm").replace(
                  "{action}",
                  status === "ACTIVE"
                    ? t("seller.store.disable")
                    : t("seller.store.enable"),
                )}
              </span>
            </div>
            <div className="grid h-10 w-full grid-cols-2 px-5">
              <DialogClose>
                <div className="cursor-pointer border-r border-t border-black/10 py-3 text-center font-medium text-[#595C75] transition-all duration-200 ease-in hover:bg-black/10">
                  {t("seller.auctions.cancel")}
                </div>
              </DialogClose>
              <DialogClose onClick={() => handleDisableClick()}>
                <div className="border-t border-black/10 py-3 font-medium text-[#F94144] transition-all duration-200 ease-in hover:bg-black/10">
                  {status === "ACTIVE"
                    ? t("seller.store.disable")
                    : t("seller.store.enable")}
                </div>
              </DialogClose>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DisableProductDialog;

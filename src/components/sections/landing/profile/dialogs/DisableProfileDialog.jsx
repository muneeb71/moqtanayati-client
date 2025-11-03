import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import useTranslation from "@/hooks/useTranslation";

const DisableProfileDialog = () => {
  const { t } = useTranslation();
  return (
    <div className="flex h-[72px] w-full items-center justify-between rounded-[15px] border border-delftBlue/10 px-4 py-3.5">
      <span className="text-[17px] font-medium text-battleShipGray">
        {t("buyer.profile.settings.disable_profile.label")}
      </span>
      <Dialog>
        <DialogTrigger className="flex h-[24px] w-[48px] items-center rounded-full bg-[#C1C2CB80] px-[3px] py-[5px]">
          <div className="size-[19px] rounded-full bg-[#9799A8]"></div>
        </DialogTrigger>
        <DialogContent className="max-w-[350px] rounded-[24px] p-0 sm:max-w-[402px] sm:rounded-[24px]">
          <DialogHeader>
            <DialogTitle></DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center gap-10 pb-3">
            <div className="flex flex-col items-center gap-2">
              <h1 className="flex flex-col text-center text-[67.2px] font-medium leading-[81px]">
                😞
                <span className="text-center text-lg text-darkBlue md:text-[21.6px]">
                  {t("buyer.profile.settings.disable_profile.sad_title")}
                </span>
              </h1>
              <span className="max-w-[355px] text-center text-[16.8px] leading-[24px] text-battleShipGray">
                {t("buyer.profile.settings.disable_profile.sad_sub")}
              </span>
            </div>
            <div className="grid w-full grid-cols-2 px-5">
              <DialogClose asChild>
                <div className="border-r border-t border-black/10 py-3 text-center font-medium text-[#595C75] transition-all duration-200 ease-in hover:bg-black/10">
                  {t("buyer.profile.settings.disable_profile.cancel")}
                </div>
              </DialogClose>
              <button className="border-t border-black/10 py-3 font-medium text-[#F94144] transition-all duration-200 ease-in hover:bg-black/10">
                {t("buyer.profile.settings.disable_profile.disable")}
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DisableProfileDialog;

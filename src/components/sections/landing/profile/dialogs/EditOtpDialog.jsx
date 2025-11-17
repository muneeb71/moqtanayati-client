import RoundedButton from "@/components/buttons/RoundedButton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import OtpInput from "@/components/form-fields/OtpInput";
import CustomLink from "@/components/link/CustomLink";
import Label from "@/components/form-fields/Label";
import useTranslation from "@/hooks/useTranslation";

const EditOtpDialog = () => {
  const { t } = useTranslation();
  return (
    <Dialog>
      <DialogTrigger className="flex h-[64px] w-[80%] min-w-fit items-center justify-center gap-3 text-nowrap rounded-full bg-moonstone px-8 text-lg font-medium text-white transition-all duration-200 ease-in hover:bg-delftBlue disabled:bg-battleShipGray">
        {t("buyer.profile.settings.otp.trigger_save")}
      </DialogTrigger>
      <DialogContent className="max-w-[350px] rounded-[24px] sm:max-w-[471px] sm:rounded-[24px]">
        <DialogHeader>
          <DialogTitle className="border-b-[1.2px] border-[#F0F1F4] pb-4 text-center text-[21.6px] font-medium">
            {t("buyer.profile.settings.otp.title")}
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-20 py-5">
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-2xl text-darkBlue md:text-[33.6px] md:leading-[50.4px]">
              {t("buyer.profile.settings.otp.heading")}
            </h1>
            <span className="max-w-[399px] text-center text-xs md:text-[14.4px] md:leading-[29px]">
              {t("buyer.profile.settings.otp.sub")}
            </span>
          </div>
          <div className="flex flex-col items-center gap-3">
            <Label
              text={t("buyer.profile.settings.otp.enter_otp_label")}
              className="text-[19.2px]"
            />
            <OtpInput />
          </div>
          <div className="flex flex-col items-center gap-5">
            <RoundedButton
              title={t("buyer.profile.settings.otp.verify_save")}
            />
            <CustomLink className="text-sm font-medium">
              {t("buyer.profile.settings.otp.resend_otp")}
            </CustomLink>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditOtpDialog;

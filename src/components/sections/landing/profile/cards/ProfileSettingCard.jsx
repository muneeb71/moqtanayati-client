import DisableProfileDialog from "../dialogs/DisableProfileDialog";
import ChangePasswordDialog from "../dialogs/ChangePasswordDialog";
import useTranslation from "@/hooks/useTranslation";

const ProfileSettingCard = () => {
  const { t } = useTranslation();
  return (
    <div className="flex w-full flex-col gap-8 rounded-[20px] border border-black/10 px-4 py-6 md:h-[90%]">
      <h1 className="text-[32px] font-medium leading-[48px] text-darkBlue">
        {t("buyer.profile.settings_title")}
      </h1>
      <ChangePasswordDialog />
      <DisableProfileDialog />
    </div>
  );
};

export default ProfileSettingCard;

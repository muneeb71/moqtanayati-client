import DisableProfileDialog from "../dialogs/DisableProfileDialog";
import ChangePasswordDialog from "../dialogs/ChangePasswordDialog";

const ProfileSettingCard = () => {
  return (
    <div className="flex w-full flex-col gap-8 rounded-[20px] border border-black/10 px-4 py-6 md:h-[90%]">
      <h1 className="text-[32px] font-medium leading-[48px] text-darkBlue">
        Setting
      </h1>
      <ChangePasswordDialog />
      <DisableProfileDialog />
    </div>
  );
};

export default ProfileSettingCard;

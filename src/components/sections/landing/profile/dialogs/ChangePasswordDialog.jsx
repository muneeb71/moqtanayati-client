"use client";

import { lockIcon } from "@/assets/icons/input-icons";
import { chevronRightIcon } from "@/assets/icons/profile-icons";
import RoundedButton from "@/components/buttons/RoundedButton";
import InputField from "@/components/form-fields/InputField";
import Label from "@/components/form-fields/Label";
import CustomLink from "@/components/link/CustomLink";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { updateUserPassword } from "@/lib/api/profile/updatePassword";
import toast from "react-hot-toast";
import useTranslation from "@/hooks/useTranslation";

const ChangePasswordDialog = () => {
  const { t } = useTranslation();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Validation logic
  const isValid = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error(
        t("buyer.profile.settings.change_password.validations.all_required"),
      );
      return false;
    }
    if (newPassword.length < 6) {
      toast.error(
        t("buyer.profile.settings.change_password.validations.min_length"),
      );
      return false;
    }
    if (newPassword !== confirmPassword) {
      toast.error(
        t("buyer.profile.settings.change_password.validations.mismatch"),
      );
      return false;
    }
    if (currentPassword === newPassword) {
      toast.error(
        t("buyer.profile.settings.change_password.validations.same_as_current"),
      );
      return false;
    }
    return true;
  };

  const handleChangePassword = async () => {
    if (!isValid()) return;
    toast.error(t("buyer.profile.settings.change_password.not_available"));
    // setIsLoading(true);
    // try {
    //   const res = await updateUserPassword({
    //     currentPassword,
    //     newPassword,
    //     confirmNewPassword: confirmPassword,
    //   });
    //   if (res.success) {
    //     toast.success("Password updated successfully!");
    //     setCurrentPassword("");
    //     setNewPassword("");
    //     setConfirmPassword("");
    //   } else {
    //     toast.error(res.message || "Failed to update password");
    //   }
    // } catch (err) {
    //   toast.error(err.message || "An unexpected error occurred");
    // } finally {
    //   setIsLoading(false);
    // }
  };

  // Button should be disabled if any field is empty or loading
  const isButtonDisabled =
    isLoading || !currentPassword || !newPassword || !confirmPassword;

  return (
    <div className="border- flex flex-col border-b border-[#4D4D4D1A] pb-7">
      <Dialog>
        <DialogTrigger asChild>
          <button className="flex h-[72px] w-full items-center justify-between rounded-[15px] border border-delftBlue/10 bg-[#F8F7FB] px-4 py-3.5 transition-all duration-150 ease-in hover:border-delftBlue">
            <span className="text-[17px] text-delftBlue">
              {t("buyer.profile.settings.change_password.button")}
            </span>
            {chevronRightIcon}
          </button>
        </DialogTrigger>
        <DialogContent className="max-w-[350px] rounded-[24px] sm:max-w-[471px] sm:rounded-[24px]">
          <DialogHeader>
            <DialogTitle className="border-b-[1.2px] border-[#F0F1F4] pb-4 text-center text-[21.6px] font-medium">
              {t("buyer.profile.settings.change_password.title")}
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center gap-40 py-5">
            <div className="flex w-full flex-col gap-3 px-2">
              <div className="flex w-full flex-col gap-1">
                {/* <Label text="Current Password" /> */}
                <InputField
                  icon={lockIcon}
                  placeholder={t(
                    "buyer.profile.settings.change_password.placeholders.current",
                  )}
                  className="text-sm sm:text-base"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>
              <div className="flex w-full flex-col gap-1">
                {/* <Label text="New Password" /> */}
                <InputField
                  icon={lockIcon}
                  placeholder={t(
                    "buyer.profile.settings.change_password.placeholders.new",
                  )}
                  className="text-sm sm:text-base"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="flex w-full flex-col gap-1">
                {/* <Label text="Confirm Password" /> */}
                <InputField
                  icon={lockIcon}
                  placeholder={t(
                    "buyer.profile.settings.change_password.placeholders.confirm",
                  )}
                  className="text-sm sm:text-base"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col items-center gap-5">
              <RoundedButton
                title={
                  isLoading
                    ? t("buyer.profile.settings.change_password.actions.saving")
                    : t(
                        "buyer.profile.settings.change_password.actions.verify_save",
                      )
                }
                onClick={handleChangePassword}
                disabled={isButtonDisabled}
              />
              <CustomLink className="text-sm font-medium">
                {t("buyer.profile.settings.change_password.actions.resend_otp")}
              </CustomLink>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ChangePasswordDialog;

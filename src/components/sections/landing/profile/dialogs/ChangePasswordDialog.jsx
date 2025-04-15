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

const ChangePasswordDialog = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  return (
    <div className="border- flex flex-col border-b border-[#4D4D4D1A] pb-7">
      <Dialog>
        <DialogTrigger asChild>
          <button className="flex h-[72px] w-full items-center justify-between rounded-[15px] border border-delftBlue/10 bg-[#F8F7FB] px-4 py-3.5 transition-all duration-150 ease-in hover:border-delftBlue">
            <span className="text-[17px] text-delftBlue">Change Password</span>
            {chevronRightIcon}
          </button>
        </DialogTrigger>
        <DialogContent className="max-w-[350px] rounded-[24px] sm:max-w-[471px] sm:rounded-[24px]">
          <DialogHeader>
            <DialogTitle className="border-b-[1.2px] border-[#F0F1F4] pb-4 text-center text-[21.6px] font-medium">
              Change Password
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center gap-40 py-5">
            <div className="flex w-full flex-col gap-3 px-2">
              <div className="flex w-full flex-col gap-1">
                {/* <Label text="Current Password" /> */}
                <InputField
                  icon={lockIcon}
                  placeholder="Enter current password"
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
                  placeholder="Enter new password"
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
                  placeholder="Re-enter new password"
                  className="text-sm sm:text-base"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col items-center gap-5">
              <RoundedButton title="Verify & Save" />
              <CustomLink className="text-sm font-medium">
                Resend OTP
              </CustomLink>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ChangePasswordDialog;

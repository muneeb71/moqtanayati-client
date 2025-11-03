"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import InputField from "@/components/form-fields/InputField";
import Label from "@/components/form-fields/Label";
import RoundedButton from "@/components/buttons/RoundedButton";
import { updateUserProfile } from "@/lib/api/profile/updateProfile";
import toast from "react-hot-toast";
import useTranslation from "@/hooks/useTranslation";

const AddressChangeDialog = ({
  open,
  onOpenChange,
  onAddressUpdate,
  currentAddress,
  userId,
}) => {
  const { t } = useTranslation();
  const [newAddress, setNewAddress] = useState(currentAddress || "");
  const [loading, setLoading] = useState(false);

  const handleSaveAddress = async () => {
    if (!newAddress.trim()) {
      toast.error(t("buyer.address_dialog.toasts.enter_valid"));
      return;
    }

    try {
      setLoading(true);

      // Create FormData for the API call (as expected by updateUserProfile)
      const formData = new FormData();
      formData.append("address", newAddress.trim());

      const response = await updateUserProfile({
        userId: userId,
        data: formData,
      });

      if (response.success) {
        toast.success(t("buyer.address_dialog.toasts.updated"));
        onAddressUpdate(newAddress.trim());
        onOpenChange(false);
      } else {
        toast.error(
          response.message || t("buyer.address_dialog.toasts.update_failed"),
        );
      }
    } catch (error) {
      console.error("Address update error:", error);
      toast.error(t("buyer.address_dialog.toasts.update_failed_try_again"));
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setNewAddress(currentAddress || "");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-delftBlue">
            {t("buyer.address_dialog.title")}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-4">
          <div className="flex flex-col gap-2">
            <Label text={t("buyer.address_dialog.new_address")} />
            <textarea
              placeholder={t("buyer.address_dialog.placeholder")}
              value={newAddress}
              onChange={(e) => setNewAddress(e.target.value)}
              className="min-h-[100px] w-full resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-moonstone focus:outline-none focus:ring-1 focus:ring-moonstone"
              rows={4}
            />
          </div>

          <div className="flex gap-3 pt-2">
            <RoundedButton
              onClick={handleCancel}
              title={t("buyer.address_dialog.cancel")}
              className="flex-1 bg-gray-200 text-gray-700 hover:bg-gray-300"
            />
            <RoundedButton
              onClick={handleSaveAddress}
              title={
                loading
                  ? t("buyer.address_dialog.saving")
                  : t("buyer.address_dialog.save")
              }
              className="flex-1"
              disabled={loading}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddressChangeDialog;

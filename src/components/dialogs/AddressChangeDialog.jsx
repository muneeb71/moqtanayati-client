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

const AddressChangeDialog = ({
  open,
  onOpenChange,
  onAddressUpdate,
  currentAddress,
  userId,
}) => {
  const [newAddress, setNewAddress] = useState(currentAddress || "");
  const [loading, setLoading] = useState(false);

  const handleSaveAddress = async () => {
    if (!newAddress.trim()) {
      toast.error("Please enter a valid address");
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
        toast.success("Address updated successfully!");
        onAddressUpdate(newAddress.trim());
        onOpenChange(false);
      } else {
        toast.error(response.message || "Failed to update address");
      }
    } catch (error) {
      console.error("Address update error:", error);
      toast.error("Failed to update address. Please try again.");
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
            Change Delivery Address
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-4">
          <div className="flex flex-col gap-2">
            <Label text="New Address" />
            <textarea
              placeholder="Enter your new delivery address"
              value={newAddress}
              onChange={(e) => setNewAddress(e.target.value)}
              className="min-h-[100px] w-full resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-moonstone focus:outline-none focus:ring-1 focus:ring-moonstone"
              rows={4}
            />
          </div>

          <div className="flex gap-3 pt-2">
            <RoundedButton
              onClick={handleCancel}
              title="Cancel"
              className="flex-1 bg-gray-200 text-gray-700 hover:bg-gray-300"
            />
            <RoundedButton
              onClick={handleSaveAddress}
              title={loading ? "Saving..." : "Save Address"}
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

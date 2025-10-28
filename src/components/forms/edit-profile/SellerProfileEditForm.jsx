"use client";

import { useRef, useState } from "react";
import { envelopeIcon } from "@/assets/icons/input-icons";
import { profilePhoneIcon } from "@/assets/icons/profile-icons";
import {
  creditCardIcon,
  sellerLocationIcon,
  sellerProfileHouseIcon,
} from "@/assets/icons/seller-icons";
import RoundedButton from "@/components/buttons/RoundedButton";
import InputField from "@/components/form-fields/InputField";
import PageHeading from "@/components/headings/PageHeading";
import { ArrowLeft, PenLine, User as UserIcon } from "lucide-react";
import Image from "next/image";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { updateUserProfile } from "@/lib/api/profile/updateProfile";
import { useProfileStore } from "@/providers/profile-store-provider";

const SellerProfileEditForm = () => {
  const {
    id,
    name,
    phone,
    email,
    nationalId,
    address,
    avatar,
    joinedDate,
    setName,
    setPhone,
    setEmail,
    setNationalId,
    setAvatar,
    setAddress,
  } = useProfileStore((state) => state);

  const [avatarPreview, setAvatarPreview] = useState(
    typeof avatar === "string" ? avatar : null,
  );

  const fileInputRef = useRef(null);
  const [saving, setSaving] = useState(false);

  const router = useRouter();

  // Open file selector
  const handlePenClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(file); // Update store
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result); // JS automatically handles as string
      };
      reader.readAsDataURL(file);
    }
  };

  const hasAvatar =
    (avatarPreview && avatarPreview.trim() !== "") ||
    (avatar && typeof avatar === "string" && avatar.trim() !== "");

  const handleUpdateProfile = async () => {
    if (
      !name.trim() ||
      !phone.trim() ||
      !email.trim() ||
      !nationalId.trim() ||
      !address.trim()
    ) {
      toast.error("All fields are required.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?\d{7,15}$/;
    const nationalIdRegex = /^[0-9]{6,20}$/;

    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    if (!phoneRegex.test(phone)) {
      toast.error("Please enter a valid phone number.");
      return;
    }
    if (!nationalIdRegex.test(nationalId)) {
      toast.error("Please enter a valid national ID.");
      return;
    }

    // Prepare FormData with avatar file if it's a File object
    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("nationalId", nationalId);
    formData.append("address", address);

    if (avatar instanceof File) {
      formData.append("avatar", avatar);
    }

    try {
      // Better FormData debug
      console.log("profile data entries :");
      for (const [key, value] of formData.entries()) {
        console.log(key, value instanceof File ? `File(${value.name})` : value);
      }

      setSaving(true);
      console.log("formData : ", formData);
      const response = await updateUserProfile({ userId: id, data: formData });
      console.log("formData response : ", response);
      if (response.success) {
        const {
          name: newName,
          phone: newPhone,
          email: newEmail,
          nationalId: newNationalId,
          address: newAddress,
          avatar: newAvatar,
        } = response.data || {};

        // Update local store values including avatar URL
        setName(newName ?? name);
        setPhone(newPhone ?? phone);
        setEmail(newEmail ?? email);
        setNationalId(newNationalId ?? nationalId);
        setAddress(newAddress ?? address);
        if (newAvatar) {
          setAvatar(newAvatar);
          setAvatarPreview(
            typeof newAvatar === "string" ? newAvatar : avatarPreview,
          );
        }

        toast.success("Profile updated successfully");
        router.push("/seller/profile");
      } else {
        toast.error(response.error || "Failed to update profile");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-10 px-3 py-10">
      <div className="flex w-full max-w-4xl items-center justify-between">
        <PageHeading>
          <button
            type="button"
            onClick={() => router.push("/seller/profile")}
            className="flex items-center gap-2 py-1.5 text-sm text-black transition-colors hover:text-black"
          >
            <ArrowLeft className="size-4" />
            Back
          </button>
          Profile {">"} Edit Profile
        </PageHeading>
        <span className="invisible">placeholder</span>
      </div>
      <div className="flex w-full max-w-md flex-col items-center rounded-2xl border border-black/10 p-5 pt-10">
        {saving && (
          <div className="mb-3 w-full rounded-md bg-black/5 p-2 text-center text-sm text-battleShipGray">
            Saving...
          </div>
        )}
        <div className="relative flex w-fit items-center justify-center">
          <div className="flex size-32 items-center justify-center overflow-hidden rounded-full bg-gray-200">
            {hasAvatar ? (
              <Image
                className="size-32 min-w-32 object-cover"
                src={
                  typeof avatarPreview === "string"
                    ? avatarPreview
                    : typeof avatar === "string"
                      ? avatar
                      : ""
                }
                width={150}
                height={150}
                alt="user"
                quality={100}
                loading="lazy"
              />
            ) : (
              <UserIcon className="size-16 text-gray-400" />
            )}
          </div>

          <button
            type="button"
            className="absolute bottom-1 right-2 grid size-7 place-items-center rounded-full border border-white bg-russianViolet"
            onClick={handlePenClick}
            aria-label="Change profile picture"
          >
            <PenLine className="size-4 text-white" />
          </button>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleImageChange}
          />
        </div>

        <span className="mt-2 text-2xl font-medium">{name}</span>
        <span className="font-medium text-battleShipGray">
          Joined{" "}
          {joinedDate
            ? new Date(joinedDate).toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              })
            : ""}
        </span>

        <div className="flex w-full flex-col gap-3 pt-14">
          <InputField
            icon={sellerProfileHouseIcon}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <InputField
            icon={profilePhoneIcon}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <InputField
            icon={envelopeIcon}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            icon={creditCardIcon}
            value={nationalId}
            onChange={(e) => setNationalId(e.target.value)}
          />
          <InputField
            icon={sellerLocationIcon}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
      </div>
      <RoundedButton
        title={saving ? "Saving..." : "Save"}
        className={`w-72 ${saving ? "opacity-60" : ""}`}
        onClick={saving ? undefined : handleUpdateProfile}
      />
    </div>
  );
};

export default SellerProfileEditForm;

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
import { PenLine } from "lucide-react";
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
    setName,
    setPhone,
    setEmail,
    setNationalId,
    setAvatar,
    setAddress,
  } = useProfileStore((state) => state);

  const [avatarPreview, setAvatarPreview] = useState(avatar || null);
  const fileInputRef = useRef(null);
  const router = useRouter();

  const handlePenClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  let imageSrc = "/static/dummy-user/1.jpeg";
  if (
    avatarPreview &&
    typeof avatarPreview === "string" &&
    avatarPreview.trim() !== ""
  ) {
    imageSrc = avatarPreview;
  } else if (avatar && typeof avatar === "string" && avatar.trim() !== "") {
    imageSrc = avatar;
  }

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

    const data = {
      name,
      phone,
      email,
      nationalId,
      address,
      avatar,
    };
    const response = await updateUserProfile({ userId: id, data });
    if (response.success) {
      router.push("/seller/profile");
    } else {
      toast.error(response.error);
    }
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-10 px-3 py-10">
      <PageHeading>Profile {">"} Edit Profile</PageHeading>
      <div className="flex w-full max-w-md flex-col items-center rounded-2xl border border-black/10 p-5 pt-10">
        <div className="relative flex w-fit items-center justify-center">
          <Image
            className="size-32 min-w-32 rounded-full object-cover"
            src={imageSrc}
            width={150}
            height={150}
            alt="user"
            quality={100}
            loading="lazy"
          />
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
          Joined Jan, 2024
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
        title="Save"
        className="w-72"
        onClick={() => handleUpdateProfile()}
      />
    </div>
  );
};

export default SellerProfileEditForm;

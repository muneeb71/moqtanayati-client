"use client";

import InputField from "@/components/form-fields/InputField";
import Label from "@/components/form-fields/Label";
import Image from "next/image";
import {
  profileEmailIcon,
  profilePhoneIcon,
  profileUserIcon,
} from "@/assets/icons/profile-icons";
import { useState, useEffect, useRef } from "react";
import EditOtpDialog from "../dialogs/EditOtpDialog";
import { TiSocialAtCircular } from "react-icons/ti";
import { useSearchParams } from "next/navigation";
import { updateUserProfile } from "@/lib/api/profile/updateProfile";
import { useProfileStore } from "@/providers/profile-store-provider";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { PenLine, User as UserIcon } from "lucide-react";

const EditProfileCard = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { id, avatar: storeAvatar } = useProfileStore((state) => state);
  const fileInputRef = useRef(null);

  const nameFromParams = searchParams.get("name") || "";
  const emailFromParams = searchParams.get("email") || "";
  const phoneFromParams = searchParams.get("phone") || "";
  const joinedFromParams = searchParams.get("joined") || "";
  const avatarFromParams = searchParams.get("avatar") || "";

  const nameParts = nameFromParams.split(" ");
  const firstNameFromParams = nameParts[0] || "";
  const lastNameFromParams = nameParts.slice(1).join(" ") || "";

  const [firstName, setFirstName] = useState(firstNameFromParams);
  const [lastName, setLastName] = useState(lastNameFromParams);
  const [email, setEmail] = useState(emailFromParams);
  const [phone, setPhone] = useState(phoneFromParams);
  const [socialMedia, setSocialMedia] = useState("");
  const [joined, setJoined] = useState(joinedFromParams);
  const [isLoading, setIsLoading] = useState(false);
  const [avatar, setAvatar] = useState(storeAvatar || null);
  const [imgFailed, setImgFailed] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Store original values to compare for changes
  const [originalValues, setOriginalValues] = useState({
    firstName: firstNameFromParams,
    lastName: lastNameFromParams,
    email: emailFromParams,
    phone: phoneFromParams,
    socialMedia: "",
  });

  useEffect(() => {
    const nameParts = nameFromParams.split(" ");
    setFirstName(nameParts[0] || "");
    setLastName(nameParts.slice(1).join(" ") || "");
    setEmail(emailFromParams || "");
    setPhone(phoneFromParams || "");
    setJoined(joinedFromParams || "");
    setAvatar(avatarFromParams || storeAvatar || null);
    setImgFailed(false);

    // Update original values
    setOriginalValues({
      firstName: nameParts[0] || "",
      lastName: nameParts.slice(1).join(" ") || "",
      email: emailFromParams || "",
      phone: phoneFromParams || "",
      socialMedia: "",
    });
  }, [
    nameFromParams,
    emailFromParams,
    phoneFromParams,
    joinedFromParams,
    avatarFromParams,
    storeAvatar,
  ]);

  // Open file selector
  const handlePenClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => {
      setImagePreview(ev.target?.result || null);
      setImgFailed(false);
    };
    reader.readAsDataURL(file);
  };

  // Check if any field has changed
  const hasChanges = () => {
    return (
      firstName !== originalValues.firstName ||
      lastName !== originalValues.lastName ||
      email !== originalValues.email ||
      phone !== originalValues.phone ||
      socialMedia !== originalValues.socialMedia
    );
  };

  // Validate form fields
  const validateForm = () => {
    if (!firstName.trim()) {
      toast.error("First name is required");
      return false;
    }

    if (!email.trim()) {
      toast.error("Email is required");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    if (!phone.trim()) {
      toast.error("Phone number is required");
      return false;
    }

    const phoneRegex = /^\+?\d{7,15}$/;
    if (!phoneRegex.test(phone.replace(/\s/g, ""))) {
      toast.error("Please enter a valid phone number");
      return false;
    }

    return true;
  };

  const updateProfile = async () => {
    if (!validateForm()) {
      return;
    }

    if (!hasChanges()) {
      toast.error("No changes detected");
      return;
    }

    setIsLoading(true);

    try {
      const name = [firstName.trim(), lastName.trim()]
        .filter(Boolean)
        .join(" ");

      // Build multipart form data so avatar can be updated for all users
      const form = new FormData();
      form.append("name", name);
      form.append("email", email.trim());
      form.append("phone", phone.trim());
      // If a new image picked, append file; else, if existing avatar URL, pass avatar
      if (imageFile) {
        form.append("avatar", imageFile);
      } else if (avatar) {
        form.append("avatar", avatar);
      }

      const response = await updateUserProfile({
        userId: id,
        data: form,
      });

      if (response.success) {
        toast.success("Profile updated successfully!");
        // Update original values to reflect the new state
        setOriginalValues({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          avatar: avatar,
          // socialMedia: socialMedia.trim(),
        });
        // Redirect back to profile page
        router.push("/buyer/profile");
      } else {
        toast.error(response.message || "Failed to update profile");
      }
    } catch (error) {
      console.log("Error updating profile:", error);
      toast.error(error.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex w-full max-w-[446px] flex-col items-center gap-5 md:gap-7">
      <div className="flex w-full flex-col gap-2 rounded-[20px] border border-black/10 p-3">
        <div className="flex flex-col items-center">
          <div className="relative mb-2">
            <div className="flex size-32 items-center justify-center overflow-hidden rounded-full bg-gray-200">
              {imagePreview ? (
                <Image
                  className="z-0 size-32 min-w-32 object-cover"
                  src={imagePreview}
                  width={150}
                  height={150}
                  alt="user"
                  quality={100}
                  loading="lazy"
                />
              ) : avatar && avatar.trim() !== "" && !imgFailed ? (
                <Image
                  className="z-0 size-32 min-w-32 object-cover"
                  src={(() => {
                    const isAbsolute = /^https?:\/\//i.test(avatar);
                    if (isAbsolute) return avatar;
                    const base = process.env.NEXT_PUBLIC_API_BASE_URL || "";
                    return `${base.replace(/\/$/, "")}${avatar.startsWith("/") ? "" : "/"}${avatar}`;
                  })()}
                  width={150}
                  height={150}
                  alt="user"
                  quality={100}
                  loading="lazy"
                  onError={() => setImgFailed(true)}
                />
              ) : (
                <UserIcon className="size-16 text-gray-400" />
              )}
            </div>
            <button
              type="button"
              className="absolute bottom-1 right-2 z-20 grid size-7 place-items-center rounded-full border border-white bg-russianViolet"
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
          <h1 className="text-center text-[21.6px] font-medium text-darkBlue">
            {firstName} {lastName}
          </h1>
          <span className="text-[14.4px] font-medium text-battleShipGray">
            Joined {joined}
          </span>
        </div>
        <div className="flex w-full flex-col gap-5 px-2 py-10">
          <div className="flex w-full flex-col gap-1">
            <InputField
              icon={profileUserIcon}
              value={firstName}
              placeholder="First Name"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="flex w-full flex-col gap-1">
            <InputField
              icon={profileUserIcon}
              value={lastName}
              placeholder="Last Name"
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="flex w-full flex-col gap-1">
            <InputField
              icon={profileEmailIcon}
              type="email"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex w-full flex-col gap-1">
            <InputField
              icon={profilePhoneIcon}
              value={phone}
              placeholder="Phone"
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="flex w-full flex-col gap-1">
            {/* <InputField
              icon={<TiSocialAtCircular />}
              iconClassName="text-moonstone text-[23px]"
              value={socialMedia}
              placeholder="Social Media"
              onChange={(e) => setSocialMedia(e.target.value)}
              customIcon={true}
            /> */}
          </div>
        </div>
      </div>

      {/* Custom Save Button */}
      <button
        onClick={updateProfile}
        disabled={!hasChanges() || isLoading}
        className={`flex h-[64px] w-[80%] min-w-fit items-center justify-center gap-3 text-nowrap rounded-full px-8 text-lg font-medium text-white transition-all duration-200 ease-in disabled:bg-battleShipGray ${
          hasChanges() && !isLoading
            ? "bg-moonstone hover:bg-delftBlue"
            : "cursor-not-allowed bg-battleShipGray"
        }`}
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
            Updating...
          </div>
        ) : (
          "Save"
        )}
      </button>
    </div>
  );
};

export default EditProfileCard;

"use client";

import InputField from "@/components/form-fields/InputField";
import Label from "@/components/form-fields/Label";
import Image from "next/image";
import {
  profileEmailIcon,
  profilePhoneIcon,
  profileUserIcon,
} from "@/assets/icons/profile-icons";
import { useState, useEffect } from "react";
import EditOtpDialog from "../dialogs/EditOtpDialog";
import { TiSocialAtCircular } from "react-icons/ti";
import { useSearchParams } from "next/navigation";
import { updateUserProfile } from "@/lib/api/profile/updateProfile";
import { useProfileStore } from "@/providers/profile-store-provider";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const EditProfileCard = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { id } = useProfileStore((state) => state);
  
  const nameFromParams = searchParams.get('name') || '';
  const emailFromParams = searchParams.get('email') || '';
  const phoneFromParams = searchParams.get('phone') || '';
  const joinedFromParams = searchParams.get('joined') || '';
  
  const nameParts = nameFromParams.split(' ');
  const firstNameFromParams = nameParts[0] || '';
  const lastNameFromParams = nameParts.slice(1).join(' ') || '';

  const [firstName, setFirstName] = useState(firstNameFromParams);
  const [lastName, setLastName] = useState(lastNameFromParams);
  const [email, setEmail] = useState(emailFromParams);
  const [phone, setPhone] = useState(phoneFromParams);
  const [socialMedia, setSocialMedia] = useState("");
  const [joined, setJoined] = useState(joinedFromParams);
  const [isLoading, setIsLoading] = useState(false);

  // Store original values to compare for changes
  const [originalValues, setOriginalValues] = useState({
    firstName: firstNameFromParams,
    lastName: lastNameFromParams,
    email: emailFromParams,
    phone: phoneFromParams,
    socialMedia: ""
  });

  useEffect(() => {
    const nameParts = nameFromParams.split(' ');
    setFirstName(nameParts[0] || "Alex");
    setLastName(nameParts.slice(1).join(' ') || "Johns");
    setEmail(emailFromParams || "alexjhons@moqtanayati.com");
    setPhone(phoneFromParams || "+92 3336613900");
    setJoined(joinedFromParams || "Jan, 2024");
    
    // Update original values
    setOriginalValues({
      firstName: nameParts[0] || "Alex",
      lastName: nameParts.slice(1).join(' ') || "Johns",
      email: emailFromParams || "alexjhons@moqtanayati.com",
      phone: phoneFromParams || "+92 3336613900",
      socialMedia: ""
    });
  }, [nameFromParams, emailFromParams, phoneFromParams, joinedFromParams]);

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
    if (!firstName.trim() || !lastName.trim()) {
      toast.error("First name and last name are required");
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
    if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
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
      const name = `${firstName.trim()} ${lastName.trim()}`;
      const data = {
        name,
        email: email.trim(),
        phone: phone.trim(),
        socialMedia: socialMedia.trim()
      };

      const response = await updateUserProfile({
        userId: id,
        data
      });

      if (response.success) {
        toast.success("Profile updated successfully!");
        // Update original values to reflect the new state
        setOriginalValues({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          socialMedia: socialMedia.trim()
        });
        // Redirect back to profile page
        router.push("/buyer/profile");
      } else {
        toast.error(response.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex w-full max-w-[446px] flex-col items-center gap-5 md:gap-7">
      <div className="flex w-full flex-col gap-2 rounded-[20px] border border-black/10 p-3">
        <div className="flex flex-col items-center">
          <div className="mb-2 grid size-[128px] place-items-center overflow-hidden rounded-full">
            <Image
              src="/static/dummy-user/1.jpeg"
              width={100}
              height={100}
              alt="User profile image"
              className="h-full w-full object-cover"
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
            <InputField
              icon={<TiSocialAtCircular />}
              iconClassName="text-moonstone text-[23px]"
              value={socialMedia}
              placeholder="Social Media"
              onChange={(e) => setSocialMedia(e.target.value)}
              customIcon={true}
            />
          </div>
        </div>
      </div>
      
      {/* Custom Save Button */}
      <button
        onClick={updateProfile}
        disabled={!hasChanges() || isLoading}
        className={`flex h-[64px] w-[80%] min-w-fit items-center justify-center gap-3 text-nowrap rounded-full px-8 text-lg font-medium text-white transition-all duration-200 ease-in disabled:bg-battleShipGray ${
          hasChanges() && !isLoading 
            ? 'bg-moonstone hover:bg-delftBlue' 
            : 'bg-battleShipGray cursor-not-allowed'
        }`}
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
            Updating...
          </div>
        ) : (
          'Save'
        )}
      </button>
    </div>
  );
};

export default EditProfileCard;

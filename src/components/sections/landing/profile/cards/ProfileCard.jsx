"use client";

import InputField from "@/components/form-fields/InputField";
import Label from "@/components/form-fields/Label";
import Image from "next/image";
import {
  profileEmailIcon,
  profilePenIcon,
  profilePhoneIcon,
  profileUserIcon,
} from "@/assets/icons/profile-icons";
import { useState } from "react";
import Link from "next/link";
import { TiSocialAtCircular } from "react-icons/ti";


const ProfileCard = () => {
  const [name, setName] = useState("Alex");
  const [email, setEmail] = useState("alexjhons@moqtanayati.com");
  const [phone, setPhone] = useState("+92 3336613900");
  const [socialMedia, setSocialMedia] = useState("https://www.instagram.com/alexjhons/");


  return (
    <div className="flex w-full flex-col gap-2 rounded-[20px] border border-black/10 p-3">
      <Link
        href="/profile/edit"
        className="flex items-center gap-1 self-end rounded-full border border-delftBlue/20 px-2 py-1.5 text-[14px] font-medium text-delftBlue hover:border-delftBlue"
      >
        {profilePenIcon} Edit Profile
      </Link>
      <div className="flex flex-col items-center">
        <div className="mb-2 grid size-[128px] place-items-center overflow-hidden rounded-full">
          <Image
            src="/dummy-user/1.jpeg"
            width={100}
            height={100}
            alt="User profile image"
            className="h-full w-full object-cover"
          />
        </div>
        <h1 className="text-center text-[21.6px] font-medium text-darkBlue">
          Alex Jhons
        </h1>
        <span className="text-[14.4px] font-medium text-battleShipGray">
          Joined Jan, 2024
        </span>
      </div>
      <div className="flex w-full flex-col gap-5 px-2 py-10">
        <div className="flex w-full flex-col gap-1">
          <Label className="text-normal leading-[25px]" text="Full Name" />
          <InputField
            icon={profileUserIcon}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex w-full flex-col gap-1">
          <Label className="text-normal leading-[25px]" text="Email" />
          <InputField
            icon={profileEmailIcon}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex w-full flex-col gap-1">
          <Label className="text-normal leading-[25px]" text="Phone" />
          <InputField
            icon={profilePhoneIcon}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
          <div className="flex w-full flex-col gap-1">
            <Label className="text-normal leading-[25px]" text="Social Media" />
            <InputField
              icon={<TiSocialAtCircular />
              }
              iconClassName="text-moonstone text-[23px]"
              value={socialMedia}
              onChange={(e) => setSocialMedia(e.target.value)}
              customIcon={true}
            />
          </div>
      </div>
    </div>
  );
};

export default ProfileCard;

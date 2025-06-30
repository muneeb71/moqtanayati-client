"use client";

import InputField from "@/components/form-fields/InputField";
import Image from "next/image";
import {
  profileEmailIcon,
  profilePenIcon,
  profilePhoneIcon,
  profileUserIcon,
} from "@/assets/icons/profile-icons";
import { useEffect, useState } from "react";
import Link from "next/link";
import { TiSocialAtCircular } from "react-icons/ti";
import { getUserProfile } from "@/lib/api/profile/getProfile";

const ProfileCard = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [socialMedia, setSocialMedia] = useState("");
  const [joined, setJoined] = useState("");

  const getProfile = async () => {
    const res = await getUserProfile();  
    setName(res?.data?.name);
    setEmail(res?.data?.email);
    setPhone(res?.data?.phone);
    setSocialMedia()
    setJoined(res?.data?.joinedDate)
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className="flex w-full flex-col gap-2 rounded-[20px] border border-black/10 p-3">
      <Link
        href={`/buyer/profile/edit?name=${name}&email=${email}&phone=${phone}&joined=${joined}`}
        className="flex items-center gap-1 self-end rounded-full border border-delftBlue/20 px-2 py-1.5 text-[14px] font-medium text-delftBlue hover:border-delftBlue"
      >
        {profilePenIcon} Edit Profile
      </Link>
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
          {name}
        </h1>
        <span className="text-[14.4px] font-medium text-battleShipGray">
          Joined {joined}
        </span>
      </div>
      <div className="flex w-full flex-col gap-5 px-2 py-10">
        <div className="flex w-full flex-col gap-1">
          {/* <Label className="text-normal leading-[25px]" text="Full Name" /> */}
          <InputField
            icon={profileUserIcon}
            value={name}
            placeholder="Full Name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex w-full flex-col gap-1">
          {/* <Label className="text-normal leading-[25px]" text="Email" /> */}
          <InputField
            icon={profileEmailIcon}
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex w-full flex-col gap-1">
          {/* <Label className="text-normal leading-[25px]" text="Phone" /> */}
          <InputField
            icon={profilePhoneIcon}
            value={phone}
            placeholder="Phone"
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="flex w-full flex-col gap-1">
          {/* <Label className="text-normal leading-[25px]" text="Social Media" /> */}
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
  );
};

export default ProfileCard;

"use client";

import InputField from "@/components/form-fields/InputField";
import Label from "@/components/form-fields/Label";
import Image from "next/image";
import {
  profileEmailIcon,
  profilePhoneIcon,
  profileUserIcon,
} from "@/assets/icons/profile-icons";
import { useState } from "react";
import EditOtpDialog from "../dialogs/EditOtpDialog";
import { TiSocialAtCircular } from "react-icons/ti";


const EditProfileCard = () => {
  const [firstName, setFirstName] = useState("Alex");
  const [lastName, setLastName] = useState("Johns");
  const [email, setEmail] = useState("alexjhons@moqtanayati.com");
  const [phone, setPhone] = useState("+92 3336613900");
  const [socialMedia, setSocialMedia] = useState("https://www.instagram.com/alexjhons/");


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
            Alex Jhons
          </h1>
          <span className="text-[14.4px] font-medium text-battleShipGray">
            Joined Jan, 2024
          </span>
        </div>
        <div className="flex w-full flex-col gap-5 px-2 py-10">
          <div className="flex w-full flex-col gap-1">
            {/* <Label className="text-normal leading-[25px]" text="First Name" /> */}
            <InputField
              icon={profileUserIcon}
              value={firstName}
              placeholder="First Name"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="flex w-full flex-col gap-1">
            {/* <Label className="text-normal leading-[25px]" text="Last Name" /> */}
            <InputField
              icon={profileUserIcon}
              value={lastName}
              placeholder="Last Name"
              onChange={(e) => setLastName(e.target.value)}
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
              icon={<TiSocialAtCircular />
              }
              iconClassName="text-moonstone text-[23px]"
              value={socialMedia}
              placeholder="Social Media"
              onChange={(e) => setSocialMedia(e.target.value)}
              customIcon={true}
            />
          </div>
        </div>
      </div>
      <EditOtpDialog />
    </div>
  );
};

export default EditProfileCard;

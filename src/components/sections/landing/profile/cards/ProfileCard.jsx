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
import { useRouter } from "next/navigation";
import { TiSocialAtCircular } from "react-icons/ti";
import { getUserProfile } from "@/lib/api/profile/getProfile";
import useTranslation from "@/hooks/useTranslation";

const ProfileCard = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [socialMedia, setSocialMedia] = useState("");
  const [joined, setJoined] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [imgFailed, setImgFailed] = useState(false);

  const getProfile = async () => {
    const res = await getUserProfile();
    setName(res?.data?.name || "");
    setEmail(res?.data?.email || "");
    setPhone(res?.data?.phone || "");
    setSocialMedia(res?.data?.socialMedia || "");
    setJoined(res?.data?.joinedDate || "");
    setAvatar(
      res?.data?.avatar ||
        res?.data?.profileImage ||
        res?.data?.profile_image ||
        null,
    );
    setImgFailed(false);
  };

  useEffect(() => {
    getProfile();
  }, []);

  const [editLoading, setEditLoading] = useState(false);
  return (
    <div className="flex w-full flex-col gap-2 rounded-[20px] border border-black/10 p-3">
      <Link
        href={`/buyer/profile/edit?name=${name}&email=${email}&phone=${phone}&joined=${joined}&avatar=${encodeURIComponent(avatar || "")}`}
        className="relative flex items-center gap-1 self-end rounded-full border border-delftBlue/20 px-2 py-1.5 text-[14px] font-medium text-delftBlue hover:border-delftBlue"
        onClick={(e) => {
          if (editLoading) {
            e.preventDefault();
            return;
          }
          setEditLoading(true);
          e.preventDefault();
          router.push(
            `/buyer/profile/edit?name=${name}&email=${email}&phone=${phone}&joined=${joined}&avatar=${encodeURIComponent(avatar || "")}`,
          );
        }}
        aria-busy={editLoading || undefined}
      >
        {editLoading ? (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : (
          <>
            {profilePenIcon} {t("buyer.profile.edit_profile")}
          </>
        )}
      </Link>
      <div className="flex flex-col items-center">
        <div className="mb-2 grid size-[128px] place-items-center overflow-hidden rounded-full">
          {avatar && !imgFailed ? (
            <Image
              src={(() => {
                const isAbsolute = /^https?:\/\//i.test(avatar);
                if (isAbsolute) return avatar;
                const base = process.env.NEXT_PUBLIC_API_BASE_URL || "";
                return `${base.replace(/\/$/, "")}${avatar.startsWith("/") ? "" : "/"}${avatar}`;
              })()}
              width={100}
              height={100}
              alt="User profile image"
              className="h-full w-full object-cover"
              unoptimized
              onError={() => setImgFailed(true)}
            />
          ) : (
            <div className="grid size-[128px] place-items-center rounded-full bg-gray-200">
              <svg
                width="56"
                height="56"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-gray-500"
              >
                <path
                  d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5z"
                  fill="currentColor"
                />
                <path
                  d="M12 14c-4.418 0-8 3.582-8 8h16c0-4.418-3.582-8-8-8z"
                  fill="currentColor"
                />
              </svg>
            </div>
          )}
        </div>
        <h1 className="text-center text-[21.6px] font-medium text-darkBlue">
          {name}
        </h1>
        <span className="text-[14.4px] font-medium text-battleShipGray">
          {t("buyer.profile.joined_prefix")} {joined}
        </span>
      </div>
      <div className="flex w-full flex-col gap-5 px-2 py-10">
        <div className="flex w-full flex-col gap-1">
          {/* <Label className="text-normal leading-[25px]" text="Full Name" /> */}
          <InputField
            icon={profileUserIcon}
            value={name}
            placeholder={t("buyer.profile.placeholders.full_name")}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex w-full flex-col gap-1">
          {/* <Label className="text-normal leading-[25px]" text="Email" /> */}
          <InputField
            icon={profileEmailIcon}
            type="email"
            value={email}
            placeholder={t("buyer.profile.placeholders.email")}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex w-full flex-col gap-1">
          {/* <Label className="text-normal leading-[25px]" text="Phone" /> */}
          <InputField
            icon={profilePhoneIcon}
            value={phone}
            placeholder={t("buyer.profile.placeholders.phone")}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="flex w-full flex-col gap-1">
          {/* <Label className="text-normal leading-[25px]" text="Social Media" /> */}
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
  );
};

export default ProfileCard;

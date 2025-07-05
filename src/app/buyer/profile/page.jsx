"use client";

import PageHeading from "@/components/headings/PageHeading";
import ProfileCard from "@/components/sections/landing/profile/cards/ProfileCard";
import ProfileSettingCard from "@/components/sections/landing/profile/cards/ProfileSettingCard";

const ProfilePage = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-10 px-3 pb-20">
      <PageHeading>
        <span className="text-">Profile</span>
      </PageHeading>
      <div className="grid w-full max-w-[955px] place-items-end gap-5 md:grid-cols-2 md:gap-7">
        <ProfileCard />
        <ProfileSettingCard />
      </div>
    </div>
  );
};

export default ProfilePage;

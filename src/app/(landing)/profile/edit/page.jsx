"use client";

import RoundedButton from "@/components/buttons/RoundedButton";
import PageHeading from "@/components/headings/PageHeading";
import EditProfileCard from "@/components/sections/landing/profile/cards/EditProfileCard";

const EditProfilePage = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-10 px-3 pb-20">
      <PageHeading>
        <span className="text-">Profile</span>
      </PageHeading>
      <EditProfileCard />
    </div>
  );
};

export default EditProfilePage;

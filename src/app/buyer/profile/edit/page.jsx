"use client";

import RoundedButton from "@/components/buttons/RoundedButton";
import PageHeading from "@/components/headings/PageHeading";
import EditProfileCard from "@/components/sections/landing/profile/cards/EditProfileCard";
import { useRouter } from "next/navigation";

const EditProfilePage = () => {
  const router = useRouter();
  return (
    <div className="flex w-full flex-col items-center justify-center gap-10 px-3 pb-20">
      <PageHeading>
        <div className="flex flex-col gap-2">
          <div className="flex w-full justify-start">
            <button
              type="button"
              onClick={() => router.back()}
              className="ring-inse py-1 text-sm font-medium"
              aria-label="Go back"
            >
              ← Back
            </button>
          </div>
          <span className="text-sm md:text-[24px] md:leading-[36px]">
            Profile {">"} Edit Profile
          </span>
        </div>
      </PageHeading>
      <EditProfileCard />
    </div>
  );
};

export default EditProfilePage;

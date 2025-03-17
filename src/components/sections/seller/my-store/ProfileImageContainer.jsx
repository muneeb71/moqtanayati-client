import { PenLineIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

const ProfileImageContainer = () => {
  return (
    <div className="absolute -bottom-40 flex flex-col gap-3">
      <div className="relative">
        <div className="size-44 overflow-hidden rounded-full border-4 border-white">
          <Image
            src="/store/profile.jpeg"
            width={200}
            height={200}
            alt="wallpaper"
            loading="lazy"
            className="h-full w-full object-cover object-center"
          />
        </div>
        <button className="absolute bottom-2 right-5 grid size-8 place-items-center rounded-full border-2 border-white bg-darkBlue text-white">
          <PenLineIcon className="size-4" />
        </button>
      </div>
      <div className="flex flex-col items-center justify-center gap-1">
        <span className="text-3xl font-medium">Lorem</span>
        <span className="text-xl text-black/40">Created Jan, 2024</span>
      </div>
    </div>
  );
};

export default ProfileImageContainer;

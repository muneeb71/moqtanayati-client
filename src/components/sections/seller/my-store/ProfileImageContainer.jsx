"use client";

import { useProfileStore } from "@/providers/profile-store-provider";
import { PenLineIcon } from "lucide-react";
import Image from "next/image";
import React, { useRef, useState } from "react";

const ProfileImageContainer = () => {
  const store = useProfileStore((state) => state.store);
  const [preview, setPreview] = useState(
    store.image || "/static/store/profile.jpeg",
  );
  const fileInputRef = useRef(null);

  const handleEditClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  return (
    <div className="absolute -bottom-40 flex flex-col gap-3">
      <div className="relative w-fit self-center">
        <div className="size-44 overflow-hidden rounded-full border-4 border-white">
          <Image
            src={preview}
            width={200}
            height={200}
            alt="profile"
            loading="lazy"
            className="h-full w-full object-cover object-center"
          />
        </div>
        <button
          type="button"
          className="absolute bottom-2 right-5 grid size-8 place-items-center rounded-full border-2 border-white bg-darkBlue text-white"
          onClick={handleEditClick}
        >
          <PenLineIcon className="size-4" />
        </button>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
      <div className="flex flex-col items-center justify-center gap-1">
        <span className="text-xl md:text-3xl font-medium text-center">{store.name}</span>
        <span className="md:text-xl text-black/40">Created Jan, 2024</span>
      </div>
    </div>
  );
};

export default ProfileImageContainer;

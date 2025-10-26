"use client";

import { useEffect, useRef, useState } from "react";
import { PenLineIcon, ImageOff } from "lucide-react";
import Image from "next/image";
import { useProfileStore } from "@/providers/profile-store-provider";
import { updateSellerStore } from "@/lib/api/seller-store/editStoreImage";

const ProfileImageContainer = () => {
  const store = useProfileStore((state) => state.store);
  const setStore = useProfileStore((state) => state.setStore);

  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  // Set initial preview
  useEffect(() => {
    if (store?.image && store.image.trim() !== "") {
      setPreview(store.image);
    } else {
      setPreview(null); // no image initially
    }
  }, [store?.image]);

  const handleEditClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show local preview immediately
    setPreview(URL.createObjectURL(file));

    try {
      setUploading(true);

      // Upload to backend
      const uploadData = await updateSellerStore(store.id, file);
      const networkUrl = uploadData?.store.image;

      console.log("network url : ", networkUrl);

      if (!networkUrl) {
        console.error("No file URL returned from upload");
        return;
      }

      // Update store state
      setStore({
        ...store,
        image: networkUrl,
      });
    } catch (err) {
      console.error("Error uploading profile image:", err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="absolute -bottom-40 flex flex-col gap-3">
      <div className="relative w-fit self-center">
        <div className="relative flex size-44 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-gray-200">
          {preview ? (
            <Image
              src={preview}
              width={200}
              height={200}
              alt="profile"
              loading="lazy"
              className="h-full w-full object-cover object-center"
            />
          ) : (
            <ImageOff className="size-20 text-gray-400" />
          )}

          {uploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white">
              Uploading...
            </div>
          )}
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
        <span className="text-center text-xl font-medium md:text-3xl">
          {store.name}
        </span>
        {store.createdAt && (
          <span className="text-black/40 md:text-xl">
            Created{" "}
            {new Date(store.createdAt).toLocaleDateString(undefined, {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
        )}
      </div>
    </div>
  );
};

export default ProfileImageContainer;

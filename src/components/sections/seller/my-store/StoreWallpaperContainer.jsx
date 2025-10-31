"use client";

import { useEffect, useRef, useState } from "react";
import { PenLineIcon, ImageOff } from "lucide-react";
import Image from "next/image";
import { useProfileStore } from "@/providers/profile-store-provider";
import { updateSellerStore } from "@/lib/api/seller-store/editStoreBackroundImage";
import useTranslation from "@/hooks/useTranslation";

const StoreWallpaperContainer = () => {
  const { t } = useTranslation();
  const store = useProfileStore((state) => state.store);

  const setStore = useProfileStore((state) => state.setStore);

  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (store?.backgroundImage && store.backgroundImage.trim() !== "") {
      setPreview(store.backgroundImage); // Show network-accessible URL
    } else {
      setPreview(null);
    }
  }, [store?.backgroundImage]);

  const handleEditClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));

    try {
      setUploading(true);

      console.log("request sending");
      const uploadData = await updateSellerStore(store.id, file);

      console.log("background image : ", uploadData);

      const networkUrl = uploadData?.store.backgroundImage;

      if (!networkUrl) {
        console.error("No file URL returned from upload");
        return;
      }

      setStore({
        ...store,
        backgroundImage: networkUrl,
      });
    } catch (err) {
      console.error("Error uploading image:", err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="relative flex max-h-96 w-full overflow-hidden rounded-3xl bg-gray-200">
      {preview ? (
        <Image
          src={preview}
          width={1248}
          height={397}
          alt="store wallpaper"
          loading="lazy"
          className="h-[397px] w-full object-cover object-center"
        />
      ) : (
        <div className="flex h-[397px] w-full items-center justify-center bg-gray-200">
          <ImageOff className="size-20 text-gray-400" />
        </div>
      )}

      {uploading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white">
          {t("seller.store.uploading")}
        </div>
      )}

      <div className="absolute bottom-0 right-0 flex justify-end px-3 py-2.5">
        <button
          type="button"
          className="flex items-center gap-1 rounded-full border border-white/80 bg-white/80 px-1.5 py-1 hover:border-darkBlue hover:bg-white"
          onClick={handleEditClick}
        >
          <div className="grid size-8 place-items-center rounded-full border-2 border-white bg-darkBlue text-white">
            <PenLineIcon className="size-4" />
          </div>
          <span className="hidden pr-4 font-medium sm:inline">
            {t("seller.store.edit")}
          </span>
        </button>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default StoreWallpaperContainer;

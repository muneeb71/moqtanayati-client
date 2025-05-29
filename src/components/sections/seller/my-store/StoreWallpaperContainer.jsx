import { PenLineIcon } from "lucide-react";
import Image from "next/image";

const StoreWallpaperContainer = () => {
  return (
    <div className="relative flex max-h-96 w-full items-center justify-center overflow-hidden rounded-3xl">
      <Image
        src="/static/store/wallpaper.jpeg"
        width={1248}
        height={397}
        alt="wallpaper"
        loading="lazy"
        className="h-full w-full object-cover object-center"
      />
      <div className="absolute flex w-full justify-end self-end px-3 py-2.5">
        <button className="flex items-center gap-1 rounded-full border border-white/80 bg-white/80 px-1.5 py-1 hover:border-darkBlue hover:bg-white">
          <div className="grid size-8 place-items-center rounded-full border-2 border-white bg-darkBlue text-white">
            <PenLineIcon className="size-4" />
          </div>
          <span className="hidden pr-4 font-medium sm:inline">Edit</span>
        </button>
      </div>
    </div>
  );
};

export default StoreWallpaperContainer;

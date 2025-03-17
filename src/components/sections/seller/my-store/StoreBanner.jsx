import { Switch } from "@/components/ui/switch";
import ProfileImageContainer from "./ProfileImageContainer";
import StoreWallpaperContainer from "./StoreWallpaperContainer";

const StoreBanner = () => {
  return (
    <div className="mb-24 flex flex-col items-end justify-end gap-48 sm:gap-5">
      <div className="relative flex w-full items-center justify-center">
        <StoreWallpaperContainer />
        <ProfileImageContainer />
      </div>
      <div className="flex items-center gap-3 rounded-xl border border-black/10 px-3.5 py-4">
        <span className="text-sm font-medium text-battleShipGray">
          Disable Profile
        </span>
        <Switch />
      </div>
    </div>
  );
};

export default StoreBanner;

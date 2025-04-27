import { locationIcon } from "@/assets/icons/common-icons";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import SecondaryButton from "@/components/buttons/SecondaryButton";
import LocationSelectionDialog from "@/components/sections/auth/location-selection/LocationSelectionDialog";
import Image from "next/image";

const LocationSelectionPage = () => {
  return (
    <div className="flex w-full max-w-96 flex-col gap-10 px-2">
      <Image
        src="/bg/location.svg"
        width={312}
        alt="location svg"
        loading="lazy"
        quality={100}
        height={312}
        className="hidden md:block"
      />
      <div className="flex flex-col gap-3">
        <h1 className="text-2xl font-medium">
          Where do you want to explore and shop?
        </h1>
        <span className="text-black/50">
          To provide you with the best experience, let us know your preferred
          location for buying or selling.
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <LocationSelectionDialog
          trigger={<PrimaryButton title="Exact Location" icon={locationIcon} />}
        />
        <LocationSelectionDialog
          trigger={<SecondaryButton title="Enter a different address" />}
        />
      </div>
    </div>
  );
};

export default LocationSelectionPage;

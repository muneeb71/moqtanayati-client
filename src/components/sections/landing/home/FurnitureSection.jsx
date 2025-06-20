import ItemCard from "@/components/cards/ItemCard";
import CustomLink from "@/components/link/CustomLink";
import ItemSlider from "@/components/slider/ItemSlider";
import { dummyItems } from "@/lib/dummy-items";

const FurnitureSection = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="flex flex-col w-full max-w-7xl">
        <div className="flex items-center justify-between w-full px-2 max-w-7xl">
          <h1 className="text-lg font-medium leading-[48px] text-delftBlue md:text-[32px]">
            Furniture
          </h1>
          <CustomLink className="md:text-[21.8px]">See All</CustomLink>
        </div>
      </div>
      <ItemSlider items={dummyItems} section={"furniture"}/>
    </div>
  );
};

export default FurnitureSection;

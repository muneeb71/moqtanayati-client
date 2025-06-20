import ItemCard from "@/components/cards/ItemCard";
import CustomLink from "@/components/link/CustomLink";
import ItemSlider from "@/components/slider/ItemSlider";
import { dummyItems } from "@/lib/dummy-items";

const RecommendedSection = ({ title = "Recommended For You" }) => {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="flex w-full max-w-7xl flex-col">
        <div className="flex w-full max-w-7xl items-center justify-between px-2">
          <h1 className="text-lg font-medium leading-[48px] text-delftBlue md:text-[32px]">
            {title}
          </h1>
          <CustomLink className="md:text-[21.8px]">See All</CustomLink>
        </div>
      </div>
      <ItemSlider items={dummyItems} section={"recommendations"}/>
    </div>
  );
};

export default RecommendedSection;

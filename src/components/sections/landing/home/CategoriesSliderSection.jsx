import CustomLink from "../../../link/CustomLink";
import CategoriesSlider from "@/components/slider/CategoriesSlider";
import useTranslation from "@/hooks/useTranslation";

const CategoriesSliderSection = () => {
  const { t } = useTranslation();
  return (
    <div className="flex w-full flex-col items-center justify-center py-8">
      <div className="flex w-full max-w-7xl items-center justify-between px-2">
        <h1 className="text-xl font-medium leading-[48px] text-delftBlue md:text-[32px]">
          {t("common.categories_title")}
        </h1>
        {/* <CustomLink className="md:text-[21.8px]">See All</CustomLink> */}
      </div>
      <CategoriesSlider />
    </div>
  );
};

export default CategoriesSliderSection;

import PageHeading from "@/components/headings/PageHeading";
import SubCategoriesBar from "@/components/sections/landing/categories/SubCategoriesBar";
import { unslugify } from "@/utils/slugify";

const CategoryLayout = async ({ params, children }) => {
  const categorySlug = (await params).slug;
  const category = unslugify(categorySlug);
  return (
    <div className="flex w-full flex-col items-center px-3">
      <PageHeading>
        <div className="flex items-baseline gap-1">
          <span className="text-sm md:text-[24px] md:leading-[36px]">
            Category {"> "}
          </span>
          {category}
        </div>
      </PageHeading>
      <div className="flex w-full max-w-7xl flex-col items-center justify-center py-5">
        <div className="flex w-full flex-col gap-5">
          <span className="text-[21px] font-medium leading-[31px] text-delftBlue">
            Sub Categories
          </span>
          <SubCategoriesBar category={category} categorySlug={categorySlug} />
        </div>
        {children}
      </div>
    </div>
  );
};

export default CategoryLayout;

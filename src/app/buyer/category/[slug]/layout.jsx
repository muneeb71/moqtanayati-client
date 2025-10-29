import PageHeading from "@/components/headings/PageHeading";
import SubCategoriesBar from "@/components/sections/landing/categories/SubCategoriesBar";
import { unslugify } from "@/utils/slugify";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const CategoryLayout = async ({ params, children }) => {
  const categorySlug = (await params).slug;
  const category = unslugify(decodeURIComponent(categorySlug));
  return (
    <div className="flex w-full flex-col items-center px-3">
      {/* Back to Home Button */}

      <PageHeading>
        <div className="flex flex-col gap-4">
          {/* Back Button - Above */}
          <div className="flex w-full max-w-7xl justify-start">
            <Link
              href="/"
              className="flex items-center gap-2 rounded-lg py-2 text-sm font-medium text-gray-700 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>
          </div>

          {/* Category Heading - Below */}
          <div className="flex items-baseline gap-1">
            <span className="text-sm md:text-[24px] md:leading-[36px]">
              Category {"> "}
            </span>
            {category}
          </div>
        </div>
      </PageHeading>
      <div className="flex w-full max-w-7xl flex-col items-center justify-center py-5">
        {/* <div className="flex w-full flex-col gap-5">
          <span className="text-[21px] font-medium leading-[31px] text-delftBlue">
            Sub Categories
          </span>
          <SubCategoriesBar category={category} categorySlug={categorySlug} />
        </div> */}
        {children}
      </div>
    </div>
  );
};

export default CategoryLayout;

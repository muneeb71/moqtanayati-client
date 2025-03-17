import PageHeading from "@/components/headings/PageHeading";
import DisableProductDialog from "@/components/sections/seller/my-store/product/details/DisableProductDialog";
import StoreProductDetailsCard from "@/components/sections/seller/my-store/product/details/StoreProductDetailsCard";
import ProductDetailsSlider from "@/components/slider/ProductDetailsSlider";
import { dummyItems } from "@/lib/dummy-items";
import { PenLineIcon } from "lucide-react";

const ProductDetailsPage = async ({ params }) => {
  const productId = (await params).id;
  return (
    <div className="flex w-full flex-col items-center justify-center gap-10 px-3">
      <PageHeading>Product Details</PageHeading>
      <div className="flex w-full max-w-7xl flex-col items-center justify-center">
        <div className="flex w-full justify-end">
          <button className="flex items-center gap-1">
            <div className="grid size-8 place-items-center rounded-full border-2 border-white bg-darkBlue text-white">
              <PenLineIcon className="size-4" />
            </div>
            <span className="text-lg font-medium text-darkBlue">
              Edit Product
            </span>
          </button>
        </div>
        <div className="grid w-full gap-10 py-10 md:grid-cols-2">
          <div className="flex flex-col gap-5">
            <ProductDetailsSlider />
            <DisableProductDialog />
          </div>
          <StoreProductDetailsCard item={dummyItems[productId]} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;

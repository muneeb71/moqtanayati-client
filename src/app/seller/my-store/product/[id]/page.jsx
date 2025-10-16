import PageHeading from "@/components/headings/PageHeading";
import DisableProductDialog from "@/components/sections/seller/my-store/product/details/DisableProductDialog";
import StoreProductDetailsCard from "@/components/sections/seller/my-store/product/details/StoreProductDetailsCard";
import ProductDetailsSlider from "@/components/slider/ProductDetailsSlider";
import { getProductById } from "@/lib/api/product/getById";
import { PenLineIcon, ArrowLeft } from "lucide-react";
import Link from "next/link";

const ProductDetailsPage = async ({ params }) => {
  const productId = (await params).id;
  const product = await getProductById(productId);
  const productVideo = Array.isArray(product?.videos)
    ? product.videos[0]
    : product?.video;

  return (
    <div className="flex w-full flex-col items-center justify-center gap-6 px-3">
      <PageHeading>
        <div className="flex w-full items-center justify-between">
          <Link
            href="/seller/my-store"
            className="flex items-center gap-2 text-sm text-darkBlue hover:underline"
          >
            <ArrowLeft className="size-4" />
            <span>Back</span>
          </Link>
          <span>Product Details</span>
          <span className="w-10" />
        </div>
      </PageHeading>
      <div className="flex w-full max-w-7xl flex-col items-center justify-center">
        <div className="flex w-full justify-end">
          <Link
            href={`/seller/my-store/product/add?id=${product.id}`}
            className="flex items-center gap-1"
          >
            <div className="grid size-8 place-items-center rounded-full border-2 border-white bg-darkBlue text-white">
              <PenLineIcon className="size-4" />
            </div>
            <span className="text-lg font-medium text-darkBlue">
              Edit Product
            </span>
          </Link>
        </div>
        <div className="grid w-full gap-10 py-10 md:grid-cols-2">
          <div className="flex w-full flex-col gap-4">
            <ProductDetailsSlider images={product.images} />
            {productVideo ? (
              <video
                src={productVideo}
                controls
                className="w-full rounded-[20px] border border-gray-200/5"
              />
            ) : null}
          </div>
          <div className="flex flex-col gap-8">
            <StoreProductDetailsCard item={product} />
            <DisableProductDialog product={product} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;

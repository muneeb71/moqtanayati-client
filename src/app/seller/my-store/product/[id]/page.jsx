import PageHeading from "@/components/headings/PageHeading";
import DisableProductDialog from "@/components/sections/seller/my-store/product/details/DisableProductDialog";
import StoreProductDetailsCard from "@/components/sections/seller/my-store/product/details/StoreProductDetailsCard";
import ProductDetailsSlider from "@/components/slider/ProductDetailsSlider";
import { getProductById } from "@/lib/api/product/getById";
import { PenLineIcon } from "lucide-react";
import EditProductButton from "@/components/sections/seller/my-store/product/details/EditProductButton";
import ProductDetailsHeading from "@/components/sections/seller/my-store/product/details/ProductDetailsHeading";

const ProductDetailsPage = async ({ params }) => {
  const productId = (await params).id;
  const product = await getProductById(productId);
  const productVideo = Array.isArray(product?.videos)
    ? product.videos[0]
    : product?.video;

  return (
    <div className="flex w-full flex-col items-center justify-center gap-6 px-3">
      <PageHeading>
        <ProductDetailsHeading />
      </PageHeading>
      <div className="flex w-full max-w-7xl flex-col items-center justify-center">
        <div className="flex w-full justify-end">
          {product?.pricingFormat !== "Auctions" ? (
            <EditProductButton productId={product.id} />
          ) : null}
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

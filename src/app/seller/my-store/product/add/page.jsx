import AddProductFlow from "@/components/sections/seller/my-store/product/add/AddProductFlow";
import PictureAndVideosForm from "@/components/sections/seller/my-store/product/add/forms/PictureAndVideosForm";
import { getProductById } from "@/lib/api/product/getById";

const AddProductPage = async ({ searchParams }) => {
  const id = (await searchParams)?.id;
  let product = null;
  if (id) {
    try {
      product = await getProductById(id);
    } catch (_) {}
  }
  return <PictureAndVideosForm editProduct={product} />;
};

export default AddProductPage;

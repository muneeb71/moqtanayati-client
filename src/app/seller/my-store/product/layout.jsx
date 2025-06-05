import { ProductStoreProvider } from "@/providers/product-store-provider";

const ProductLayout = ({ children }) => {
  return <ProductStoreProvider>{children}</ProductStoreProvider>;
};

export default ProductLayout;

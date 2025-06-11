import PageHeading from "@/components/headings/PageHeading";


const ProductDetailsLayout = ({ children }) => {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="flex w-full px-3">
        <PageHeading>Home {" > "} Product Details</PageHeading>
      </div>
      {children}
    </div>
  );
};

export default ProductDetailsLayout;

import PageHeading from "@/components/headings/PageHeading";
import React from "react";

const ProductDetailsLayout = ({ children }) => {
  return (
    <div className="flex w-full flex-col items-center justify-center pb-28">
      <div className="flex w-full px-3">
        <PageHeading>My Auctions{" > "} Product Details</PageHeading>
      </div>
      {children}
    </div>
  );
};

export default ProductDetailsLayout;

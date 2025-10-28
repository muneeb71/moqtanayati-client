import PageHeading from "@/components/headings/PageHeading";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const ProductDetailsLayout = ({ children }) => {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="flex w-full max-w-7xl flex-col items-center px-3">
        {/* Back Button */}

        <PageHeading>
          <div className="mb-4 flex w-full justify-start">
            <Link
              href="/"
              className="flex items-center gap-2 rounded-lg py-2 text-sm font-medium text-gray-700 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </div>
          Home {" > "} Product Details
        </PageHeading>
      </div>
      {children}
    </div>
  );
};

export default ProductDetailsLayout;

import { cn } from "@/lib/utils";

const PageHeading = ({ children }) => {
  return (
    <div className="flex w-full items-center justify-center">
      <div
        className={cn(
          "flex w-full max-w-[87rem] flex-col justify-end rounded-[30px] bg-cover bg-center bg-no-repeat px-5 py-4 text-lg font-medium text-black/80",
          "md:h-[200px] md:px-8 md:py-10 md:text-3xl",
        )}
        style={{
          background: "url(/bg/heading-bg.svg)",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default PageHeading;

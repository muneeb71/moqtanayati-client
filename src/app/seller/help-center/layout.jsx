import PageHeading from "@/components/headings/PageHeading";
import HelpCenterBar from "@/components/sections/landing/help-center/HelpCenterBar";

const HelpCenterLayout = ({ children }) => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-5 px-3">
      <PageHeading>Help Center</PageHeading>
      <div className="flex w-full max-w-7xl flex-col items-center justify-center">
        <HelpCenterBar />
        {children}
      </div>
    </div>
  );
};

export default HelpCenterLayout;

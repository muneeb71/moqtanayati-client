import PageHeading from "@/components/headings/PageHeading";
import BidsBar from "@/components/sections/landing/my-bids/BidsBar";

const MyBidsLayout = ({ children }) => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-5 px-3">
      <PageHeading>My Bids</PageHeading>
      <div className="flex w-full max-w-7xl flex-col gap-5">
        <BidsBar />
        {children}
      </div>
    </div>
  );
};

export default MyBidsLayout;

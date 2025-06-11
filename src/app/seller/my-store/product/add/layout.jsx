import GoBackButton from "@/components/buttons/GoBackButton";
import PageHeading from "@/components/headings/PageHeading";


const AddProductLayout = ({ children }) => {
  return (
    <div className="item-center flex w-full flex-col px-3">
      <PageHeading>
        <GoBackButton />
        My Store {">"} Add Product
      </PageHeading>
      <div className="flex flex-col items-center">{children}</div>
    </div>
  );
};

export default AddProductLayout;

import PageHeading from "@/components/headings/PageHeading";

const CartLayout = ({ children }) => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-5 px-3">
      <PageHeading>Home {">"} Cart</PageHeading>
      {children}
    </div>
  );
};

export default CartLayout;

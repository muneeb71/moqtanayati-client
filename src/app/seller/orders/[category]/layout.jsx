import PageHeading from "@/components/headings/PageHeading";
import OrdersBar from "@/components/sections/seller/orders/OrdersBar";

const SellerOrdersLayout = ({ children }) => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-10 px-3">
      <PageHeading>Orders</PageHeading>
      <div className="flex w-full max-w-lg flex-col items-center pb-28 justify-center">
        <OrdersBar />
        {children}
      </div>
    </div>
  );
};

export default SellerOrdersLayout;

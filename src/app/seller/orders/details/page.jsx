import PageHeading from "@/components/headings/PageHeading";
import CustomerDetailsCard from "@/components/sections/seller/orders/cards/CustomerDetailsCard";
import OrderDetailsCard from "@/components/sections/seller/orders/cards/OrderDetailsCard";
import PaymentDetailsCard from "@/components/sections/seller/orders/cards/PaymentDetailsCard";
import OrderStatus from "@/components/sections/seller/orders/OrderStatus";

const OrderDetailsPage = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-10 px-3 pb-28">
      <PageHeading>Order Details</PageHeading>
      <div className="flex w-full max-w-4xl flex-col items-center justify-center gap-20">
        <div className="grid w-full gap-10 md:grid-cols-[6fr_4fr]">
          <div className="flex w-full flex-col justify-center gap-8">
            <OrderDetailsCard />
            <CustomerDetailsCard />
          </div>
          <PaymentDetailsCard />
        </div>
        <OrderStatus />
      </div>
    </div>
  );
};

export default OrderDetailsPage;

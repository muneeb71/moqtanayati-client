import OrderCard from "@/components/cards/OrderCard";
import { unslugify } from "@/utils/slugify";


const OrdersPage = async ({ params }) => {
  const category = (await params).category;
  return category == "cancelled" ? (
    <div className="flex w-full max-w-md flex-col gap-2 px-3 py-5">
      <div className="flex w-full flex-col gap-2 border-b border-black/10 pb-8">
        <div className="flex items-baseline gap-1.5">
          <span className="text-lg font-medium">Cancel Request</span>
          <span className="text-sm text-battleShipGray">(1)</span>
        </div>
        <div className="flex w-full flex-col gap-6">
          <OrderCard item={category}/>
        </div>
      </div>
      <div className="flex w-full flex-col pt-5">
        <div className="flex items-baseline gap-1.5">
          <span className="text-lg font-medium">Cancelled Orders</span>
          <span className="text-sm text-battleShipGray">(2)</span>
        </div>
        <div className="flex w-full flex-col gap-6">
          <OrderCard item={category}/>
          <OrderCard item={category}/>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex w-full max-w-md flex-col gap-2 px-3 py-5">
      <div className="flex items-baseline gap-1.5">
        <span className="text-lg font-medium">2</span>
        <span className="text-sm text-battleShipGray">
          {unslugify(category)}
        </span>
      </div>
      <div className="flex w-full flex-col gap-6">
        <OrderCard item={category}/>
        <OrderCard item={category}/>
      </div>
    </div>
  );
};

export default OrdersPage;

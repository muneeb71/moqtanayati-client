import OrderCard from "@/components/cards/OrderCard";
import { unslugify } from "@/utils/slugify";
import { getSellerOrders } from "@/lib/api/orders/getSellerOrder";

const statusMap = {
  "active-orders": ["PENDING", "PROCESSING", "SHIPPED"],
  "cancelled": ["CANCELLED"],
  "completed": ["DELIVERED"],
};

const OrdersPage = async ({ params }) => {
  const category = (await params).category;
  const orders = await getSellerOrders();
  const filteredOrders = orders.data.filter(order => statusMap[category]?.includes(order.status));

  return (
    <div className="flex w-full max-w-md flex-col gap-2 px-3 py-5">
      <div className="flex items-baseline gap-1.5">
        <span className="text-lg font-medium">{filteredOrders.length}</span>
        <span className="text-sm text-battleShipGray">{unslugify(category)}</span>
      </div>
      <div className="flex w-full flex-col gap-6">
        {filteredOrders.length === 0 ? (
          <span className="text-center text-battleShipGray">No orders found.</span>
        ) : (
          filteredOrders.map(order => <OrderCard key={order.id} item={order} />)
        )}
      </div>
    </div>
  );
};

export default OrdersPage;

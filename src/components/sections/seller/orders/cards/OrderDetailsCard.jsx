import Image from "next/image";

const OrderDetailsCard = ({ order }) => {
  if (!order) return null;
  const orderItems = order.OrderItem || [];
  return (
    <div className="flex flex-col w-full gap-4">
      {orderItems.length > 0 ? (
        orderItems.map((item, idx) => {
          const product = item.product || order.product || {};
          const image = product.images?.[0] || "/static/dummy-items/2.jpeg";
          const name = product.name || "Product Name";
          const price = item.price || product.price || 0;
          const quantity = item.quantity || 1;
          const paid = order.paymentStatus === "PAID";
          return (
            <div key={item.id || idx} className="flex w-full items-center gap-4">
              <div className="size-36 min-w-36 overflow-hidden rounded-2xl border border-black/5">
                <Image
                  src={image}
                  width={140}
                  height={140}
                  quality={100}
                  loading="lazy"
                  alt={name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex w-full items-center justify-between">
                <div className="flex flex-col gap-4">
                  <span className="text-xl font-medium">{name}</span>
                  <span className="text-2xl font-medium">${price}</span>
                  <span className={`w-fit rounded-xl px-5 py-2 text-xl font-medium ${paid ? "bg-shamrockGreen/10 text-shamrockGreen" : "bg-orange-100 text-orange-600"}`}>
                    {paid ? "Paid" : order.paymentStatus}
                  </span>
                </div>
                <span className="grid size-12 place-items-center rounded-full bg-russianViolet text-xl font-medium text-white">
                  {quantity}x
                </span>
              </div>
            </div>
          );
        })
      ) : (
        <div className="text-center text-battleShipGray">No items found in this order.</div>
      )}
    </div>
  );
};

export default OrderDetailsCard;

import { arrowUpRightIcon } from "@/assets/icons/seller-icons";

const OrdersCompletedCard = ({ completedOrders }) => {
  return (
    <div
      className="flex w-full flex-col gap-5 rounded-[30px] px-6 py-7 text-[#1595B5]"
      style={{
        background: "linear-gradient(180deg, #CAEFF9 0%, #E0F2F8 100%)",
      }}
    >
      <h1 className="text-2xl font-semibold">Orders Completed</h1>
      <div className="flex w-full justify-between">
        <span className="text-5xl font-semibold">{completedOrders ?? 0}</span>
        <div className="flex flex-col items-end">
          {arrowUpRightIcon}
          <span className="">+0.00%</span>
        </div>
      </div>
    </div>
  );
};

export default OrdersCompletedCard;

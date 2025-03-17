import { arrowUpRightIcon } from "@/assets/icons/seller-icons";

const ActiveOrdersCard = () => {
  return (
    <div
      className="flex w-full flex-col gap-5 rounded-[30px] px-6 py-7 text-[#C35A00]"
      style={{
        background: "linear-gradient(180deg, #F9E3CB 0%, #FAEEE0 100%)",
      }}
    >
      <h1 className="text-2xl font-semibold">Active Orders</h1>
      <div className="flex w-full justify-between">
        <span className="text-5xl font-semibold">25</span>
        <div className="flex flex-col items-end">
          {arrowUpRightIcon}
          <span className="">+15.06%</span>
        </div>
      </div>
    </div>
  );
};

export default ActiveOrdersCard;

import { filterIcon } from "@/assets/icons/admin-icons";
import OrdersTable from "@/components/sections/admin/orders/OrdersTable";

const AdminOrdersPage = () => {
  return (
    <div className="flex h-full w-full flex-col gap-2 py-5">
      <div className="flex w-full items-end justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-2xl font-semibold text-russianViolet">
            Manage Purchases
          </span>
          <span className="text-xl font-medium text-davyGray">Recents</span>
        </div>
        <button className="flex items-center gap-2 rounded-lg border border-silver bg-white px-3 py-2 text-moonstone transition-all duration-100 ease-linear hover:bg-moonstone/5">
          {filterIcon}
          <span className="text-sm font-medium">Filters</span>
        </button>
      </div>
      <OrdersTable />
    </div>
  );
};

export default AdminOrdersPage;

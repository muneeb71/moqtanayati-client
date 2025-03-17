import { filterIcon } from "@/assets/icons/admin-icons";
import AuctionsTable from "@/components/sections/admin/auctions/AuctionsTable";

const AdminAuctionsPage = () => {
  return (
    <div className="flex h-full w-full flex-col gap-2 py-5">
      <div className="flex w-full items-end justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-2xl font-semibold text-russianViolet">
            Auctions
          </span>
          <span className="text-xl font-medium text-davyGray">All Auctions</span>
        </div>
        <button className="flex items-center gap-2 rounded-lg border border-silver bg-white px-3 py-2 text-moonstone transition-all duration-100 ease-linear hover:bg-moonstone/5">
          {filterIcon}
          <span className="text-sm font-medium">Filters</span>
        </button>
      </div>
      <AuctionsTable />
    </div>
  );
};

export default AdminAuctionsPage;

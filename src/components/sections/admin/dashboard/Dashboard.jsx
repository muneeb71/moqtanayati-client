import StatsCard from "@/components/cards/StatsCard"
import LastHalfYearCard from "../../seller/analytics/cards/LastHalfYearCard"
import TotalOrdersCard from "../../seller/analytics/cards/TotalOrdersCard"
import { getDashboardStats } from "@/lib/api/admin/dashboard/getDashboardStats"

const Dashboard = async () => {
  const res = await getDashboardStats();
  console.log(res.data);
  
  const {
    totalRevenue,
    totalOrders,
    totalBuyers,
    totalSellers,
    totalCompletedOrders,
    totalAuctions,
    totalLiveAuctions,
    totalEndedAuctions,
    totalPendingOrders,
    totalPayments,
    totalProducts,
    totalReviews,
    totalSupportRequests,
    totalUsers,
    salesLast6Months,
  } = res?.data || {};
  
  return (
    <div className="flex flex-col gap-10">
      <div className="grid xl:grid-cols-4 grid-cols-2 gap-4">
        <StatsCard className={"bg-lightOrange flex flex-col  xl:pl-5 pl-3 pt-4 pb-16"} text="Revenue" count={`$${totalRevenue ?? 0}`}/>
        <StatsCard className={"bg-lightPurple flex flex-col  xl:pl-5 pl-3 pt-4 pb-16"} text="Total Orders" count={totalOrders ?? 0}/>
        <StatsCard className={"bg-lightYellow flex flex-col  xl:pl-5 pl-3 pt-4 pb-16"} text="Total Buyers" count={totalBuyers ?? 0}/>
        <StatsCard className={"bg-lightGreen flex flex-col  xl:pl-5 pl-3 pt-4 pb-16"} text="Total Sellers" count={totalSellers ?? 0}/>
      </div>
      
      <div className="grid w-full xl:grid-cols-[6fr_5fr] 2xl:gap-10 gap-5">
        <LastHalfYearCard profit={true} sales={salesLast6Months ?? []} />
        <TotalOrdersCard />    
      </div>
    </div>
  )
}

export default Dashboard
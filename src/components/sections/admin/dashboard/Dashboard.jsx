import StatsCard from "@/components/cards/StatsCard"
import LastHalfYearCard from "../../seller/analytics/cards/LastHalfYearCard"
import TotalOrdersCard from "../../seller/analytics/cards/TotalOrdersCard"

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-10">
    <div className="grid xl:grid-cols-4 grid-cols-2 gap-4">
        <StatsCard className={"bg-lightOrange flex flex-col  xl:pl-5 pl-3 pt-4 pb-16"} text="Profit" count={"$10033.00"}/>
        <StatsCard className={"bg-lightPurple flex flex-col  xl:pl-5 pl-3 pt-4 pb-16"} text="Bids Placed" count={"42"}/>
        <StatsCard className={"bg-lightYellow flex flex-col  xl:pl-5 pl-3 pt-4 pb-16"} text="Bids Successful" count={"40"}/>
        <StatsCard className={"bg-lightGreen flex flex-col  xl:pl-5 pl-3 pt-4 pb-16"} text="Completed Orders" count={"1523"}/>
    </div>
    
    <div className="grid w-full xl:grid-cols-[6fr_5fr] 2xl:gap-10 gap-5">
        <LastHalfYearCard profit={true} />
        <TotalOrdersCard />    
      </div>
    </div>
  )
}

export default Dashboard
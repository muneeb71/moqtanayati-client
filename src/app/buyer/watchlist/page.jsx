import PageHeading from "@/components/headings/PageHeading";
import Watchlist from "@/components/sections/landing/watchlist/Watchlist";
import { getUserProfile } from "@/lib/api/profile/getProfile";
import { dummyItems } from "@/lib/dummy-items";

const WatchListPage = async () => {
  const user = await getUserProfile();
  const items = user?.data?.watchlists;
  
  return (
    <div className="flex w-full flex-col items-center justify-center gap-5 px-3">
      <PageHeading>Watchlist</PageHeading>
      <Watchlist items={items} />
    </div>
  );
};

export default WatchListPage;

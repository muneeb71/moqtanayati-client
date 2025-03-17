import WatchlistCard from "./WatchlistCard";

const Watchlist = ({ items }) => {
  return (
    <div className="flex min-h-[40rem] w-full max-w-7xl flex-col gap-5">
      <h1 className="text-[21px] font-medium leading-[31px]">
        {items.length}{" "}
        <span className="font-normal text-battleShipGray">Results</span>
      </h1>
      <div className="grid min-h-[30rem] md:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((item, index) => (
          <WatchlistCard key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Watchlist;

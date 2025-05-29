import { filterSvg } from "@/assets/icons/common-icons";
import MenuCard from "@/components/cards/MenuCard";

const ResultItems = ({ items }) => {
  return (
    <div className="flex w-full flex-col gap-5">
      <div className="flex items-center justify-between">
        <h1 className="text-[21px] font-medium leading-[31px]">
          {items.length}{" "}
          <span className="font-normal text-battleShipGray">Results</span>
        </h1>
        <button className="flex items-center gap-2 rounded-[12px] bg-[#F8F7FB] px-2 py-2 text-russianViolet transition-all duration-150 ease-in hover:bg-russianViolet hover:text-white">
          {filterSvg}
          <span className="">Filters</span>
        </button>
      </div>
      <div className="grid w-full grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 md:grid-cols-3">
        {items.map((item, index) => (
          <MenuCard
            key={index}
            title={item.title}
            price={item.price}
            image={item.image}
            address={item.address}
            createdAt={item.createdAt}
            isFavourite={item.isFavourite}
          />
        ))}
      </div>
    </div>
  );
};

export default ResultItems;

import DraftCard from "@/components/cards/DraftCard";
import ItemCard from "@/components/cards/ItemCard";
import { dummyItems } from "@/lib/dummy-items";

const DraftsSection = () => {
  return (
    <div className="flex w-full max-w-7xl flex-col gap-5 py-20">
      <h1 className="text-3xl font-medium text-[#3D3D5D]">Drafts</h1>
      <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {dummyItems.slice(0, 2).map((item, index) => (
          <DraftCard
            id={item.id}
            key={index}
            image={item.image}
            createdAt={item.createdAt}
            price={item.price}
            address={item.address}
            title={item.title}
          />
        ))}
      </div>
    </div>
  );
};

export default DraftsSection;

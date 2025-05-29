import SearchInput from "@/components/form-fields/SearchInput";
import ResultItems from "@/components/sections/landing/categories/ResultItems";
import { dummyItems } from "@/lib/dummy-items";

const SearchPage = async ({ searchParams }) => {
  const query = (await searchParams).q;
  return (
    <div className="flex w-full flex-col items-center justify-center px-3">
      <div className="flex w-full max-w-7xl flex-col items-center gap-10 py-20">
        <SearchInput />
        <div className="flex flex-col items-center gap-1">
          {query ? (
            <>
              <p className="text-center font-medium text-battleShipGray">
                Search Results for
              </p>
              <span className="text-center text-[32px] font-medium leading-[48px] text-eerieBlack">
                {query}
              </span>
            </>
          ) : (
            <p>No search query provided.</p>
          )}
        </div>
        <ResultItems items={dummyItems} />
      </div>
    </div>
  );
};

export default SearchPage;

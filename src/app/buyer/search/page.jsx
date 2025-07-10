import SearchInput from "@/components/form-fields/SearchInput";
import ResultItems from "@/components/sections/landing/categories/ResultItems";
// import { dummyItems } from "@/lib/dummy-items";
import axios from "axios";

const SearchPage = async ({ searchParams }) => {
  const key = searchParams?.q || "";
  let items = [];
  let error = null;

  if (key) {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/products/search/${encodeURIComponent(key)}`);
      items = res.data?.data || [];
    } catch (err) {
      error = "Failed to fetch search results.";
    }
  }

  return (
    <div className="flex w-full flex-col items-center justify-center px-3">
      <div className="flex w-full max-w-7xl flex-col items-center gap-10 py-20">
        <SearchInput />
        <div className="flex flex-col items-center gap-1">
          {key ? (
            <>
              <p className="text-center font-medium text-battleShipGray">
                Search Results for
              </p>
              <span className="text-center text-[32px] font-medium leading-[48px] text-eerieBlack">
                {key}
              </span>
            </>
          ) : (
            <p>No search query provided.</p>
          )}
        </div>
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <ResultItems items={items} />
        )}
      </div>
    </div>
  );
};

export default SearchPage;

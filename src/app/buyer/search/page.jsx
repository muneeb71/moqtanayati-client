import { Suspense } from "react";
import SearchClient from "./SearchClient";

const SearchPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchClient />
    </Suspense>
  );
};

export default SearchPage;

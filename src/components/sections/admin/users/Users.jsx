"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import UsersTable from "./UsersTable";
import TablePagination from "@/components/pagination/TablePagination";
import { BiSearch } from "react-icons/bi";
import Filter from "@/components/dropdown/filter";
import useUserStore from "@/stores/useUserStore";

const Users = () => {
  const {
    users,
    usersLoading,
    selectedRows,
    currentPage,
    rowsPerPage,
    totalPages,
    totalUsers,
    searchTerm,
    sortBy,
    setSearchTerm,
    setSortBy,
    setSelectedRows,
    toggleRowSelection,
    setCurrentPage,
    setDebouncedSearchTerm,
    fetchUsers,
    debouncedSearchTerm,
  } = useUserStore();

  const router = useRouter();
  const tableRef = useRef(null);

  const userSortOptions = [
    { label: "Newest", value: "newest" },
    { label: "Oldest", value: "oldest" },
    { label: "Seller", value: "SELLER" },
    { label: "Buyer", value: "BUYER" },
  ];

  const onViewClick = (id) => {
    router.push(`/admin/users/${id}`);
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 400);
    return () => clearTimeout(delay);
  }, [searchTerm, debouncedSearchTerm]);

  useEffect(() => {
    fetchUsers();
  }, [currentPage, sortBy, debouncedSearchTerm]);

  return (
    <div className="flex h-full max-h-full flex-col overflow-hidden py-6">
      <div
        ref={tableRef}
        className="mb-5 flex w-full items-end justify-between"
      >
        <div className="flex flex-col gap-1">
          <span className="text-2xl font-semibold text-russianViolet">
            Users
          </span>
          <div className="flex flex-row items-center gap-5">
            <p className="text-[18px] font-normal text-davyGray">All Users</p>
            {selectedRows.length > 0 && (
              <p className="text-[13px] font-normal text-davyGray">
                ({selectedRows.length}{" "}
                {selectedRows.length === 1 ? "row" : "rows"} selected)
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-full max-w-[220px]">
            <input
              type="text"
              placeholder="Search by name or email"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="h-10 w-full rounded-lg border border-silver bg-white pl-10 pr-4 text-gray-700 focus:outline-none focus:ring-1 focus:ring-moonstone"
            />
            <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 transform text-xl text-gray-500" />
          </div>
          <Filter
            sortBy={sortBy}
            setSortBy={setSortBy}
            sortingOptions={userSortOptions}
          />
        </div>
      </div>

      <div className="no-scrollbar flex h-full max-h-full w-full max-w-full flex-col overflow-auto rounded-lg">
        <UsersTable
          setSelectedRows={setSelectedRows}
          selectedRows={selectedRows}
          currentData={users}
          toggleRowSelection={toggleRowSelection}
          onViewClick={onViewClick}
          loading={usersLoading}
          refreshData={fetchUsers}
        />
      </div>

      <TablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        rowsPerPage={rowsPerPage}
        totalItems={totalUsers}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default Users;

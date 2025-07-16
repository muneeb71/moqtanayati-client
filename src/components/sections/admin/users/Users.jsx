"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import UsersTable from "./UsersTable";
import { leftChipIcon, rightChipIcon } from "@/assets/icons/admin-icons";
import { getAllUsers } from "@/lib/api/admin/users/getAllUsers";
import { filterIcon } from "@/assets/icons/admin-icons";
import { useRef } from "react";
import TablePagination from "@/components/pagination/TablePagination";
import { BiSearch } from "react-icons/bi";
import Filter from "@/components/dropdown/filter";

const Users = () => {
  const [sortBy, setSortBy] = useState("SELLER");

  const userSortOptions = [
    { label: "Newest", value: "newest" },
    { label: "Oldest", value: "oldest" },
    { label: "Seller", value: "SELLER" },
    { label: "Buyer", value: "BUYER" },
  ];

  const router = useRouter();
  const tableRef = useRef(null);

  const [users, setUsers] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isUsersLoading, setIsUserLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const toggleRowSelection = (email) => {
    setSelectedRows((prev) =>
      prev.includes(email)
        ? prev.filter((item) => item !== email)
        : [...prev, email],
    );
  };

  const onViewClick = (id) => {
    router.push(`/admin/users/${id}`);
  };

  async function fetchUsers() {
    try {
      setIsUserLoading(true);
      if (!currentPage || isNaN(currentPage)) return;

      const res = await getAllUsers({
        currentPage,
        search: debouncedSearchTerm.trim(),
        filter: sortBy.trim(),
      });

      const fetchedUsers = res?.data?.users || [];
      const pagination = res?.data?.pagination || {};

      setUsers(fetchedUsers);
      setRowsPerPage(pagination.limit || 10);
      setTotalPages(pagination.pages || 1);
      setTotalUsers(pagination.total || fetchedUsers.length);
    } catch (e) {
      setUsers([]);
    } finally {
      setIsUserLoading(false);
    }
  }

  useEffect(() => {
    const delay = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 400);

    return () => clearTimeout(delay);
  }, [searchTerm]);

  useEffect(() => {
    fetchUsers();
  }, [currentPage, debouncedSearchTerm, sortBy]);

  if (!users) setIsUserLoading(false);

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
          loading={isUsersLoading}
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

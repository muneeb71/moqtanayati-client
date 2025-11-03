"use client";
import { filterIcon } from "@/assets/icons/admin-icons";
import { reportData } from "@/lib/report-data";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ReportTable from "./ReportsTable";
import { leftChipIcon, rightChipIcon } from "@/assets/icons/admin-icons";
import { getReport } from "@/lib/api/admin/reports/getReport";
import TablePagination from "@/components/pagination/TablePagination";
import { useRef } from "react";
import { BiSearch } from "react-icons/bi";
import Filter from "@/components/dropdown/filter";
import useTranslation from "@/hooks/useTranslation";

const Reports = ({ role }) => {
  const { t } = useTranslation();
  const [sortBy, setSortBy] = useState("SELLER");

  const reportSortOptions = [
    { label: t("admin.reports.sort.newest"), value: "newest" },
    { label: t("admin.reports.sort.oldest"), value: "oldest" },
    {
      label:
        role === "BUYER"
          ? t("admin.reports.sort.highest_orders_placed")
          : t("admin.reports.sort.highest_orders_dispatched"),
      value: "highest orders dispatched",
    },
    {
      label:
        role === "BUYER"
          ? t("admin.reports.sort.lowest_orders_placed")
          : t("admin.reports.sort.lowest_orders_dispatched"),
      value: "lowest orders dispatched",
    },
    {
      label:
        role === "BUYER"
          ? t("admin.reports.sort.highest_total_spent")
          : t("admin.reports.sort.highest_payment_earned"),
      value: "highest payment earned",
    },
    {
      label:
        role === "BUYER"
          ? t("admin.reports.sort.lowest_total_spent")
          : t("admin.reports.sort.lowest_payment_earned"),
      value: "lowest payment earned",
    },
  ];

  const [detail, setDetail] = useState(null);
  const [isDetailLoading, setIsDetailLoading] = useState(false);
  const router = useRouter();
  const tableRef = useRef(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalReports, setTotalReports] = useState(0);

  const [selectedRows, setSelectedRows] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const toggleRowSelection = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const onViewClick = (id) => {
    router.push(`/admin/reports/${id}`);
  };

  const fetchReportData = async (currentPage = 1) => {
    try {
      setIsDetailLoading(true);
      if (!currentPage || isNaN(currentPage)) return;

      const res = await getReport({
        role,
        currentPage,
        search: debouncedSearchTerm.trim(),
        filter: sortBy.trim(),
      });
      const pagination = res?.data?.pagination || {};
      const fetchReport = res.data?.reports || [];

      setDetail(fetchReport);

      setRowsPerPage(pagination.limit || 10);
      setTotalPages(pagination.pages || 1);
      setTotalReports(pagination.total || res.length);
    } catch (error) {
      setDetail([]);
    } finally {
      setIsDetailLoading(false);
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 400);

    return () => clearTimeout(delay);
  }, [searchTerm]);

  useEffect(() => {
    fetchReportData(currentPage);
  }, [role, currentPage, debouncedSearchTerm, sortBy]);

  return (
    <div className="flex h-full max-h-full flex-col overflow-hidden py-6">
      <div
        ref={tableRef}
        className="mb-5 flex w-full items-end justify-between"
      >
        <div className="flex flex-col gap-1">
          <span className="text-2xl font-semibold text-russianViolet">
            {t("admin.reports.title")}
          </span>
          <div className="flex flex-row items-center gap-5">
            <p className="text-[18px] font-normal text-davyGray">
              {role === "BUYER"
                ? t("admin.reports.all_buyers")
                : t("admin.reports.all_sellers")}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-full max-w-[220px]">
            <input
              type="text"
              placeholder={t("admin.reports.search")}
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
            sortingOptions={reportSortOptions}
          />
        </div>
      </div>

      <div className="no-scrollbar flex h-full max-h-full w-full max-w-full flex-col overflow-auto rounded-lg">
        <ReportTable
          setSelectedRows={setSelectedRows}
          selectedRows={selectedRows}
          currentData={detail}
          toggleRowSelection={toggleRowSelection}
          onViewClick={onViewClick}
          role={role}
          loading={isDetailLoading}
        />
      </div>

      <TablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        rowsPerPage={rowsPerPage}
        totalItems={totalReports}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default Reports;

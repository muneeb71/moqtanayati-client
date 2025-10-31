"use client";
import { filterIcon } from "@/assets/icons/admin-icons";
import { useEffect, useState } from "react";
import { getAllOrders } from "@/lib/api/admin/orders/getAllOrders";
import { cn } from "@/lib/utils";
import Image from "next/image";
import formatDateTime from "@/utils/dateFormatter";
import { generateInvoiceAndDownload } from "@/lib/api/admin/invoice/generateInvoiceAndDownload";
import ShimmerRow from "@/components/shimmer/shimmerRow";
import TablePagination from "@/components/pagination/TablePagination";
import { useRef } from "react";
import { BiSearch } from "react-icons/bi";
import Filter from "@/components/dropdown/filter";
import useTranslation from "@/hooks/useTranslation";

const OrdersTable = () => {
  const { t } = useTranslation();
  const tableHeaders = [
    t("admin.orders.headers.product"),
    t("admin.orders.headers.buyer"),
    t("admin.orders.headers.payment"),
    t("admin.orders.headers.delivery_status"),
    t("admin.orders.headers.order_date"),
    t("admin.orders.headers.review"),
  ];

  const [sortBy, setSortBy] = useState("SELLER");

  const orderSortOptions = [
    { label: t("admin.orders.sort.newest"), value: "newest" },
    { label: t("admin.orders.sort.oldest"), value: "oldest" },
    { label: t("admin.orders.sort.pending"), value: "PENDING" },
    { label: t("admin.orders.sort.processing"), value: "PROCESSING" },
    { label: t("admin.orders.sort.delivered"), value: "DELIVERED" },
    { label: t("admin.orders.sort.cancelled"), value: "CANCELLED" },
  ];

  const tableRef = useRef(null);
  const [orders, setOrders] = useState([]);

  const [isOrdersLoading, setIsOrdersLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const fetchOrders = async (currentPage = 1) => {
    try {
      setIsOrdersLoading(true);
      if (!currentPage || isNaN(currentPage)) return;

      const res = await getAllOrders({
        currentPage,
        search: debouncedSearchTerm.trim(),
        filter: sortBy.trim(),
      });
      console.log("getAllOrders response:", res);
      console.log("getAllOrders data:", res?.data);
      const pagination = res?.data?.pagination || {};

      const fetchedOrders = res?.data?.orders;
      console.log("fetchedOrders sample:", fetchedOrders?.[0]);

      setOrders(fetchedOrders);

      setRowsPerPage(pagination.limit || 10);
      setTotalPages(pagination.pages || 1);
      setTotalOrders(pagination.total || res.length);
    } catch (error) {
      setOrders([]);
    } finally {
      setIsOrdersLoading(false);
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 400);

    return () => clearTimeout(delay);
  }, [searchTerm, debouncedSearchTerm]);

  useEffect(() => {
    fetchOrders(currentPage);
  }, [currentPage, debouncedSearchTerm, sortBy]);

  console.log(orders);

  if (!orders) setIsOrdersLoading(false);

  return (
    <div className="flex h-full w-full flex-col gap-2 py-5">
      <div
        ref={tableRef}
        className="mb-5 flex w-full items-end justify-between"
      >
        <div className="flex flex-col gap-1">
          <span className="text-2xl font-semibold text-russianViolet">
            {t("admin.orders.manage_purchases")}
          </span>
          <div className="flex flex-row items-center gap-5">
            <p className="text-[18px] font-normal text-davyGray">
              {t("admin.orders.recents")}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-full max-w-[220px]">
            <input
              type="text"
              placeholder={t("admin.orders.search")}
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
            sortingOptions={orderSortOptions}
          />
        </div>
      </div>

      <div className="flex h-full max-h-full flex-col overflow-hidden py-2">
        <div
          ref={tableRef}
          className="flex h-full w-full flex-col overflow-auto rounded-lg"
        >
          <table className="w-full min-w-[1200px] table-fixed bg-white">
            <thead className="sticky top-0">
              <tr className="sticky top-0 border-b border-silver/30 bg-white">
                {tableHeaders.map((header, index) => (
                  <th
                    key={index}
                    className={cn(
                      header === "Review" ? "col-span-2" : "col-span-1",
                    )}
                  >
                    <div className="flex w-full min-w-[200px] items-center justify-between gap-3 text-nowrap px-5 py-4">
                      <span className="text-sm font-medium text-darkBlue">
                        {header}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isOrdersLoading ? (
                Array(5)
                  .fill(0)
                  .map((_, idx) => <ShimmerRow key={idx} columns={6} />)
              ) : orders.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="py-10 text-center text-sm text-gray-500"
                  >
                    {t("admin.orders.no_orders")}
                  </td>
                </tr>
              ) : (
                orders.map((data, index) => (
                  <tr key={index} className="border-b border-silver/30">
                    <td>
                      <div className="flex items-center gap-2 px-5 py-4">
                        {data?.product?.images && data.product.images[0] ? (
                          <Image
                            src={data.product.images[0]}
                            width={44}
                            height={44}
                            alt="Product"
                            loading="lazy"
                            quality={100}
                            className="h-[44px] w-[44px] rounded-full border border-black/10 object-cover"
                            onError={(e) => {
                              try {
                                e.target.src = "/static/prod.jpg";
                              } catch {}
                            }}
                          />
                        ) : (
                          <div className="flex h-[44px] w-[44px] items-center justify-center rounded-full border border-black/10 bg-gray-200">
                            <svg
                              className="h-5 w-5 text-gray-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                          </div>
                        )}
                        <div className="flex flex-col gap-1">
                          <span className="text-sm font-medium text-darkBlue">
                            {data.product.name}
                          </span>
                          <div className="flex items-center gap-1">
                            {data?.seller?.avatar ? (
                              <Image
                                src={data.seller.avatar}
                                width={18}
                                height={18}
                                alt="Seller"
                                loading="lazy"
                                quality={100}
                                className="h-[18px] w-[18px] rounded-full border border-black/10 object-cover"
                                onError={(e) => {
                                  try {
                                    e.target.src = "/static/user.svg";
                                  } catch {}
                                }}
                              />
                            ) : (
                              <div className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-gray-200">
                                <svg
                                  className="h-3.5 w-3.5 text-gray-500"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                  />
                                </svg>
                              </div>
                            )}
                            <span className="text-[10px] text-battleShipGray">
                              {data.seller.name}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-3 px-5 py-4">
                        {data?.user?.avatar ? (
                          <Image
                            src={data.user.avatar}
                            width={44}
                            height={44}
                            alt="Buyer"
                            loading="lazy"
                            quality={100}
                            className="h-[44px] w-[44px] rounded-full object-cover"
                            onError={(e) => {
                              try {
                                e.target.src = "/static/user.svg";
                              } catch {}
                            }}
                          />
                        ) : (
                          <div className="flex h-[44px] w-[44px] items-center justify-center rounded-full bg-gray-200">
                            <svg
                              className="h-6 w-6 text-gray-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                              />
                            </svg>
                          </div>
                        )}
                        <span className="text-sm font-medium text-[#667085]">
                          {data.user.name}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="flex flex-col gap-1 px-5 py-4 font-medium">
                        <div className="flex items-center gap-1">
                          <span className="text-xs text-battleShipGray">
                            {t("admin.orders.total_price")}
                          </span>
                          <span className="text-sm text-russianViolet">
                            ${data.totalAmount?.toFixed(2)}
                          </span>
                        </div>
                        <div
                          className={cn(
                            "w-fit rounded-lg px-3.5 py-1",
                            data.paymentStatus === "PAID"
                              ? "bg-shamrockGreen/10 text-shamrockGreen"
                              : data.paymentStatus === "PENDING"
                                ? "bg-black/5 text-black/60"
                                : "bg-faluRed/10 text-faluRed",
                          )}
                        >
                          {t(
                            `admin.orders.payment_status.${String(data?.paymentStatus || "").toLowerCase()}`,
                          )}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div
                        className={cn(
                          "w-fit rounded-lg px-3.5 py-1",
                          data.status === "DELIVERED"
                            ? "bg-shamrockGreen/10 text-shamrockGreen"
                            : data.status === "SHIPPED"
                              ? "bg-[#AEAB21]/10 text-[#AEAB21]"
                              : data.status === "CANCELLED"
                                ? "bg-faluRed/10 text-faluRed"
                                : data.status === "PROCESSING"
                                  ? "bg-yellow/10 text-yellow"
                                  : "bg-black/5 text-black/60",
                        )}
                      >
                        {t(
                          `admin.orders.status.${String(data.status || "").toLowerCase()}`,
                        )}
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2 px-5 py-4 text-sm text-[#667085]">
                        {formatDateTime.formatDateTime(data.createdAt)}
                      </div>
                    </td>
                    <td>
                      <button
                        className="px-5 py-4 font-medium text-russianViolet underline transition-all duration-100 ease-linear hover:text-shamrockGreen"
                        onClick={() =>
                          generateInvoiceAndDownload({
                            userId: data.id,
                            customerName: data.user.name,
                            email: data.user.email,
                            address: data.user.address,
                            date: new Date(data.createdAt).toLocaleDateString(),
                            items: [
                              {
                                name: data.product.name,
                                qty: data.quantity || 1,
                                price: data.totalAmount,
                              },
                            ],
                          })
                        }
                      >
                        {t("admin.orders.download")}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          rowsPerPage={rowsPerPage}
          totalItems={totalOrders}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default OrdersTable;

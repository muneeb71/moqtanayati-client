"use client";
import { useEffect, useState } from "react";
import { getAllOrders } from "@/lib/api/admin/orders/getAllOrders";
import { cn } from "@/lib/utils";
import Image from "next/image";
import formatDateTime from "@/utils/dateFormatter";
import { generateInvoiceAndDownload } from "@/lib/api/admin/invoice/generateInvoiceAndDownload";
import ShimmerRow from "@/components/shimmer/shimmerRow";

const tableHeaders = [
  "Product",
  "Buyer",
  "Payment",
  "Delivery Status",
  "Order Date",
  "Review",
];

const OrdersTable = () => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);
  const [isOrdersLoading, setIsOrdersLoading] = useState(false);

  const fetchOrders = async (currentPage = 1) => {
    try {
      setIsOrdersLoading(true);
      const res = await getAllOrders({ page: currentPage });
      const { orders = [], pagination = {} } = res.data;

      setOrders(orders);
      setPage(pagination.page || 1);
      setLimit(pagination.limit || 10);
      setPages(pagination.pages || 1);
      setTotal(pagination.total || 0);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      setOrders([]);
    } finally {
      setIsOrdersLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(page);
  }, [page]);

  console.log(orders);

  if (!orders) setIsOrdersLoading(false);

  return (
    <div className="flex h-full w-full flex-col overflow-auto rounded-lg">
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
              .map((_, idx) => <ShimmerRow key={idx} />)
          ) : orders.length === 0 ? (
            <tr>
              <td
                colSpan={7}
                className="py-10 text-center text-sm text-gray-500"
              >
                No orrders found.
              </td>
            </tr>
          ) : (
            orders.map((data, index) => (
              <tr key={index} className="border-b border-silver/30">
                <td>
                  <div className="flex items-center gap-2 px-5 py-4">
                    <Image
                      src={data.product.images[0]}
                      width={44}
                      height={44}
                      alt="Product"
                      loading="lazy"
                      quality={100}
                      className="rounded-full border border-black/10"
                    />
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-medium text-darkBlue">
                        {data.product.name}
                      </span>
                      <div className="flex items-center gap-1">
                        <Image
                          src={
                            data.seller.avatar || "/static/dummy-user/1.jpeg"
                          }
                          width={18}
                          height={18}
                          alt="Seller"
                          loading="lazy"
                          quality={100}
                          className="rounded-full border border-black/10"
                        />
                        <span className="text-[10px] text-battleShipGray">
                          {data.seller.name}
                        </span>
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="flex items-center gap-3 px-5 py-4">
                    <Image
                      src={data.user.avatar || "/static/dummy-user/1.jpeg"}
                      width={44}
                      height={44}
                      alt="Buyer"
                      loading="lazy"
                      quality={100}
                      className="rounded-full"
                    />
                    <span className="text-sm font-medium text-[#667085]">
                      {data.user.name}
                    </span>
                  </div>
                </td>
                <td>
                  <div className="flex flex-col gap-1 px-5 py-4 font-medium">
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-battleShipGray">
                        Total price:
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
                      {data?.paymentStatus}
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
                    {data.status}
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
                        id: data.id,
                        customerName: data.user.name,
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
                    Download
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination (basic, bottom right) */}
      <div className="flex justify-end gap-2 p-4">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="rounded bg-moonstone/10 px-3 py-1 text-sm text-moonstone disabled:cursor-not-allowed disabled:opacity-50"
        >
          Prev
        </button>

        {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={cn(
              "rounded px-3 py-1 text-sm",
              p === page
                ? "bg-moonstone text-white"
                : "bg-moonstone/10 text-moonstone hover:bg-moonstone/20",
            )}
          >
            {p}
          </button>
        ))}

        <button
          disabled={page === pages}
          onClick={() => setPage(page + 1)}
          className="rounded bg-moonstone/10 px-3 py-1 text-sm text-moonstone disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default OrdersTable;

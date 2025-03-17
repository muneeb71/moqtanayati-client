import { cn } from "@/lib/utils";
import Image from "next/image";

const OrdersTable = () => {
  const tableHeaders = [
    "Product",
    "Buyer",
    "Payment Status",
    "Delivery Stats",
    "Date of order",
    "Invoice",
  ];
  const tableData = [
    {
      product: {
        name: "Airpods Max",
        image: "/dummy-items/1.jpeg",
      },
      buyer: {
        name: "Esther Howard",
        image: "/dummy-user/1.jpeg",
      },
      seller: {
        name: "Kristin Watson",
        image: "/dummy-user/2.jpeg",
      },
      payment: {
        price: 800,
        status: "Paid",
      },
      delivery: "Delivered",
      dateOfOrder: "21 June, 2024 - 10:00 am",
    },
    {
      product: {
        name: "Airpods Max",
        image: "/dummy-items/1.jpeg",
      },
      buyer: {
        name: "Esther Howard",
        image: "/dummy-user/1.jpeg",
      },
      seller: {
        name: "Kristin Watson",
        image: "/dummy-user/2.jpeg",
      },
      payment: {
        price: 800,
        status: "Failed",
      },
      delivery: "Shipped",
      dateOfOrder: "21 June, 2024 - 10:00 am",
    },
    {
      product: {
        name: "Airpods Max",
        image: "/dummy-items/1.jpeg",
      },
      buyer: {
        name: "Esther Howard",
        image: "/dummy-user/1.jpeg",
      },
      seller: {
        name: "Kristin Watson",
        image: "/dummy-user/2.jpeg",
      },
      payment: {
        price: 1200,
        status: "Pending",
      },
      delivery: "Pending",
      dateOfOrder: "21 June, 2024 - 10:00 am",
    },
    {
      product: {
        name: "Airpods Max",
        image: "/dummy-items/1.jpeg",
      },
      buyer: {
        name: "Esther Howard",
        image: "/dummy-user/1.jpeg",
      },
      seller: {
        name: "Kristin Watson",
        image: "/dummy-user/2.jpeg",
      },
      payment: {
        price: 800,
        status: "Paid",
      },
      delivery: "Delivered",
      dateOfOrder: "21 June, 2024 - 10:00 am",
    },
    {
      product: {
        name: "Airpods Max",
        image: "/dummy-items/1.jpeg",
      },
      buyer: {
        name: "Esther Howard",
        image: "/dummy-user/1.jpeg",
      },
      seller: {
        name: "Kristin Watson",
        image: "/dummy-user/2.jpeg",
      },
      payment: {
        price: 800,
        status: "Failed",
      },
      delivery: "Shipped",
      dateOfOrder: "21 June, 2024 - 10:00 am",
    },
    {
      product: {
        name: "Airpods Max",
        image: "/dummy-items/1.jpeg",
      },
      buyer: {
        name: "Esther Howard",
        image: "/dummy-user/1.jpeg",
      },
      seller: {
        name: "Kristin Watson",
        image: "/dummy-user/2.jpeg",
      },
      payment: {
        price: 1200,
        status: "Pending",
      },
      delivery: "Pending",
      dateOfOrder: "21 June, 2024 - 10:00 am",
    },
    {
      product: {
        name: "Airpods Max",
        image: "/dummy-items/1.jpeg",
      },
      buyer: {
        name: "Esther Howard",
        image: "/dummy-user/1.jpeg",
      },
      seller: {
        name: "Kristin Watson",
        image: "/dummy-user/2.jpeg",
      },
      payment: {
        price: 800,
        status: "Paid",
      },
      delivery: "Delivered",
      dateOfOrder: "21 June, 2024 - 10:00 am",
    },
    {
      product: {
        name: "Airpods Max",
        image: "/dummy-items/1.jpeg",
      },
      buyer: {
        name: "Esther Howard",
        image: "/dummy-user/1.jpeg",
      },
      seller: {
        name: "Kristin Watson",
        image: "/dummy-user/2.jpeg",
      },
      payment: {
        price: 800,
        status: "Failed",
      },
      delivery: "Shipped",
      dateOfOrder: "21 June, 2024 - 10:00 am",
    },
    {
      product: {
        name: "Airpods Max",
        image: "/dummy-items/1.jpeg",
      },
      buyer: {
        name: "Esther Howard",
        image: "/dummy-user/1.jpeg",
      },
      seller: {
        name: "Kristin Watson",
        image: "/dummy-user/2.jpeg",
      },
      payment: {
        price: 1200,
        status: "Pending",
      },
      delivery: "Pending",
      dateOfOrder: "21 June, 2024 - 10:00 am",
    },
    {
      product: {
        name: "Airpods Max",
        image: "/dummy-items/1.jpeg",
      },
      buyer: {
        name: "Esther Howard",
        image: "/dummy-user/1.jpeg",
      },
      seller: {
        name: "Kristin Watson",
        image: "/dummy-user/2.jpeg",
      },
      payment: {
        price: 800,
        status: "Paid",
      },
      delivery: "Delivered",
      dateOfOrder: "21 June, 2024 - 10:00 am",
    },
    {
      product: {
        name: "Airpods Max",
        image: "/dummy-items/1.jpeg",
      },
      buyer: {
        name: "Esther Howard",
        image: "/dummy-user/1.jpeg",
      },
      seller: {
        name: "Kristin Watson",
        image: "/dummy-user/2.jpeg",
      },
      payment: {
        price: 800,
        status: "Failed",
      },
      delivery: "Shipped",
      dateOfOrder: "21 June, 2024 - 10:00 am",
    },
    {
      product: {
        name: "Airpods Max",
        image: "/dummy-items/1.jpeg",
      },
      buyer: {
        name: "Esther Howard",
        image: "/dummy-user/1.jpeg",
      },
      seller: {
        name: "Kristin Watson",
        image: "/dummy-user/2.jpeg",
      },
      payment: {
        price: 1200,
        status: "Pending",
      },
      delivery: "Pending",
      dateOfOrder: "21 June, 2024 - 10:00 am",
    },
  ];
  return (
    <div className="flex h-full w-full flex-col overflow-auto rounded-lg">
      <table className="w-full min-w-[1200px] table-fixed bg-white">
        <thead className="sticky top-0">
          <tr className="sticky top-0 border-b border-silver/30 bg-white">
            {tableHeaders.map((header, index) => (
              <th
                key={index}
                className={cn(header == "Review" ? "col-span-2" : "col-span-1")}
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
          {tableData.map((data, index) => (
            <tr key={index} className="border-b border-silver/30">
              <td>
                <div className="flex items-center gap-2 px-5 py-4">
                  <Image
                    src={data.product.image}
                    width={44}
                    height={44}
                    alt="Buyer"
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
                        src={data.seller.image}
                        width={18}
                        height={18}
                        alt="seller"
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
                    src={data.buyer.image}
                    width={44}
                    height={44}
                    alt="Buyer"
                    loading="lazy"
                    quality={100}
                    className="rounded-full"
                  />
                  <span className="text-sm font-medium text-[#667085]">
                    {data.buyer.name}
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
                      ${data.payment.price}
                    </span>
                  </div>
                  <div
                    className={cn(
                      "w-fit rounded-lg px-3.5 py-1",
                      data.payment.status == "Paid"
                        ? "bg-shamrockGreen/10 text-shamrockGreen"
                        : data.payment.status == "Pending"
                          ? "bg-black/5 text-black/60"
                          : "bg-faluRed/10 text-faluRed",
                    )}
                  >
                    {data.payment.status}
                  </div>
                </div>
              </td>
              <td>
                <div
                  className={cn(
                    "w-fit rounded-lg px-3.5 py-1",
                    data.delivery == "Delivered"
                      ? "bg-shamrockGreen/10 text-shamrockGreen"
                      : data.delivery == "Shipped"
                        ? "bg-[#AEAB21]/10 text-[#AEAB21]"
                        : "bg-black/5 text-black/60",
                  )}
                >
                  {data.delivery}
                </div>
              </td>
              <td>
                <div className="flex items-center gap-2 px-5 py-4 text-sm text-[#667085]">
                  {data.dateOfOrder}
                </div>
              </td>
              <td>
                <button className="px-5 py-4 font-medium text-russianViolet underline transition-all duration-100 ease-linear hover:text-shamrockGreen">
                  Download
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;

import { starIcon } from "@/assets/icons/common-icons";
import { cn } from "@/lib/utils";
import Image from "next/image";

const ReviewsTable = ({ category }) => {
  const tableHeaders = ["Buyer", "Seller", "Rating", "Review", "Actions"];
  const tableData = [
    {
      buyer: {
        name: "Esther Howard",
        image: "/dummy-user/1.jpeg",
      },
      seller: {
        name: "Albert Flores",
        image: "/dummy-user/2.jpeg",
      },
      rating: 4,
      review:
        "Fantastic seller! The item was exactly as described, and shipping was fast. Great communication throughout the transaction. Highly recommended!",
    },
    {
      buyer: {
        name: "Esther Howard",
        image: "/dummy-user/1.jpeg",
      },
      seller: {
        name: "Albert Flores",
        image: "/dummy-user/2.jpeg",
      },
      rating: 4,
      review:
        "Fantastic seller! The item was exactly as described, and shipping was fast. Great communication throughout the transaction. Highly recommended!",
    },
    {
      buyer: {
        name: "Esther Howard",
        image: "/dummy-user/1.jpeg",
      },
      seller: {
        name: "Albert Flores",
        image: "/dummy-user/2.jpeg",
      },
      rating: 4,
      review:
        "Fantastic seller! The item was exactly as described, and shipping was fast. Great communication throughout the transaction. Highly recommended!",
    },
    {
      buyer: {
        name: "Esther Howard",
        image: "/dummy-user/1.jpeg",
      },
      seller: {
        name: "Albert Flores",
        image: "/dummy-user/2.jpeg",
      },
      rating: 4,
      review:
        "Fantastic seller! The item was exactly as described, and shipping was fast. Great communication throughout the transaction. Highly recommended!",
    },
    {
      buyer: {
        name: "Esther Howard",
        image: "/dummy-user/1.jpeg",
      },
      seller: {
        name: "Albert Flores",
        image: "/dummy-user/2.jpeg",
      },
      rating: 4,
      review:
        "Fantastic seller! The item was exactly as described, and shipping was fast. Great communication throughout the transaction. Highly recommended!",
    },
    {
      buyer: {
        name: "Esther Howard",
        image: "/dummy-user/1.jpeg",
      },
      seller: {
        name: "Albert Flores",
        image: "/dummy-user/2.jpeg",
      },
      rating: 4,
      review:
        "Fantastic seller! The item was exactly as described, and shipping was fast. Great communication throughout the transaction. Highly recommended!",
    },
    {
      buyer: {
        name: "Esther Howard",
        image: "/dummy-user/1.jpeg",
      },
      seller: {
        name: "Albert Flores",
        image: "/dummy-user/2.jpeg",
      },
      rating: 4,
      review:
        "Fantastic seller! The item was exactly as described, and shipping was fast. Great communication throughout the transaction. Highly recommended!",
    },
    {
      buyer: {
        name: "Esther Howard",
        image: "/dummy-user/1.jpeg",
      },
      seller: {
        name: "Albert Flores",
        image: "/dummy-user/2.jpeg",
      },
      rating: 4,
      review:
        "Fantastic seller! The item was exactly as described, and shipping was fast. Great communication throughout the transaction. Highly recommended!",
    },
    {
      buyer: {
        name: "Esther Howard",
        image: "/dummy-user/1.jpeg",
      },
      seller: {
        name: "Albert Flores",
        image: "/dummy-user/2.jpeg",
      },
      rating: 4,
      review:
        "Fantastic seller! The item was exactly as described, and shipping was fast. Great communication throughout the transaction. Highly recommended!",
    },
  ];
  return (
    <div className="flex h-full max-h-full w-full flex-col overflow-auto">
      <table className="w-full table-fixed min-w-[1200px] rounded-lg bg-white">
        <thead>
          <tr className="sticky top-0 border-b border-silver/30 bg-white">
            {tableHeaders.map((header, index) => (
              <th
                key={index}
                className={cn(header == "Review" ? "col-span-2" : "col-span-1")}
              >
                <div className="flex w-full items-center justify-between gap-3 px-5 py-4">
                  <span className="text-sm font-medium text-darkBlue">
                    {header}
                  </span>
                  {category == "buyer-reviews-sellers" && header == "Buyer" ? (
                    <span className="text-[10px] font-normal text-davyGray">
                      Reviewed
                    </span>
                  ) : category == "seller-reviews-buyers" &&
                    header == "Seller" ? (
                    <span className="text-[10px] font-normal text-davyGray">
                      Reviewed
                    </span>
                  ) : null}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((data, index) => (
            <tr key={index} className="border-b border-silver/30">
              <td>
                <div className="flex items-center gap-3 px-5 py-4">
                  <Image
                    src={data.buyer.image}
                    width={34}
                    height={34}
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
                <div className="flex items-center gap-3 px-5 py-4">
                  <Image
                    src={data.seller.image}
                    width={34}
                    height={34}
                    alt="Buyer"
                    loading="lazy"
                    quality={100}
                    className="rounded-full"
                  />
                  <span className="text-sm font-medium text-[#667085]">
                    {data.seller.name}
                  </span>
                </div>
              </td>
              <td>
                <div className="flex items-center gap-1 px-5 py-4">
                  <div className="flex items-center gap-1 text-[#F3B95A]">
                    {/* render amount of rating in stars */}
                    {Array.from({ length: data.rating }, (_, index) => (
                      <span key={index}>{starIcon}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-1 text-silver">
                    {/* render remaining stars out of 5 here */}
                    {Array.from({ length: 5 - data.rating }, (_, index) => (
                      <span key={index}>{starIcon}</span>
                    ))}
                  </div>
                </div>
              </td>
              <td>
                <div className="flex items-center gap-1 px-5 py-4 text-sm text-davyGray/50">
                  {data.review}
                </div>
              </td>
              <td>
                <div className="flex items-center gap-2 px-5 py-4 text-sm">
                  <button className="rounded-lg bg-faluRed/10 px-4 py-3 font-medium text-faluRed transition-all duration-150 ease-linear hover:bg-faluRed hover:text-white">
                    Reject
                  </button>
                  <button className="rounded-lg bg-shamrockGreen px-4 py-3 font-medium text-white transition-all duration-150 ease-linear hover:bg-green-500">
                    Approve
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReviewsTable;

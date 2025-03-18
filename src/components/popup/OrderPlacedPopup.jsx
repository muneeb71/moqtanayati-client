import Image from "next/image";
import { useRouter } from "next/navigation";

const OrderPlacedPopup = ({ orderPlaced }) => {
  const router = useRouter();

  return (
    <div className="fixed inset-0 flex h-[100vh] w-full items-center justify-center bg-black/10">
      <div className="flex h-96 w-96 flex-col items-center justify-between rounded-3xl bg-white">
        <Image
          src="/popup/orderPlaced.png"
          alt="Order Placed"
          width={260}
          height={260}
        />
        <div className="mx-8 my-5 flex w-full justify-around">
          <button
            className="rounded-lg border border-moonstone px-10 py-4"
            onClick={orderPlaced}
          >
            Close
          </button>
          <button
            className="rounded-lg bg-moonstone px-10 py-4 text-white"
            onClick={() => router.push("/track-order")}
          >
            Track Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderPlacedPopup;

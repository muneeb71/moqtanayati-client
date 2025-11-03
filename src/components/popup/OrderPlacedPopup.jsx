import Image from "next/image";
import { useRouter } from "next/navigation";
import orderImg from "@/../public/popup/orderPlaced.png";
import useTranslation from "@/hooks/useTranslation";

const OrderPlacedPopup = ({ orderPlaced, id, onClose }) => {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <div className="fixed inset-0 flex h-[100vh] w-full items-center justify-center bg-black/10">
      <div className="flex h-96 w-96 flex-col items-center justify-between rounded-3xl bg-white">
        <Image
          src={orderImg}
          alt={t("buyer.order_popup.order_placed_alt")}
          width={260}
          height={260}
        />
        <div className="mx-8 my-5 flex w-full justify-around">
          <button
            className="rounded-lg border border-moonstone px-10 py-4"
            onClick={() => {
              orderPlaced();
              if (onClose) {
                onClose();
              }
            }}
          >
            {t("buyer.order_popup.close")}
          </button>
          <button
            className="rounded-lg bg-moonstone px-10 py-4 text-white"
            onClick={() => router.push(`/buyer/track-order?id=${id}`)}
          >
            {t("buyer.order_popup.track_order")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderPlacedPopup;

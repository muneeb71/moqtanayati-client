"use client";
import PageHeading from "@/components/headings/PageHeading";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getOrderById } from "@/lib/api/orders/getOrderById";
import Image from "next/image";
import useTranslation from "@/hooks/useTranslation";

const page = () => {
  const { t } = useTranslation();
  const params = useSearchParams();
  const orderId = params.get("id");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderProgress, setOrderProgress] = useState(2);

  const fetchOrder = async () => {
    setLoading(true);
    try {
      const data = await getOrderById(orderId);
      setOrder(data?.data || data);
      setLoading(false);
    } catch (err) {
      setError(err?.message || t("buyer.track_order.error_fetch"));
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!orderId) return;
    fetchOrder();
  }, [orderId]);

  if (loading)
    return (
      <div className="w-full py-20 text-center">
        {t("buyer.track_order.loading")}
      </div>
    );
  if (error)
    return <div className="w-full py-20 text-center text-red-500">{error}</div>;
  if (!order)
    return (
      <div className="w-full py-20 text-center">
        {t("buyer.track_order.not_found")}
      </div>
    );

  const cart = order.OrderItem || [];
  const address = order?.user?.address || t("buyer.checkout.no_address");
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const grandTotal = order?.totalAmount || subtotal;
  const tax = grandTotal - subtotal;
  const product = order.product;
  const seller = order.seller;

  const getProgressBarColor = (step) => {
    return step <= orderProgress ? "bg-moonstone" : "bg-gray-300";
  };

  const getImageSrc = (step) => {
    const images = {
      1: "/static/receive.svg",
      2:
        step <= orderProgress
          ? "/static/processed.svg"
          : "/static/processing.svg",
      3: step <= orderProgress ? "/static/shipped.svg" : "/static/shipping.svg",
      4:
        step <= orderProgress
          ? "/static/delivered.svg"
          : "/static/delivery.svg",
    };
    return images[step] || "receive.svg";
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-10 px-3 pb-20">
      {/* <FiltersPopup /> */}
      <PageHeading>
        <span className="text-">{t("buyer.track_order.title")}</span>
      </PageHeading>
      <div className="grid w-full max-w-7xl gap-10 md:grid-cols-2">
        <div className="flex w-full flex-col gap-10">
          {cart.map((item, index) => (
            <div
              className="flex w-full items-center justify-between"
              key={index}
            >
              <div className="flex h-full w-full items-center gap-4">
                <div className="size-[140px] overflow-hidden rounded-2xl">
                  <Image
                    src={product?.images?.[0] || "/static/dummy-items/1.jpeg"}
                    width={160}
                    height={160}
                    alt="item"
                    loading="lazy"
                    className="object-cover"
                  />
                </div>
                <div className="flex h-full flex-col justify-between py-2">
                  <div className="flex flex-col gap-1">
                    <h1 className="max-w-48 truncate text-2xl font-medium">
                      {product?.name || "Product"}
                    </h1>
                    <div className="flex items-center gap-2">
                      <span className="text-silver">by</span>
                      <div className="h-7 w-7 rounded-full">
                        <Image
                          src={seller?.avatar || "/static/user.jpeg"}
                          width={28}
                          height={28}
                          alt="seller"
                          loading="lazy"
                          className="h-full w-full rounded-full object-cover"
                        />
                      </div>

                      <span className="text-black/70">
                        {seller?.name || "Seller"}
                      </span>
                    </div>
                  </div>
                  <span className="text-3xl font-medium text-black/80">
                    $
                    {item.price !== 0
                      ? item.price.toFixed(2)
                      : item.buyItNow
                        ? item.buyItNow.toFixed(2)
                        : "0.00"}
                  </span>
                </div>
              </div>
              <div className="flex h-full flex-col items-center justify-center">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-russianViolet text-lg font-medium text-white">
                  {item.quantity}x
                </span>
              </div>
            </div>
          ))}
        </div>
        <div>
          <div className="flex w-full flex-col justify-between rounded-3xl border border-black/10 bg-[#CCCCCC1F] px-5 py-8">
            <div className="mb-20 flex w-full flex-col gap-3">
              <h1 className="text-3xl font-medium text-delftBlue">
                {t("buyer.track_order.order_summary")}
              </h1>
              <div className="flex w-full items-center justify-between">
                <span className="text-xl text-[#4D4D4DE5]">
                  {t("buyer.cart.subtotal")}
                </span>
                <span className="text-xl text-[#4D4D4DE5]">${subtotal}</span>
              </div>
              <div className="flex w-full items-center justify-between">
                <span className="text-xl text-[#4D4D4DE5]">
                  {t("buyer.cart.tax")}
                </span>
                <span className="text-xl text-[#4D4D4DE5]">$40</span>
              </div>
              <div className="flex w-full items-center justify-between">
                <span className="text-xl text-[#4D4D4DE5]">
                  {t("buyer.cart.shipping")}
                </span>
                <span className="text-xl text-[#4D4D4DE5]">
                  {t("buyer.cart.free")}
                </span>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-xl text-black/40">
                  {t("buyer.cart.grand_total")}
                </span>
                <h1 className="text-4xl font-medium">
                  ${(subtotal + 40).toFixed(2)}
                </h1>
              </div>
            </div>
          </div>
          <div className="mt-5 flex w-full flex-col justify-between rounded-3xl border border-black/10 bg-[#CCCCCC1F] p-5">
            <h1 className="mb-2.5 text-3xl font-medium text-delftBlue">
              {t("buyer.track_order.shipping_address")}
            </h1>
            <div className="flex w-full items-center justify-between">
              <span className="text-xl text-[#4D4D4DE5]">{address}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-20 h-[1px] w-11/12 bg-black/10"></div>
      <div>
        <h1 className="mb-8 text-center text-4xl font-medium text-davyGray">
          {t("buyer.track_order.order_status")}
        </h1>
        <div className="flex flex-col items-center justify-center gap-6 md:flex-row md:gap-4">
          <div className="flex flex-col items-center justify-center space-y-2">
            <Image
              src={getImageSrc(1)}
              alt="Receive"
              width={32}
              height={32}
              className="h-16 w-16 md:h-32 md:w-32"
            />
            <p className="text-xs font-medium md:text-3xl">
              {t("buyer.track_order.received")}
            </p>
          </div>
          <div
            className={`h-5 w-1 rounded-full md:h-1 md:w-[70px] ${getProgressBarColor(1)}`}
          ></div>
          <div className="flex flex-col items-center justify-center space-y-2">
            <Image
              src={getImageSrc(2)}
              alt="Processing"
              width={32}
              height={32}
              className="h-16 w-16 md:h-32 md:w-32"
            />
            <p className="text-xs font-medium md:text-3xl">
              {t("buyer.track_order.processing")}
            </p>
          </div>
          <div
            className={`h-5 w-1 rounded-full md:h-1 md:w-[70px] ${getProgressBarColor(2)}`}
          ></div>
          <div className="flex flex-col items-center justify-center space-y-2">
            <Image
              src={getImageSrc(3)}
              alt="Shipped"
              width={32}
              height={32}
              className="h-16 w-16 md:h-32 md:w-32"
            />
            <p className="text-xs font-medium md:text-3xl">
              {t("buyer.track_order.shipped")}
            </p>
          </div>
          <div
            className={`h-5 w-1 rounded-full md:h-1 md:w-[70px] ${getProgressBarColor(3)}`}
          ></div>
          <div className="flex flex-col items-center justify-center space-y-2">
            <Image
              src={getImageSrc(4)}
              alt="Delivered"
              width={32}
              height={32}
              className="h-16 w-16 md:h-32 md:w-32"
            />
            <p className="text-xs font-medium md:text-3xl">
              {t("buyer.track_order.delivered")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;

import Image from "next/image";

const OrderDetailsCard = () => {
  return (
    <div className="flex w-full items-center gap-4">
      <div className="size-36 min-w-36 overflow-hidden rounded-2xl border border-black/5">
        <Image
          src="/static/dummy-items/2.jpeg"
          width={140}
          height={140}
          quality={100}
          loading="lazy"
          alt="item"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-col gap-4">
          <span className="text-xl font-medium">Coco Oil 150ml</span>
          <span className="text-2xl font-medium">$350.00</span>
          <span className="w-fit rounded-xl bg-shamrockGreen/10 px-5 py-2 text-xl font-medium text-shamrockGreen">
            Paid
          </span>
        </div>
        <span className="grid size-12 place-items-center rounded-full bg-russianViolet text-xl font-medium text-white">
          1x
        </span>
      </div>
    </div>
  );
};

export default OrderDetailsCard;

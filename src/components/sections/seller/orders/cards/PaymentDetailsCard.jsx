const PaymentDetailsCard = () => {
  return (
    <div className="flex w-full flex-col gap-4 rounded-3xl border border-black/10 bg-[#F8F7FB] px-5 py-6">
      <span className="text-lg font-medium text-delftBlue">Details</span>
      <div className="flex items-start justify-between gap-4">
        <span className="text-nowrap text-sm text-[#4D4D4DE5]">
          Payment Method
        </span>
        <span className="text-right text-sm font-medium text-[#4D4D4DE5]">
          Payment Method
        </span>
      </div>
      <div className="flex items-start justify-between gap-4">
        <span className="text-nowrap text-sm text-[#4D4D4DE5]">
          Transaction ID
        </span>
        <span className="text-right text-sm font-medium text-[#4D4D4DE5]">
          #TXN1234567890ABC
        </span>
      </div>
      <div className="flex items-start justify-between gap-4">
        <span className="text-nowrap text-sm text-[#4D4D4DE5]">
          Transaction Date
        </span>
        <span className="text-right text-sm font-medium text-[#4D4D4DE5]">
          April 26, 2024, 10:45 AM
        </span>
      </div>
      <div className="flex items-start justify-between gap-4">
        <span className="text-nowrap text-sm text-[#4D4D4DE5]">
          Estimated Delivery
        </span>
        <span className="text-right text-sm font-medium text-[#4D4D4DE5]">
          April 30, 2024
        </span>
      </div>
      <div className="flex items-start justify-between gap-4">
        <span className="text-nowrap text-sm text-[#4D4D4DE5]">
          Shipping Address
        </span>
        <span className="text-right text-sm font-medium text-[#4D4D4DE5]">
          123 King's Road, Riyadh, Saudi Arabia.
        </span>
      </div>
    </div>
  );
};

export default PaymentDetailsCard;

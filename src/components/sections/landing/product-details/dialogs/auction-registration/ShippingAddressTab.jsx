import { addressTickIcon } from "@/assets/icons/common-icons";
import RoundedButton from "@/components/buttons/RoundedButton";

const ShippingAddressTab = ({
  addresses,
  selectedAddress,
  setSelectedAddress,
}) => {
  return (
    <div className="flex h-[66%] flex-col justify-between">
      <div className="flex w-full flex-col gap-4 px-5 py-8">
        {addresses.map((address, index) => (
          <button
            key={index}
            onClick={() => setSelectedAddress(address)}
            className="flex w-full flex-col gap-1 rounded-[12px] p-4 text-start"
            style={{
              boxShadow: "0px 0px 30px 2.4px #0000001A",
            }}
          >
            <div className="flex items-center gap-3">
              <span className="text-[17.32px] font-medium leading-[23px] text-black/60">
                {address.title}
              </span>
            </div>
            <div className="flex items-start gap-1">
              <span className="max-w-[310px] text-[14px] leading-[23px] text-[#8E8E93]">
                {address.address}
              </span>
              {selectedAddress.title == address.title && (
                <div className="grid size-[23px] min-w-[23px] place-items-center rounded-full bg-moonstone">
                  {addressTickIcon}
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
      <RoundedButton className="w-fit self-center" title="+ New Address" />
    </div>
  );
};

export default ShippingAddressTab;

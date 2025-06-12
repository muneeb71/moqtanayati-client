import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

const DisableProductDialog = ({ product }) => {
  return (
    <div className="flex h-[72px] w-fit items-center justify-between gap-10 rounded-[15px] border border-delftBlue/10 px-4 py-3.5">
      <span className="text-[17px] font-medium text-battleShipGray">
        Disable this Product
      </span>
      <Dialog>
        <DialogTrigger className="flex h-[24px] w-[48px] items-center rounded-full bg-[#C1C2CB80] px-[3px] py-[5px]">
          <div className="size-[19px] rounded-full bg-[#9799A8]"></div>
        </DialogTrigger>
        <DialogContent className="max-w-[350px] rounded-[24px] p-0 sm:max-w-[402px] sm:rounded-[24px]">
          <DialogHeader>
            <DialogTitle></DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center gap-10 pb-3">
            <div className="flex flex-col items-center gap-2">
              <span className="max-w-80 pt-6 text-center text-xl text-davyGray">
                Do you really want to disable this Product?
              </span>
            </div>
            <div className="grid w-full grid-cols-2 px-5">
              <DialogClose asChild>
                <div className="cursor-pointer border-r border-t border-black/10 py-3 text-center font-medium text-[#595C75] transition-all duration-200 ease-in hover:bg-black/10">
                  Cancel
                </div>
              </DialogClose>
              <DialogClose asChild>
                <button className="border-t border-black/10 py-3 font-medium text-[#F94144] transition-all duration-200 ease-in hover:bg-black/10">
                  Disable Product
                </button>
              </DialogClose>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DisableProductDialog;

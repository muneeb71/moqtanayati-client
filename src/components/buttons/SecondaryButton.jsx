import { cn } from "@/lib/utils";

const SecondaryButton = ({
  title = "Click Me!",
  icon = <></>,
  className = "",
  ...props
}) => {
  return (
    <button
      className={cn(
        "flex h-[64px] min-w-fit items-center justify-center gap-3 text-nowrap rounded-lg border border-moonstone px-8 text-lg font-medium text-moonstone",
        "transition-all duration-200 ease-in hover:border-delftBlue hover:text-delftBlue disabled:border-battleShipGray disabled:text-battleShipGray",
        className,
      )}
      {...props}
    >
      {icon}
      {title}
    </button>
  );
};

export default SecondaryButton;

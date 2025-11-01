import { cn } from "@/lib/utils";

const SecondaryButton = ({
  title = "Click Me!",
  icon = <></>,
  className = "",
  loading, // prevent forwarding boolean to DOM
  showIcon = true, // prevent forwarding to DOM; used to toggle icon
  ...props
}) => {
  return (
    <button
      className={cn(
        "flex h-[64px] min-w-fit items-center justify-center gap-3 text-nowrap rounded-lg border border-moonstone px-8 text-lg font-medium text-moonstone",
        "transition-all duration-200 ease-in hover:border-delftBlue hover:text-delftBlue disabled:border-battleShipGray disabled:text-battleShipGray",
        className,
      )}
      aria-busy={Boolean(loading) || undefined}
      {...props}
    >
      {loading ? (
        <span className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : (
        <>
          {showIcon ? icon : null}
          {title}
        </>
      )}
    </button>
  );
};

export default SecondaryButton;

import { cn } from "@/lib/utils";

const RoundedButton = ({
  title = "Click Me!",
  icon = (
    <svg
      width="20"
      height="20"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.39883 20.3999L15.9503 12.8484C16.3503 12.4484 16.5503 12.2484 16.5503 11.9999C16.5503 11.7514 16.3503 11.5514 15.9503 11.1514L8.39883 3.5999"
        stroke="white"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  showIcon = false,
  className = "",
  loading, // prevent forwarding boolean to DOM
  ...props
}) => {
  return (
    <button
      className={cn(
        "flex h-[64px] min-w-fit items-center justify-center gap-3 text-nowrap rounded-full bg-moonstone px-8 text-lg font-medium text-white transition-all duration-200 ease-in hover:bg-delftBlue disabled:bg-battleShipGray",
        className,
      )}
      aria-busy={Boolean(loading) || undefined}
      {...props}
    >
      {loading ? (
        <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
      ) : (
        <>
          {title} {showIcon && icon}
        </>
      )}
    </button>
  );
};

export default RoundedButton;

import { cn } from "@/lib/utils";

const Label = ({
  text = "",
  className = "md:text-[15.4px] md:leading-[23.1px] text-sm",
  htmlFor = "",
}) => {
  return (
    <label htmlFor={htmlFor} className={cn("font-medium", className)}>
      {text}
    </label>
  );
};

export default Label;

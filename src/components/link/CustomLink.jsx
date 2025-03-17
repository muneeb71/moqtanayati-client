import { cn } from "@/lib/utils";
import Link from "next/link";

const CustomLink = ({ href = "#", children, className = "" }) => {
  return (
    <Link
      className={cn("group flex flex-col text-moonstone", className)}
      href={href}
    >
      {children}
      <span className="h-[1px] w-0 bg-moonstone transition-all duration-200 ease-in group-hover:w-full"></span>
    </Link>
  );
};

export default CustomLink;

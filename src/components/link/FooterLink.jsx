import { cn } from "@/lib/utils";
import Link from "next/link";

const FooterLink = ({ href, className, children }) => {
  return (
    <Link
      className={cn("group flex w-fit flex-col text-white", className)}
      href={href}
    >
      {children}
      <span className="h-[1px] w-0 bg-white transition-all duration-200 ease-in group-hover:w-full"></span>
    </Link>
  );
};

export default FooterLink;

import { adminLinks } from "@/lib/links";
import SidebarLink from "./SidebarLink";

const SidebarLinks = () => {
  return (
    <div className="flex w-full flex-col gap-1">
      {adminLinks.map((link, index) => (
        <SidebarLink key={index} link={link} />
      ))}
    </div>
  );
};

export default SidebarLinks;

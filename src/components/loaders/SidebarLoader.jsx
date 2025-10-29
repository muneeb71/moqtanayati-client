const SidebarLoader = ({ loading, text = "Loading..." }) => {
  if (!loading) return null;

  return (
    <div className="flex items-center gap-2 text-sm text-[#878C90]">
      <div className="w-4 h-4 border-2 border-[#878C90] border-t-transparent rounded-full animate-spin"></div>
      {text}
    </div>
  );
};

export default SidebarLoader;

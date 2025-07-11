export default function SortDropdown({ onSortChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(sortingOptions[0]);

  const handleSelect = (option) => {
    setSelected(option);
    onSortChange(option.value);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-1 rounded px-3 py-2 text-sm font-medium text-darkBlue hover:bg-gray-100"
      >
        <span>{selected.label}</span>
        <ChevronDown size={20} />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black/5">
          <ul className="py-1">
            {sortingOptions.map((option) => (
              <li
                key={option.value}
                onClick={() => handleSelect(option)}
                className={`cursor-pointer px-4 py-2 text-sm hover:bg-gray-100 ${
                  selected.value === option.value
                    ? "bg-gray-100 font-semibold"
                    : ""
                }`}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

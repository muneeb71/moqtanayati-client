import { useState } from "react";
import useTranslation from "@/hooks/useTranslation";

const FiltersPopup = ({ onClose, onApplyFilter }) => {
  const { t } = useTranslation();
  const [categories, setCategories] = useState([]);
  const [categoryInput, setCategoryInput] = useState("");
  const [location, setLocation] = useState("");
  const [condition, setCondition] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const years = [2024, 2023, 2022, 2021];
  const months = t("buyer.filters.months") || [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const conditions = t("buyer.filters.conditions") || [
    "New",
    "Like New",
    "Used",
    "Refurbished",
  ];

  const addCategory = (e) => {
    // Prevent form submission
    e.preventDefault();

    // Trim input and check if it's not empty and not already exists
    const newCategory = categoryInput.trim();
    if (newCategory && !categories.includes(newCategory)) {
      // Limit to 5 categories
      if (categories.length < 5) {
        setCategories([...categories, newCategory]);
        setCategoryInput(""); // Clear input after adding
      } else {
        // Optional: Show a toast or alert about max categories
        alert("Maximum of 5 categories allowed");
      }
    }
  };

  const removeCategory = (categoryToRemove) => {
    setCategories(
      categories.filter((category) => category !== categoryToRemove),
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="relative w-[400px] rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <div className="w-6"></div>

          <h2 className="text-center text-2xl font-medium text-black">
            {t("buyer.filters.title")}
          </h2>

          <button onClick={onClose} className="text-gray-600 hover:text-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="mb-4 flex justify-center">
          <div className="h-[1px] w-[calc(100%-32px)] bg-black/10"></div>
        </div>

        <div className="mb-4">
          <label className="mb-2 block text-lg font-medium text-[#0C0D34]">
            {t("buyer.filters.product_categories")}
          </label>
          <form onSubmit={addCategory} className="relative">
            <input
              type="text"
              placeholder={t("buyer.filters.add_category_placeholder")}
              value={categoryInput}
              onChange={(e) => setCategoryInput(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-2 pr-10 focus:border-moonstone focus:outline-none focus:ring-2 focus:ring-moonstone"
              disabled={categories.length >= 5}
            />
            <button
              type="submit"
              className={`absolute right-2 top-1/2 -translate-y-1/2 transform ${categories.length >= 5 ? "cursor-not-allowed opacity-50" : ""}`}
              disabled={categories.length >= 5}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </form>

          {/* Categories display */}
          {categories.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {categories.map((category, index) => (
                <div
                  key={index}
                  className="flex items-center rounded-full bg-moonstone px-3 py-1 text-sm text-white"
                >
                  {category}
                  <button
                    onClick={() => removeCategory(category)}
                    className="ml-2 hover:text-red-200"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mb-4">
          <label className="mb-2 block text-lg font-medium text-[#0C0D34]">
            {t("buyer.filters.location")}
          </label>
          <input
            type="text"
            placeholder={t("buyer.filters.enter_location")}
            className="w-full rounded-lg border border-gray-300 p-2 focus:border-moonstone focus:outline-none focus:ring-2 focus:ring-moonstone"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="mb-2 block text-lg font-medium text-[#0C0D34]">
            {t("buyer.filters.item_condition")}
          </label>
          <select
            className="w-full rounded-lg border border-gray-300 p-2 focus:border-moonstone focus:outline-none focus:ring-2 focus:ring-moonstone"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
          >
            <option value="">{t("buyer.filters.select_condition")}</option>
            {conditions.map((condition, index) => (
              <option key={index} value={condition}>
                {condition}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="mb-2 block text-lg font-medium text-[#0C0D34]">
            {t("buyer.filters.month")}
          </label>
          <select
            className="w-full rounded-lg border border-gray-300 p-2 focus:border-moonstone focus:outline-none focus:ring-2 focus:ring-moonstone"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          >
            <option value="">{t("buyer.filters.select_month")}</option>
            {months.map((month, index) => (
              <option key={index} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="mb-2 block text-lg font-medium text-[#0C0D34]">
            {t("buyer.filters.year")}
          </label>
          <select
            className="w-full rounded-lg border border-gray-300 p-2 focus:border-moonstone focus:outline-none focus:ring-2 focus:ring-moonstone"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          >
            <option value="">{t("buyer.filters.select_year")}</option>
            {years.map((year, index) => (
              <option key={index} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <button
          className="w-full rounded-lg bg-[#25A5B4] py-2 text-white hover:bg-[#1F8A9A]"
          onClick={(e) => {
            e.preventDefault();
            const filterObj = {
              categories,
              location,
              condition,
              month,
              year,
            };
            if (onApplyFilter) onApplyFilter(filterObj);
          }}
        >
          {t("buyer.filters.apply_filter")}
        </button>
      </div>
    </div>
  );
};

export default FiltersPopup;

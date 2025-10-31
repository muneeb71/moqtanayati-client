"use client";
import useTranslation from "@/hooks/useTranslation";

const LanguageSwitcher = ({ className = "" }) => {
  const { locale, setLocale } = useTranslation();
  return (
    <select
      className={`rounded-md border px-2 py-1 text-sm ${className}`}
      value={locale}
      onChange={(e) => setLocale(e.target.value)}
      aria-label="Language switcher"
    >
      <option value="en">English</option>
      <option value="ar">العربية</option>
    </select>
  );
};

export default LanguageSwitcher;

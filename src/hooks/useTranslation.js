"use client";
import { useLanguage } from "@/context/LanguageProvider";

export default function useTranslation(ns = "common") {
  const { t, locale, setLocale, dir } = useLanguage();
  const translate = (key) => t(key, ns);
  return { t: translate, locale, setLocale, dir };
}

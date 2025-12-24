import { defineRouting } from "next-intl/routing";

export const locales = ["en", "am", "om", "so", "ti", "fr"] as const;
export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  en: "English",
  am: "አማርኛ",
  om: "Afaan Oromoo",
  so: "Soomaali",
  ti: "ትግርኛ",
  fr: "Français",
};

export const routing = defineRouting({
  locales,
  defaultLocale: "en",
});

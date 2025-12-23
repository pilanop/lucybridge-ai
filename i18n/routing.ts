import { defineRouting } from "next-intl/routing";

export const locales = ["en", "am", "om", "so", "ti"] as const;
export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  en: "English",
  am: "አማርኛ",
  om: "Afaan Oromoo",
  so: "Soomaali",
  ti: "ትግርኛ",
};

export const routing = defineRouting({
  locales,
  defaultLocale: "en",
});

"use client";

import { useState, useEffect } from "react";
import { locales, localeNames, type Locale } from "@/i18n/routing";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IconLanguage } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

interface ChatLanguageSelectorProps {
  value: Locale;
  onChange: (locale: Locale) => void;
}

export function ChatLanguageSelector({
  value,
  onChange,
}: ChatLanguageSelectorProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="sm"
        className="w-[140px] h-8 justify-start px-2"
      >
        <IconLanguage className="h-4 w-4 mr-2 text-muted-foreground" />
        <span className="text-muted-foreground text-sm">Loading...</span>
      </Button>
    );
  }

  return (
    <Select value={value} onValueChange={(v) => onChange(v as Locale)}>
      <SelectTrigger className="w-[140px] h-8 text-sm">
        <IconLanguage className="h-4 w-4 mr-2 text-muted-foreground" />
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {locales.map((loc) => (
          <SelectItem key={loc} value={loc}>
            {localeNames[loc]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

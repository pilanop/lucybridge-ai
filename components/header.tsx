"use client";

import { useTranslations } from "next-intl";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSelector } from "@/components/chat/language-selector";
import { Button } from "@/components/ui/button";
import { IconTrash } from "@tabler/icons-react";

interface HeaderProps {
  onClearChat: () => void;
  hasMessages: boolean;
}

export function Header({ onClearChat, hasMessages }: HeaderProps) {
  const t = useTranslations();

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 sticky top-0 z-50">
      <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
        <h1 className="text-lg font-semibold">{t("app.title")}</h1>
        <div className="flex items-center gap-2">
          {hasMessages && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onClearChat}
              aria-label={t("app.clearChat")}
            >
              <IconTrash className="h-5 w-5" />
            </Button>
          )}
          <LanguageSelector />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

"use client";

import { useTranslations } from "next-intl";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { IconTrash } from "@tabler/icons-react";
import Image from "next/image";

interface HeaderProps {
  onClearChat: () => void;
  hasMessages: boolean;
}

export function Header({ onClearChat, hasMessages }: HeaderProps) {
  const t = useTranslations();

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 sticky top-0 z-50">
      <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="/lucybridge-logo.png"
            alt="LucyBridge Logo"
            width={32}
            height={32}
            className="w-8 h-8 object-contain"
          />
          <h1 className="text-lg font-semibold">{t("app.title")}</h1>
        </div>
        <div className="flex items-center gap-2">
          {hasMessages && (
            <Button
              variant="destructive"
              size="sm"
              onClick={onClearChat}
              aria-label={t("app.clearChat")}
              className="mr-2"
            >
              <IconTrash className="h-4 w-4 mr-2" />
              <span>{t("app.clearChat")}</span>
            </Button>
          )}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

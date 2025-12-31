"use client";

import { IconX } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

interface LanguageOnboardingProps {
  onDismiss: () => void;
}

export function LanguageOnboarding({ onDismiss }: LanguageOnboardingProps) {
  return (
    <div className="absolute bottom-full left-0 mb-2 z-50 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="relative bg-popover border border-border rounded-lg shadow-lg p-4 max-w-xs">
        {/* Arrow pointing down */}
        <div className="absolute -bottom-2 right-15 w-4 h-4 bg-popover border-r border-b border-border rotate-45" />

        {/* Close button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-1 right-1 h-6 w-6"
          onClick={onDismiss}
          aria-label="Close"
        >
          <IconX className="h-4 w-4" />
        </Button>

        {/* Multilingual instructions */}
        <div className="pr-6 space-y-1.5 text-sm">
          <p className="font-medium text-foreground">
            🌍 Switch AI Language Here!
          </p>
          <p className="font-medium text-foreground">የAI ቋንቋን እዚህ ይቀይሩ</p>
          <p className="font-medium text-foreground">Afaan AI as jijjiiri</p>
          {/* <p className="font-medium text-foreground">
            Luuqadda AI halkan ka beddel
          </p> */}
          <p className="font-medium text-foreground">ናይ AI ቋንቋ ኣብዚ ቀይሮ</p>
          {/* <p className="font-medium text-foreground">Changez la langue ici</p> */}
        </div>
      </div>
    </div>
  );
}

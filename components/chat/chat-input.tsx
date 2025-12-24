"use client";

import {
  PromptInput,
  PromptInputTextarea,
  PromptInputSubmit,
} from "@/components/ai-elements/prompt-input";
import { Button } from "@/components/ui/button";
import { IconPlayerStop } from "@tabler/icons-react";
import { ChatLanguageSelector } from "./chat-language-selector";
import type { Locale } from "@/i18n/routing";

interface ChatInputProps {
  input: string;
  onInputChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onStop: () => void;
  isLoading: boolean;
  placeholder: string;
  sendLabel: string;
  stopLabel: string;
  responseLanguage: Locale;
  onResponseLanguageChange: (locale: Locale) => void;
}

export function ChatInput({
  input,
  onInputChange,
  onSubmit,
  onStop,
  isLoading,
  placeholder,
  sendLabel,
  stopLabel,
  responseLanguage,
  onResponseLanguageChange,
}: ChatInputProps) {
  // Wrapper to match PromptInput's onSubmit signature
  const handlePromptSubmit = (message: { text: string }) => {
    // We already have the state in `input` prop, but PromptInput manages its own state too.
    // Since we are controlling the input via PromptInputTextarea value,
    // we can just trigger the original onSubmit.

    // However, PromptInput's onSubmit is called with the text.
    // We can update the parent state one last time to be sure.
    onInputChange(message.text);

    // Create a synthetic event or just call onSubmit if it doesn't strictly need the event
    // The parent onSubmit expects React.FormEvent.
    // We can create a fake one or change the parent to not need it.
    // For now, let's try to call it with a minimal object if possible,
    // or better, just refactor parent to be simpler.
    // But to minimize impact, let's create a synthetic-like object.
    const syntheticEvent = {
      preventDefault: () => {},
    } as React.FormEvent;

    onSubmit(syntheticEvent);
  };

  return (
    <div className="border-t bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 p-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-2 mb-2 px-1">
          <span className="text-xs text-muted-foreground font-medium">
            AI Language:
          </span>
          <ChatLanguageSelector
            value={responseLanguage}
            onChange={onResponseLanguageChange}
          />
        </div>

        <PromptInput
          className="rounded-xl border border-input bg-background shadow-sm"
          onSubmit={handlePromptSubmit}
        >
          <PromptInputTextarea
            placeholder={placeholder}
            value={input}
            onChange={(e) => onInputChange(e.target.value)}
            className="min-h-[60px] max-h-[200px] border-none shadow-none focus-visible:ring-0"
            disabled={isLoading}
          />

          <div className="flex justify-end items-center p-3 pt-0">
            <div className="flex items-center gap-2">
              {isLoading ? (
                <Button
                  type="button"
                  size="icon"
                  variant="destructive"
                  className="rounded-full w-8 h-8"
                  onClick={onStop}
                  aria-label={stopLabel}
                >
                  <IconPlayerStop className="h-4 w-4" />
                </Button>
              ) : (
                <PromptInputSubmit
                  size="sm"
                  className="rounded-full w-8 h-8 p-0"
                  aria-label={sendLabel}
                />
              )}
            </div>
          </div>
        </PromptInput>
      </div>
    </div>
  );
}

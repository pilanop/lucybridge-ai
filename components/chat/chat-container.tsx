"use client";

import { useState, useCallback, useMemo } from "react";
import { useChat } from "@ai-sdk/react";
import { useTranslations, useLocale } from "next-intl";
import { Header } from "@/components/header";
import { ChatMessages } from "@/components/chat/chat-messages";
import { ChatInput } from "@/components/chat/chat-input";
import type { Locale } from "@/i18n/routing";
import type { UIMessage } from "ai";

export function ChatContainer() {
  const t = useTranslations("chat");
  const appLocale = useLocale() as Locale;
  const [responseLanguage, setResponseLanguage] = useState<Locale>(appLocale);
  const [inputValue, setInputValue] = useState("");

  // Archive stores messages from previous language sessions
  const [archivedMessages, setArchivedMessages] = useState<UIMessage[]>([]);
  const [shouldResetContext, setShouldResetContext] = useState(false);

  const { messages, status, sendMessage, stop, setMessages } = useChat();

  const isLoading = status === "streaming" || status === "submitted";

  // Combine archived + current messages for display (derived state)
  const displayMessages = useMemo(() => {
    return [...archivedMessages, ...messages];
  }, [archivedMessages, messages]);

  const handleClearChat = useCallback(() => {
    setMessages([]);
    setArchivedMessages([]);
    setShouldResetContext(false);
  }, [setMessages]);

  // Handle language change - mark for context reset
  const handleLanguageChange = useCallback(
    (newLang: Locale) => {
      if (newLang !== responseLanguage && messages.length > 0) {
        setShouldResetContext(true);
      }
      setResponseLanguage(newLang);
    },
    [responseLanguage, messages.length]
  );

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !isLoading) {
      // If language changed, archive current messages and reset AI context
      if (shouldResetContext) {
        setArchivedMessages((prev) => [...prev, ...messages]);
        setMessages([]);
        setShouldResetContext(false);
      }

      sendMessage(
        { text: inputValue },
        {
          body: {
            responseLanguage,
          },
        }
      );
      setInputValue("");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <Header
        onClearChat={handleClearChat}
        hasMessages={displayMessages.length > 0}
      />
      <div className="flex-1 w-full max-w-3xl mx-auto flex flex-col overflow-hidden">
        <ChatMessages
          messages={displayMessages}
          isLoading={isLoading}
          status={status}
          emptyStateText={t("emptyState")}
        />
        <ChatInput
          input={inputValue}
          onInputChange={setInputValue}
          onSubmit={handleFormSubmit}
          onStop={stop}
          isLoading={isLoading}
          placeholder={t("placeholder")}
          sendLabel={t("send")}
          stopLabel={t("stop")}
          responseLanguage={responseLanguage}
          onResponseLanguageChange={handleLanguageChange}
        />
      </div>
    </div>
  );
}

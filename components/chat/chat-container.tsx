"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { useTranslations, useLocale } from "next-intl";
import { Header } from "@/components/header";
import { ChatMessages } from "@/components/chat/chat-messages";
import { ChatInput } from "@/components/chat/chat-input";
import type { Locale } from "@/i18n/routing";

export function ChatContainer() {
  const t = useTranslations("chat");
  const appLocale = useLocale() as Locale;
  const [responseLanguage, setResponseLanguage] = useState<Locale>(appLocale);
  const [inputValue, setInputValue] = useState("");

  const { messages, status, sendMessage, stop, setMessages } = useChat({
    api: "/api/chat",
  });

  const isLoading = status === "streaming" || status === "submitted";

  const handleClearChat = useCallback(() => {
    setMessages([]);
  }, [setMessages]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !isLoading) {
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
    <div className="flex flex-col h-screen">
      <Header onClearChat={handleClearChat} hasMessages={messages.length > 0} />
      <ChatMessages
        messages={messages}
        isLoading={isLoading}
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
        onResponseLanguageChange={setResponseLanguage}
      />
    </div>
  );
}

"use client";

import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
} from "@/components/ai-elements/conversation";
import {
  Message,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message";
import type { UIMessage } from "ai";
import { MessageFeedback } from "@/components/chat/message-feedback";
import Image from "next/image";

interface ChatMessagesProps {
  messages: UIMessage[];
  isLoading: boolean;
  status: "submitted" | "streaming" | "ready" | "error";
  emptyStateText: string;
}

function getMessageContent(message: UIMessage): string {
  if (message.parts) {
    return message.parts
      .filter((part) => part.type === "text")
      .map((part) => (part as { type: "text"; text: string }).text)
      .join("");
  }
  // Fallback if parts is missing (should verify type usage)
  return "";
}

export function ChatMessages({
  messages,
  isLoading,
  status,
  emptyStateText,
}: ChatMessagesProps) {
  return (
    <Conversation className="flex-1 w-full relative">
      <ConversationContent>
        {messages.length === 0 ? (
          <ConversationEmptyState
            icon={
              <Image
                src="/lucybridge-logo.png"
                alt="LucyBridge Logo"
                width={80}
                height={80}
                className="opacity-50 grayscale hover:grayscale-0 transition-all duration-500"
              />
            }
            title="Welcome to Lucy AI"
            description={emptyStateText}
          />
        ) : (
          messages.map((message, index) => {
            const content = getMessageContent(message);
            const isUser = message.role === "user";
            const isLastMessage = index === messages.length - 1;
            const isStreaming =
              status === "streaming" && !isUser && isLastMessage;

            return (
              <Message key={message.id} from={message.role} className="gap-4">
                {isUser ? (
                  <MessageContent>{content}</MessageContent>
                ) : (
                  <>
                    <MessageResponse
                      className={
                        isStreaming
                          ? "markdown-body after:content-['▍'] after:ml-1 after:animate-pulse"
                          : "markdown-body"
                      }
                    >
                      {content}
                    </MessageResponse>

                    {/* Like/Dislike buttons - only show when NOT streaming */}
                    {!isStreaming && content && <MessageFeedback />}
                  </>
                )}
              </Message>
            );
          })
        )}

        {isLoading && messages[messages.length - 1]?.role === "user" && (
          <Message from="assistant" className="gap-4">
            <MessageContent>
              <div className="flex gap-1 items-center h-6">
                <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" />
              </div>
            </MessageContent>
          </Message>
        )}
      </ConversationContent>
    </Conversation>
  );
}

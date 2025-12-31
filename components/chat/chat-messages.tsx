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
import { cn } from "@/lib/utils";
import { motion, LayoutGroup } from "framer-motion";

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
  // Check if there are any assistant messages to determine if we've passed the "first" message state
  const hasAssistantMessage = messages.some((m) => m.role !== "user");

  return (
    <LayoutGroup>
      <Conversation className="flex-1 w-full relative">
        <ConversationContent>
          {messages.length === 0 ? (
            <ConversationEmptyState
              icon={
                <motion.img
                  layoutId="ai-avatar"
                  src="/ai-profile.jpg"
                  alt="Lucy AI"
                  className="w-32 h-32 rounded-2xl object-cover"
                  initial={{ opacity: 0, scale: 0.8, borderRadius: "16px" }}
                  animate={{ opacity: 1, scale: 1, borderRadius: "16px" }}
                  transition={{ duration: 0.5 }}
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

              const isFirstAssistantMessage =
                !isUser &&
                messages.findIndex((m) => m.role !== "user") === index;

              return (
                <div key={message.id} className="w-full flex gap-4">
                  {!isUser && (
                    <div className="shrink-0 flex flex-col justify-start pt-1">
                      <motion.img
                        layoutId={
                          isFirstAssistantMessage ? "ai-avatar" : undefined
                        }
                        src="/ai-profile.jpg"
                        alt="Lucy AI"
                        className="w-8 h-8 rounded-full object-cover border border-border"
                        initial={{
                          opacity: 0,
                          scale: 0.8,
                          borderRadius: "9999px",
                        }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                          borderRadius: "9999px",
                        }}
                        transition={{ duration: 0.4 }}
                      />
                    </div>
                  )}

                  <Message
                    from={message.role}
                    className={cn("gap-4", !isUser && "flex-1 min-w-0")}
                  >
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
                        {!isStreaming && content && <MessageFeedback />}
                      </>
                    )}
                  </Message>
                </div>
              );
            })
          )}

          {isLoading && messages[messages.length - 1]?.role === "user" && (
            <div className="w-full flex gap-4">
              <div className="shrink-0 flex flex-col justify-start pt-1">
                <motion.img
                  layoutId={!hasAssistantMessage ? "ai-avatar" : undefined}
                  src="/ai-profile.jpg"
                  alt="Lucy AI"
                  className="w-8 h-8 rounded-full object-cover border border-border shadow-sm"
                  initial={{ opacity: 0, scale: 0.8, borderRadius: "9999px" }}
                  animate={{ opacity: 1, scale: 1, borderRadius: "9999px" }}
                  transition={{ duration: 0.4 }}
                />
              </div>
              <Message from="assistant" className="gap-4 flex-1 min-w-0">
                <MessageContent>
                  <div className="flex gap-1 items-center h-6">
                    <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" />
                  </div>
                </MessageContent>
              </Message>
            </div>
          )}
        </ConversationContent>
      </Conversation>
    </LayoutGroup>
  );
}

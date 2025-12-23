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
import { IconMessage } from "@tabler/icons-react";

interface ChatMessagesProps {
  messages: UIMessage[];
  isLoading: boolean;
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
  emptyStateText,
}: ChatMessagesProps) {
  return (
    <Conversation className="flex-1 w-full relative">
      <ConversationContent>
        {messages.length === 0 ? (
          <ConversationEmptyState
            icon={
              <IconMessage className="h-10 w-10 text-muted-foreground/50" />
            }
            title="Welcome to Lucy AI"
            description={emptyStateText}
          />
        ) : (
          messages.map((message) => {
            const content = getMessageContent(message);
            const isUser = message.role === "user";

            return (
              <Message key={message.id} from={message.role} className="gap-4">
                {/* Avatar handling could be done outside or within Message if modified, 
                      but Message component structure is specific. 
                      Standard usage is just mapping content. 
                      We can stick to simple content for now or wrap in a specific way. 
                      Let's stick to simple first.
                  */}

                {isUser ? (
                  <MessageContent>{content}</MessageContent>
                ) : (
                  <MessageResponse>{content}</MessageResponse>
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

# Chat Components

This directory contains the React components responsible for the chat functionality.

## Files

- **`chat-container.tsx`**: The main container component that manages the chat state and layout. It integrates the `useChat` hook from `@ai-sdk/react`.
- **`chat-input.tsx`**: A wrapper around the `PromptInput` AI Element. It handles user input submission and includes the response language selector.
- **`chat-messages.tsx`**: A wrapper around the `Conversation` and `Message` AI Elements. It renders the list of chat messages with markdown support.
- **`language-selector.tsx`**: The application-level language selector (UI translation).
- **`chat-language-selector.tsx`**: The chat-specific language selector (AI response language).

## Usage

These components are composed in `app/page.tsx` (or `chat-container` encapsulates them).

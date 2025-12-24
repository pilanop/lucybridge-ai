# API Routes

This directory contains the Next.js API routes for the application.

## Endpoints

### `/api/chat`

- **Method**: `POST`
- **Description**: Handles streaming chat completions using the Vercel AI SDK.
- **Features**:
  - Uses Google Gemini model via `@ai-sdk/google`.
  - Supports `responseLanguage` parameter to control the AI's output language.
  - Converts client-side `UIMessage` format to `CoreMessage` format.
  - Returns a streaming response compatible with `useChat`.

## Configuration

The route uses settings from `@/lib/ai-config` to determine the model and system prompt.

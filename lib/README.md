# Library Utilities

This directory contains shared utility functions and configuration types.

## Files

- **`ai-config.ts`**: Centralized configuration for the AI model integration.
  - Defines the model name (e.g., `gemini-2.0-flash`).
  - Defines the system prompt structure, including language instructions.
  - Export `AI_CONFIG` object for use in API routes.

## Usage

Import `AI_CONFIG` in API routes to access model settings.

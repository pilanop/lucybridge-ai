export const AI_CONFIG = {
  // Using Gemini 2.0 Flash as the "Gemini 3" equivalent/placeholder requested
  modelName: "gemini-3-flash-preview",
  systemPrompt: (languageInstruction: string) =>
    `You are a helpful AI assistant. ${languageInstruction} Be concise but thorough. Use markdown formatting when appropriate.`,
};

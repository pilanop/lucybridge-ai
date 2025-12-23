import { google } from "@ai-sdk/google";
import { streamText } from "ai";
import { AI_CONFIG } from "@/lib/ai-config";

export const maxDuration = 60;

const languageInstructions: Record<string, string> = {
  en: "Respond in English.",
  am: "ምላሽዎን በአማርኛ ይስጡ። Respond in Amharic (አማርኛ).",
  om: "Afaan Oromoo tiin deebisi. Respond in Oromo (Afaan Oromoo).",
  so: "Ku jawaab Soomaali. Respond in Somali (Soomaali).",
  ti: "ብትግርኛ መልሲ ሃብ። Respond in Tigrinya (ትግርኛ).",
};

export async function POST(req: Request) {
  const { messages, responseLanguage = "en" } = await req.json();

  const languageInstruction =
    languageInstructions[responseLanguage] || languageInstructions.en;

  // Convert UIMessage format (parts) to CoreMessage format (content)
  // useChat sends: { id, role, parts: [{ type: 'text', text: '...' }] }
  // streamText expects: { role, content: string }
  const coreMessages = messages.map(
    (msg: {
      role: string;
      parts?: Array<{ type: string; text?: string }>;
    }) => ({
      role: msg.role,
      content:
        msg.parts
          ?.filter((p) => p.type === "text" && p.text)
          .map((p) => p.text)
          .join("") || "",
    })
  );

  // streamText returns StreamTextResult synchronously
  const result = streamText({
    model: google(AI_CONFIG.modelName),
    system: AI_CONFIG.systemPrompt(languageInstruction),
    messages: coreMessages,
  });

  // AI SDK v6 uses toUIMessageStreamResponse for useChat compatibility
  return result.toUIMessageStreamResponse();
}

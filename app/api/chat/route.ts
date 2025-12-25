import { google } from "@ai-sdk/google";
import { createXai } from "@ai-sdk/xai";
import { streamText } from "ai";
import { AI_CONFIG } from "@/lib/ai-config";

export const maxDuration = 60;

const languageInstructions: Record<string, string> = {
  en: "Respond in English.",
  am: "ምላሽዎን በአማርኛ ይስጡ። Respond in Amharic (አማርኛ). NOTICE: You must use high-quality, academic Amharic. Do not simple transliterate English terms. Use proper Ethiopic punctuation (።, ፣). Explain concepts clearly as a teacher would to an Ethiopian student.",
  om: "Afaan Oromoo tiin deebisi. Respond in Oromo (Afaan Oromoo).",
  so: "Ku jawaab Soomaali. Respond in Somali (Soomaali).",
  ti: "ብትግርኛ መልሲ ሃብ። Respond in Tigrinya (ትግርኛ).",
  fr: "Répondez en français. Respond in French (Français).",
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

  // Select model based on language using centralized config
  let model;

  if (
    AI_CONFIG.ethiopicLanguages.includes(
      responseLanguage as "am" | "om" | "so" | "ti"
    )
  ) {
    // Use Gemini for Ethiopian languages
    model = google(AI_CONFIG.ethiopicModel);
  } else {
    // Use Grok for English, French, and others
    const xai = createXai({
      apiKey: process.env.XAI_API_KEY,
    });
    model = xai(AI_CONFIG.westernModel);
  }

  // streamText returns StreamTextResult synchronously
  const result = streamText({
    model,
    system: AI_CONFIG.systemPrompt(languageInstruction),
    messages: coreMessages,
  });

  // AI SDK v6 uses toUIMessageStreamResponse for useChat compatibility
  return result.toUIMessageStreamResponse();
}

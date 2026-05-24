import {
  convertToModelMessages,
  streamText,
  UIMessage,
  ModelMessage,
  TextPart,
} from "ai";
import { MODELS } from "@/lib/ai-providers";

export async function POST(req: Request) {
  const {
    messages,
    model = `gemini`,
    creativity = 70,
    language = "ko",
  }: {
    messages: UIMessage[];
    model?: string;
    creativity?: number;
    maxLength?: string;
    language?: string;
  } = await req.json();

  const selectedModel = MODELS[model as keyof typeof MODELS] ?? MODELS.groq;

  const systemPrompt =
    language === "en"
      ? `You are Fronti, an AI assistant that helps with frontend development learning.
         Answer clearly and practically about React, Next.js, TypeScript, CSS and other modern technologies.
         Answer in English only. Technical terms can be used as-is.
         Answer directly without unnecessary preamble.`
      : `당신은 프론티입니다. 프론트엔드 학습을 도와주는 AI 어시스턴트입니다.
         React, Next.js, TypeScript, CSS 등 최신 기술에 대해 명확하고 실용적으로 답변해 주세요.
         반드시 한국어로만 답변하세요. 기술 용어는 영어 원문을 그대로 사용해도 됩니다.
         질문에 바로 답변하세요. 불필요한 서두는 생략하세요.`;

  const convertedMessages = await convertToModelMessages(messages);
  const sanitizedMessages: ModelMessage[] =
    model === "cerebras"
      ? (convertedMessages.map((msg) => ({
          role: msg.role,
          content:
            typeof msg.content === "string"
              ? msg.content
              : (msg.content as TextPart[]).filter(
                  (part) => part.type === "text",
                ),
        })) as ModelMessage[])
      : convertedMessages;

  const result = streamText({
    model: selectedModel,
    system: systemPrompt,
    messages: sanitizedMessages,
    temperature: creativity / 100,
  });

  return result.toUIMessageStreamResponse();
}

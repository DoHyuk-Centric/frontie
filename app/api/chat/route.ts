import { convertToModelMessages, streamText, UIMessage } from "ai";
import { MODELS } from "@/lib/ai-providers";

export async function POST(req: Request) {
  const {
    messages,
    model = `groq`,
  }: {
    messages: UIMessage[];
    model?: string;
  } = await req.json();

  const selectedModel = MODELS[model as keyof typeof MODELS] ?? MODELS.groq;

  const result = streamText({
    model: selectedModel,
    system: `당신은 프론티입니다. 프론트엔드 학습을 도와주는 AI 어시스턴트입니다.
    React, Next.js, TypeScript, CSS 등 최신 기술에 대해 명확하고 실용적으로 답변해 주세요.
    반드시 한국어로만 답변하세요. 다른 언어(영어 제외)를 절대 사용하지 마세요.
    기술 용어는 영어 원문을 그대로 사용해도 됩니다. (예: React, Next.js, TypeScript)
    질문에 바로 답변하세요. "~에 대해 묻고 계셨네요" 같은 불필요한 서두는 생략하세요.
    React, Next.js, TypeScript, CSS, JavaScript 등 프론트엔드 기술에 특화해서 답변하세요.`,
    messages: await convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}

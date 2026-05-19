import { createGroq } from "@ai-sdk/groq";
import { createGoogleGenerativeAI } from "@ai-sdk/google";

export const groq = createGroq({ apiKey: process.env.GROQ_API_KEY });
export const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const MODELS = {
  groq: groq(`qwen/qwen3-32b`),
  gemini: google(`gemini-2.5-flash`),
} as const;

export type ModelKey = keyof typeof MODELS;

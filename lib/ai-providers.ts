import { createGroq } from "@ai-sdk/groq";

export const groq = createGroq({ apiKey: process.env.GROQ_API_KEY });

export const MODELS = {
  groq: groq(`qwen/qwen3-32b`),
} as const;

export type ModelKey = keyof typeof MODELS;

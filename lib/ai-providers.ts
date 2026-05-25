import { createGroq } from "@ai-sdk/groq";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createCerebras } from "@ai-sdk/cerebras";

export const groq = createGroq({ apiKey: process.env.GROQ_API_KEY });
export const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
});
export const cerebras = createCerebras({
  apiKey: process.env.CEREBRAS_API_KEY,
});

export const MODELS = {
  groq: groq(`meta-llama/llama-4-scout-17b-16e-instruct`),
  gemini: google(`gemini-2.5-flash`),
  cerebras: cerebras(`gpt-oss-120b`),
} as const;

export type ModelKey = keyof typeof MODELS;

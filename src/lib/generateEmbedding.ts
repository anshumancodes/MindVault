import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_DEV });
async function generateEmbedding(text: string): Promise<number[]> {
  const res = await ai.models.embedContent({
    model: "gemini-embedding-001",
    contents: [text],
    config: {
      outputDimensionality: 768,
    },
  });

  const embedding = res?.embeddings?.[0]?.values;

  if (!embedding) {
    throw new Error("Failed to generate embedding");
  }

  return Array.from(embedding);
}

export default generateEmbedding;

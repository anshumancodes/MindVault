import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({ apiKey: "YOUR_API_KEY" });
async function generateEmbedding(text: string): Promise<number[]> {
  const res = await ai.models.embedContent({
    model: "text-embedding-005",
    contents: [text],
  });

  const embedding = res?.embeddings?.[0]?.values;

  if (!embedding) {
    throw new Error("Failed to generate embedding");
  }

  return Array.from(embedding);
}

export default generateEmbedding;

import { GoogleGenAI, Type } from "@google/genai";
import { DigestionInfo } from "../types";

// Initialize AI inside a getter to ensure it picks up the latest environment context if needed
const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const fetchFullFoodData = async (query: string): Promise<DigestionInfo> => {
  const ai = getAI();
  
  // Fetch both digestion info and image in parallel for speed
  const [digestionResponse, imageResponse] = await Promise.all([
    ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Provide detailed digestion information for: ${query}. Return only JSON.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            stomachTime: { type: Type.STRING },
            totalTime: { type: Type.STRING },
            category: { type: Type.STRING, enum: ['Fruit', 'Vegetable', 'Meat', 'Dairy', 'Drink', 'Carb', 'Snack', 'Other'] },
            nutrients: { type: Type.ARRAY, items: { type: Type.STRING } },
            description: { type: Type.STRING },
            funFact: { type: Type.STRING }
          },
          required: ["name", "stomachTime", "totalTime", "category", "nutrients", "description", "funFact"]
        }
      }
    }),
    ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: `A minimalist, high-end studio food photograph of ${query}. Clean neutral background, soft professional lighting, centered, sharp focus, 4k resolution, artistic and sleek presentation.` }]
      },
      config: { imageConfig: { aspectRatio: "1:1" } }
    })
  ]);

  const data = JSON.parse(digestionResponse.text || '{}') as DigestionInfo;
  
  // Extract image
  let imageUrl = `https://picsum.photos/seed/${encodeURIComponent(query)}/600/600`;
  for (const part of imageResponse.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      imageUrl = `data:image/png;base64,${part.inlineData.data}`;
      break;
    }
  }

  return { ...data, imageUrl };
};

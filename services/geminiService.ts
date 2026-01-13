import { GoogleGenAI } from "@google/genai";
import { Message, GroundingSource } from '../types';

const apiKey = import.meta.env.VITE_API_KEY;

if (!apiKey) {
  throw new Error("VITE_API_KEY is not set. Please add it to your .env file.");
}

const ai = new GoogleGenAI({ apiKey });

interface GeminiResponse {
  text: string;
  sources: GroundingSource[];
}

export const generateResponse = async (history: Message[], newMessage: string): Promise<GeminiResponse> => {
  try {
    const contents = [
      ...history.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
      })),
      {
        role: 'user',
        parts: [{ text: newMessage }]
      }
    ];

    const result = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents,
      tools: [{ googleSearch: {} }]
    });

    const response = result.candidates[0];
    const text = response.content.parts[0].text;
    const groundingChunks = response.groundingMetadata?.groundingChunks || [];

    const sources: GroundingSource[] = groundingChunks
      .map((chunk: any) => ({
        uri: chunk.web?.uri,
        title: chunk.web?.title,
      }))
      .filter((source: any): source is GroundingSource => source.uri && source.title);

    return { text, sources };
  } catch (error) {
    console.error("Error generating response from Gemini API:", error);
    throw new Error("Failed to get a response from the AI. Please check your API key and network connection, and ensure the key is not restricted.");
  }
};
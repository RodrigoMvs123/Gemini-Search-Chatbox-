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
    const model = ai.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const chat = model.startChat({
      history: history.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
      })),
      generationConfig: {
        tools: [{ googleSearch: {} }],
      },
    });

    const result = await chat.sendMessage(newMessage);
    const response = result.response;
    const text = response.text();
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

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
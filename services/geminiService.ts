import { GoogleGenAI } from "@google/genai";
import { Message, GroundingSource } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

interface GeminiResponse {
  text: string;
  sources: GroundingSource[];
}

export const generateResponse = async (history: Message[], newMessage: string): Promise<GeminiResponse> => {
  try {
    const model = 'gemini-2.5-flash';
    
    // Convert message history to the format expected by the API
    const contents = history.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.text }]
    }));
    
    // Add the new user message
    contents.push({ role: 'user', parts: [{ text: newMessage }] });

    const response = await ai.models.generateContent({
      model: model,
      contents: contents,
      config: {
        tools: [{googleSearch: {}}],
      },
    });
    
    const text = response.text;
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    
    const sources: GroundingSource[] = groundingChunks
      .map((chunk: any) => ({
        uri: chunk.web?.uri,
        title: chunk.web?.title,
      }))
      .filter((source: any): source is GroundingSource => source.uri && source.title);

    // Deduplicate sources based on URI
    const uniqueSources = Array.from(new Map(sources.map(s => [s.uri, s])).values());
    
    return { text, sources: uniqueSources };
  } catch (error) {
    console.error("Error generating response from Gemini API:", error);
    throw new Error("Failed to get a response from the AI. Please check your API key and network connection.");
  }
};
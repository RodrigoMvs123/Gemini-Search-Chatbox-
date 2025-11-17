import { Message, GroundingSource } from '../types';

interface GeminiResponse {
  text: string;
  sources: GroundingSource[];
}

export const generateResponse = async (history: Message[], newMessage: string): Promise<GeminiResponse> => {
  try {
    // The frontend now sends a request to our own backend proxy
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        history: history.map(msg => ({
          role: msg.role,
          parts: [{ text: msg.text }]
        })),
        newMessage,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return {
      text: data.text,
      sources: data.sources.map((chunk: any) => ({
        uri: chunk.web?.uri,
        title: chunk.web?.title,
      })).filter((source: any): source is GroundingSource => source.uri && source.title)
    };
  } catch (error) {
    console.error("Error generating response from Gemini API:", error);
    throw new Error("Failed to get a response from the AI. Please check your API key and network connection.");
  }
};
import express from 'express';
import path from 'path';
import cors from 'cors';
import { GoogleGenAI } from '@google/genai';
import { fileURLToPath } from 'url';

const app = express();
const port = process.env.PORT || 3001;

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- Middleware ---
app.use(express.json());
app.use(cors()); // Enable CORS for all routes

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, '..', 'dist')));

// --- API Key Setup ---
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("GEMINI_API_KEY is not set in environment variables.");
}
const ai = new GoogleGenAI({ apiKey });

// --- API Route ---
app.post('/api/generate', async (req, res) => {
  try {
    const { history, newMessage } = req.body;

    const model = ai.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const chat = model.startChat({
      history: history,
      generationConfig: {
        tools: [{ googleSearch: {} }],
      },
    });

    const result = await chat.sendMessage(newMessage);
    const response = result.response;
    
    res.json({ text: response.text(), sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || [] });
  } catch (error) {
    console.error("Error in /api/generate:", error);
    res.status(500).json({ error: "Failed to generate response from AI." });
  }
});

// --- Serve React App ---
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
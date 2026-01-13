import { GoogleGenAI } from '@google/genai';

const API_KEY = 'AIzaSyDAs2sNTAx8xrckJPlfWfY3xZVVdaC1Fvo';

async function testApiKey() {
  try {
    console.log('Testing Gemini API key...');
    
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    const model = ai.getGenerativeModel({ model: 'gemini-2.5-flash' });
    
    const chat = model.startChat({
      generationConfig: {
        tools: [{ googleSearch: {} }],
      },
    });
    
    const result = await chat.sendMessage('Hello, can you respond with "API key is working"?');
    const response = result.response;
    const text = response.text();
    
    console.log('✅ API Key is working!');
    console.log('Response:', text);
    
  } catch (error) {
    console.error('❌ API Key test failed:');
    console.error('Error:', error.message);
    
    if (error.message.includes('API_KEY_INVALID')) {
      console.log('The API key is invalid or has been revoked.');
    } else if (error.message.includes('quota')) {
      console.log('API quota exceeded or billing not enabled.');
    } else if (error.message.includes('restricted')) {
      console.log('API key has restrictions that prevent this request.');
    }
  }
}

testApiKey();
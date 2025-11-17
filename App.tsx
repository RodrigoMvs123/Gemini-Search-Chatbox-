
import React, { useState, useEffect, useCallback } from 'react';
import { Message } from './types';
import { generateResponse } from './services/geminiService';
import Header from './components/Header';
import ChatArea from './components/ChatArea';
import InputForm from './components/InputForm';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const storedMessages = localStorage.getItem('geminiChatHistory');
      if (storedMessages) {
        setMessages(JSON.parse(storedMessages));
      }
    } catch (err) {
      console.error("Failed to load messages from local storage:", err);
      setError("Could not load chat history.");
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('geminiChatHistory', JSON.stringify(messages));
    } catch (err) {
      console.error("Failed to save messages to local storage:", err);
      setError("Could not save chat history.");
    }
  }, [messages]);

  const handleSendMessage = useCallback(async (text: string) => {
    setError(null);
    const newUserMessage: Message = { id: Date.now().toString(), role: 'user', text };
    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      const { text: modelText, sources } = await generateResponse(messages, text);
      const newModelMessage: Message = { 
        id: (Date.now() + 1).toString(), 
        role: 'model', 
        text: modelText,
        sources,
      };
      setMessages(prev => [...prev, newModelMessage]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
      setError(errorMessage);
       setMessages(prev => [...prev, {
           id: (Date.now() + 1).toString(),
           role: 'model',
           text: `Sorry, something went wrong: ${errorMessage}`
       }])
    } finally {
      setIsLoading(false);
    }
  }, [messages]);
  
  const handleClearChat = useCallback(() => {
      setMessages([]);
      localStorage.removeItem('geminiChatHistory');
  }, []);

  return (
    <div className="flex flex-col h-screen font-sans bg-[#1C1917] text-[#F5F3F0]">
      <Header onClear={handleClearChat} />
      <ChatArea messages={messages} isLoading={isLoading} />
      {error && <div className="p-2 text-center bg-red-800/50 text-red-200 text-sm">{error}</div>}
      <InputForm onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default App;

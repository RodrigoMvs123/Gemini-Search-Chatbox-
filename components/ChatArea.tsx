
import React, { useRef } from 'react';
import { Message } from '../types';
import MessageBubble from './MessageBubble';
import useAutoScroll from '../hooks/useAutoScroll';

interface ChatAreaProps {
  messages: Message[];
  isLoading: boolean;
}

const TypingIndicator = () => (
  <div className="flex items-start gap-4 my-4">
    <div className="flex items-center gap-2 text-stone-400">
        <div className="w-2 h-2 bg-stone-500 rounded-full animate-pulse [animation-delay:-0.3s]"></div>
        <div className="w-2 h-2 bg-stone-500 rounded-full animate-pulse [animation-delay:-0.15s]"></div>
        <div className="w-2 h-2 bg-stone-500 rounded-full animate-pulse"></div>
        <span className="text-sm">AI is typing...</span>
    </div>
  </div>
);

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center h-full text-center text-stone-500">
    <h2 className="text-2xl font-semibold text-stone-400">Start a conversation</h2>
    <p className="mt-2">Ask me anything, I'm powered by Gemini and Google Search.</p>
  </div>
);

const ChatArea: React.FC<ChatAreaProps> = ({ messages, isLoading }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  useAutoScroll(scrollRef, messages);

  return (
    <div ref={scrollRef} className="flex-grow overflow-y-auto p-4 md:p-6 bg-[#2C2622]">
      <div className="max-w-4xl mx-auto">
        {messages.length === 0 && !isLoading ? (
          <EmptyState />
        ) : (
          messages.map((msg) => <MessageBubble key={msg.id} message={msg} />)
        )}
        {isLoading && <TypingIndicator />}
      </div>
    </div>
  );
};

export default ChatArea;

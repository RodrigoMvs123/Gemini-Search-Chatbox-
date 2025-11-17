
import React, { useState, useRef } from 'react';
import { SendIcon } from './icons';
import useAutoResizeTextarea from '../hooks/useAutoResizeTextarea';

interface InputFormProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ onSendMessage, isLoading }) => {
  const [inputValue, setInputValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  useAutoResizeTextarea(textareaRef, inputValue);

  const handleSubmit = () => {
    if (inputValue.trim() && !isLoading) {
      onSendMessage(inputValue.trim());
      setInputValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex-shrink-0 bg-[#1C1917] p-4 border-t border-[#3B3530]">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-end gap-2 bg-[#3B3530] p-2 rounded-xl shadow-inner border border-transparent focus-within:border-[#52443D] transition-colors">
          <textarea
            ref={textareaRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything..."
            className="flex-grow bg-transparent text-[#F5F3F0] placeholder-stone-400 focus:outline-none resize-none max-h-48 p-2"
            rows={1}
            disabled={isLoading}
            aria-label="Chat input"
          />
          <button
            onClick={handleSubmit}
            disabled={!inputValue.trim() || isLoading}
            className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-[#CC785C] text-white rounded-lg transition-colors duration-200 enabled:hover:bg-[#d98c73] disabled:bg-stone-600 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#CC785C]"
            aria-label="Send message"
          >
            <SendIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputForm;

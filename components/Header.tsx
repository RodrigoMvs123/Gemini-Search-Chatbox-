
import React from 'react';
import { ClearIcon } from './icons';

interface HeaderProps {
  onClear: () => void;
}

const Header: React.FC<HeaderProps> = ({ onClear }) => {
  return (
    <header className="flex-shrink-0 bg-[#1C1917] border-b border-[#3B3530] p-4 shadow-sm sticky top-0 z-10">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <h1 className="text-xl md:text-2xl font-bold text-[#F5F3F0]">
          Gemini Search Chatbox
        </h1>
        <button
          onClick={onClear}
          className="flex items-center gap-2 text-[#F5F3F0] hover:text-[#CC785C] transition-colors duration-200 text-sm p-2 rounded-md"
          aria-label="Clear conversation"
        >
          <ClearIcon className="w-5 h-5" />
          <span className="hidden sm:inline">Clear Chat</span>
        </button>
      </div>
    </header>
  );
};

export default Header;

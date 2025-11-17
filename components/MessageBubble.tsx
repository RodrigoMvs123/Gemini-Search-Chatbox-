
import React, { useState, useEffect, useRef } from 'react';
import { Message } from '../types';
import { BotIcon, UserIcon, CopyIcon, CheckIcon } from './icons';

// Assume marked and DOMPurify are loaded via CDN
declare const marked: { parse: (text: string) => string };
declare const DOMPurify: { sanitize: (html: string) => string };

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const [copied, setCopied] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const isUser = message.role === 'user';

  const handleCopy = () => {
    navigator.clipboard.writeText(message.text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  useEffect(() => {
    if (contentRef.current && typeof marked !== 'undefined' && typeof DOMPurify !== 'undefined') {
        const rawHtml = marked.parse(message.text);
        const sanitizedHtml = DOMPurify.sanitize(rawHtml);
        contentRef.current.innerHTML = sanitizedHtml;
    }
  }, [message.text]);

  return (
    <div className={`flex items-start gap-4 my-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#3B3530] flex items-center justify-center">
          <BotIcon className="w-5 h-5 text-[#F5F3F0]" />
        </div>
      )}
      <div className={`group relative max-w-xl lg:max-w-2xl xl:max-w-3xl ${isUser ? 'order-1' : 'order-2'}`}>
        <div
          className={`px-4 py-3 rounded-xl shadow-md ${
            isUser ? 'bg-[#3B3530] text-[#F5F3F0]' : 'bg-[#2C2622] text-[#F5F3F0]'
          }`}
        >
          <div ref={contentRef} className="prose prose-invert prose-sm max-w-none 
              prose-p:my-2 prose-headings:my-3 prose-li:my-1 prose-pre:bg-stone-900/50 prose-pre:rounded-md prose-pre:p-3
              prose-code:before:content-none prose-code:after:content-none prose-code:px-1 prose-code:py-0.5 prose-code:rounded-sm prose-code:bg-stone-600/50
              prose-blockquote:border-l-4 prose-blockquote:border-[#CC785C] prose-blockquote:pl-4 prose-blockquote:italic">
            {/* Sanitized HTML will be injected here */}
          </div>
          {!isUser && message.sources && message.sources.length > 0 && (
            <div className="mt-4 pt-3 border-t border-[#3B3530]">
              <h4 className="text-xs font-semibold text-stone-400 mb-2">Sources:</h4>
              <div className="flex flex-wrap gap-2">
                {message.sources.map((source, index) => (
                  <a
                    key={index}
                    href={source.uri}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs bg-stone-700 hover:bg-[#CC785C] text-stone-200 hover:text-white transition-colors duration-200 px-2 py-1 rounded-md truncate max-w-[200px] sm:max-w-xs"
                    title={source.title}
                  >
                    {`[${index + 1}] ${source.title}`}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
        <button
          onClick={handleCopy}
          className="absolute -top-3 -right-3 p-1.5 bg-[#3B3530] text-stone-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-[#52443D] hover:text-white"
          aria-label={copied ? 'Copied' : 'Copy message'}
        >
          {copied ? <CheckIcon className="w-4 h-4 text-green-400" /> : <CopyIcon className="w-4 h-4" />}
        </button>
      </div>

       {isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#CC785C] flex items-center justify-center order-2">
          <UserIcon className="w-5 h-5 text-white" />
        </div>
      )}
    </div>
  );
};

export default MessageBubble;

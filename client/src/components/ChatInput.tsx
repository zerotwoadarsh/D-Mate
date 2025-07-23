import React, { useState } from 'react';
import { Mic } from 'lucide-react';
import {type Theme } from '../config/themes';

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
  theme: Theme;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend, isLoading, theme }) => {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() && !isLoading) {
      onSend(input);
      setInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className={`w-full p-4 ${theme.colors.secondary} border-t ${theme.colors.cardBorder}`}>
      <div className="max-w-4xl mx-auto flex items-center gap-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          className={`w-full p-3 rounded-lg bg-slate-700 border border-slate-600 focus:outline-none focus:ring-2 ${theme.colors.primary.replace('text-','ring-')} text-white`}
          disabled={isLoading}
        />
        <button 
            className={`p-3 rounded-full ${theme.colors.accent} ${theme.colors.accentHover} transition-colors disabled:opacity-50`}
            disabled={true} // Voice input not yet implemented
        >
            <Mic className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={handleSend}
          disabled={isLoading || !input.trim()}
          className={`px-6 py-3 font-bold rounded-lg ${theme.colors.accent} ${theme.colors.accentHover} ${theme.colors.primaryText} transition-colors disabled:opacity-50`}
        >
          {isLoading ? '...' : 'Send'}
        </button>
      </div>
    </div>
  );
};

export default ChatInput;

import React from 'react';
import { motion } from 'framer-motion';
import {type Message } from '../features/chat/chatSlice';
import {type Theme } from '../config/themes';

interface ChatBubbleProps {
  message: Message;
  theme: Theme;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, theme }) => {
  const isUser = message.role === 'user';
  const bubbleColor = isUser ? theme.colors.bubbleUser : theme.colors.bubbleAi;
  const alignment = isUser ? 'justify-end' : 'justify-start';
  const textColor = isUser ? theme.colors.primaryText : theme.colors.text;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`w-full flex ${alignment} mb-4`}
    >
      <div className={`max-w-prose p-3 rounded-2xl ${bubbleColor} ${textColor}`}>
        {message.parts[0].text}
      </div>
    </motion.div>
  );
};

export default ChatBubble;

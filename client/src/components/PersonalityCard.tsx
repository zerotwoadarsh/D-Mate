import React from 'react';
import { motion } from 'framer-motion';
import { type Personality } from '../data/personalities';
import { type Theme } from '../config/themes';

interface PersonalityCardProps {
  personality: Personality;
  theme: Theme;
  onSelect: () => void;
  isSelected: boolean;
}

const PersonalityCard: React.FC<PersonalityCardProps> = ({ personality, theme, onSelect, isSelected }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const selectionClass = isSelected 
    ? `border-2 ${theme.colors.primary.replace('text-','border-')} shadow-lg shadow-${theme.colors.primary.split('-')[1]}-500/20` 
    : `border ${theme.colors.cardBorder}`;

  return (
    <motion.div
      variants={cardVariants}
      className={`rounded-2xl p-6 text-center cursor-pointer transition-all duration-300 backdrop-blur-sm ${theme.colors.cardBg} ${selectionClass} ${theme.colors.cardBorderHover}`}
      onClick={onSelect}
      whileHover={{ scale: 1.03, y: -5 }}
      whileTap={{ scale: 0.98 }}
    >
      <img 
        src={personality.avatarUrl} 
        alt={personality.name} 
        className="w-28 h-28 rounded-full mx-auto mb-4 border-4 border-white/20 shadow-xl"
        onError={(e) => { e.currentTarget.src = 'https://placehold.co/200x200/e2e8f0/334155?text=??' }}
      />
      <h3 className={`text-2xl font-bold ${theme.colors.primary}`}>{personality.name}</h3>
      <p className={`mt-2 text-sm ${theme.colors.text} opacity-80 h-20`}>{personality.bio}</p>
    </motion.div>
  );
};

export default PersonalityCard;


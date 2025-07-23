import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { AppDispatch, RootState } from '../app/store';
import { loadPersonalities, selectPersonality } from '../features/personality/personalitySlice';
import { type Personality } from '../data/personalities';
import { setTheme } from '../features/theme/themeSlice';
import PersonalityCard from '../components/PersonalityCard';
import { motion, AnimatePresence } from 'framer-motion';

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  
  const { all: personalities, selected: selectedPersonality } = useSelector((state: RootState) => state.personality);
  const { currentTheme } = useSelector((state: RootState) => state.theme);

  useEffect(() => {
    dispatch(loadPersonalities());
  }, [dispatch]);

  const { femalePartners, malePartners } = useMemo(() => {
    const femalePartners = personalities.filter(p => p.gender === 'female');
    const malePartners = personalities.filter(p => p.gender === 'male');
    return { femalePartners, malePartners };
  }, [personalities]);

  const handleSelectPersonality = (personality: Personality) => {
    dispatch(selectPersonality(personality));
    dispatch(setTheme(personality.themeKey));
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto text-center py-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2">
          Choose your <span className={currentTheme.colors.primary}>Partner</span>
        </h1>
        <p className="text-lg text-slate-400 mb-12">
          Select a personality to begin your conversation.
        </p>
      </motion.div>

      <div className="space-y-16">
        {/* Female Partners Section */}
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <h2 className="text-3xl font-bold text-left mb-6 text-white/90">Female Partners</h2>
            <AnimatePresence>
                <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                {femalePartners.map((p) => (
                    <PersonalityCard 
                    key={p._id} 
                    personality={p} 
                    theme={currentTheme}
                    onSelect={() => handleSelectPersonality(p)}
                    isSelected={selectedPersonality?._id === p._id}
                    />
                ))}
                </motion.div>
            </AnimatePresence>
        </motion.section>

        {/* Male Partners Section */}
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            <h2 className="text-3xl font-bold text-left mb-6 text-white/90">Male Partners</h2>
            <AnimatePresence>
                <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                {malePartners.map((p) => (
                    <PersonalityCard 
                    key={p._id} 
                    personality={p} 
                    theme={currentTheme}
                    onSelect={() => handleSelectPersonality(p)}
                    isSelected={selectedPersonality?._id === p._id}
                    />
                ))}
                </motion.div>
            </AnimatePresence>
        </motion.section>
      </div>
      
      {selectedPersonality && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <button className={`mt-16 px-12 py-4 font-bold rounded-lg text-xl transition-all duration-300 shadow-lg hover:shadow-2xl ${currentTheme.colors.accent} ${currentTheme.colors.accentHover} ${currentTheme.colors.primaryText} hover:scale-105`}>
                Chat with {selectedPersonality.name}
            </button>
        </motion.div>
      )}
    </div>
  );
};

export default Dashboard;
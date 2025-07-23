import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {type RootState } from './app/store';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence, motion } from 'framer-motion';

import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Chat from './pages/Chat';

function App() {
  const { user } = useSelector((state: RootState) => state.auth);
  const { selected: selectedPersonality } = useSelector((state: RootState) => state.personality);
  const { currentTheme } = useSelector((state: RootState) => state.theme);
  const [showLogin, setShowLogin] = useState(true);

  const toggleForm = () => setShowLogin(!showLogin);
  
  const renderContent = () => {
      if (!user) {
          return showLogin ? (
              <Login key="login" onSwitch={toggleForm} />
          ) : (
              <Register key="register" onSwitch={toggleForm} />
          );
      }
      return selectedPersonality ? <Chat key="chat" /> : <Dashboard key="dashboard" />;
  }

  return (
    // The outer div now controls the background gradient
    <div className={`${currentTheme.colors.background} ${currentTheme.colors.text} min-h-screen transition-colors duration-500 flex flex-col`}>
      <Header />
      {/* THIS IS THE FIX: Added pt-16 (for the header height) and py-8 for vertical padding */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 flex-grow flex flex-col pt-16 py-8">
        <AnimatePresence mode="wait">
            <motion.div
                key={user ? (selectedPersonality ? 'chat' : 'dashboard') : (showLogin ? 'login' : 'register')}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="h-full flex flex-col items-center justify-center" // Centering content
            >
                {renderContent()}
            </motion.div>
        </AnimatePresence>
      </main>
      <Toaster position="top-center" reverseOrder={false} toastOptions={{
        style: {
          background: '#1E293B',
          color: '#E2E8F0',
          border: '1px solid #334155'
        }
      }} />
    </div>
  );
}

export default App;

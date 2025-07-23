import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../app/store';
import { sendMessage } from '../features/chat/chatSlice';
import ChatBubble from '../components/ChatBubble';
import ChatInput from '../components/ChatInput';
import { toast } from 'react-hot-toast';

const Chat = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { history, isLoading, isError, message: errorMessage } = useSelector((state: RootState) => state.chat);
  const { currentTheme } = useSelector((state: RootState) => state.theme);
  const { selected: selectedPersonality } = useSelector((state: RootState) => state.personality);
  const { user } = useSelector((state: RootState) => state.auth);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: 'smooth'
    });
  }, [history]);

  useEffect(() => {
    if (isError) {
      toast.error(errorMessage || "An unknown error occurred.");
    }
  }, [isError, errorMessage]);
  
  useEffect(() => {
    const lastMessage = history[history.length - 1];
    if (lastMessage && lastMessage.role === 'model') {
      const utterance = new SpeechSynthesisUtterance(lastMessage.parts[0].text);
      speechSynthesis.speak(utterance);
    }
  }, [history]);

  const handleSendMessage = (prompt: string) => {
    if (navigator.vibrate) {
        navigator.vibrate(50);
    }

    // This check should now pass correctly.
    if (user && user.token && selectedPersonality) {
        const payload = {
            prompt: prompt,
            systemPrompt: selectedPersonality.systemPrompt,
            token: user.token
        };
        dispatch(sendMessage(payload));
    } else {
        // This toast is our final safety net.
        toast.error("Session data is missing. Please try logging in again.");
        console.error("CRITICAL ERROR: Data missing on send.", { user, selectedPersonality });
    }
  };
  
  if (!selectedPersonality) {
      return <div className="text-center">Please select a personality from the dashboard first.</div>
  }

  return (
    <div className="w-full h-full flex flex-col">
      <div ref={chatContainerRef} className="flex-grow p-4 md:p-6 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
            {history.map((msg, index) => (
                <ChatBubble key={index} message={msg} theme={currentTheme} />
            ))}
            {isLoading && (
                <ChatBubble message={{role: 'model', parts: [{text: '...'}]}} theme={currentTheme} />
            )}
        </div>
      </div>
      <ChatInput onSend={handleSendMessage} isLoading={isLoading} theme={currentTheme} />
    </div>
  );
};

export default Chat;
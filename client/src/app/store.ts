import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import themeReducer from '../features/theme/themeSlice';
import personalityReducer from '../features/personality/personalitySlice';
import chatReducer from '../features/chat/chatSlice'; // <-- IMPORT NEW CHAT REDUCER

export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    personality: personalityReducer,
    chat: chatReducer, // <-- ADD NEW CHAT REDUCER
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
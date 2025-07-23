import { createSlice, createAsyncThunk,type PayloadAction } from '@reduxjs/toolkit';
import chatService from './chatService';
import type { RootState } from '../../app/store';

export interface MessagePart {
    text: string;
}

export interface Message {
    role: 'user' | 'model';
    parts: MessagePart[];
}

interface ChatState {
    history: Message[];
    isLoading: boolean;
    isError: boolean;
    message: string;
}

const initialState: ChatState = {
    history: [],
    isLoading: false,
    isError: false,
    message: '',
};

// The payload now includes everything the action needs to be self-sufficient.
interface SendMessagePayload {
    prompt: string;
    systemPrompt: string;
    token: string;
}

// Async thunk for sending a message
export const sendMessage = createAsyncThunk(
    'chat/sendMessage',
    async (payload: SendMessagePayload, thunkAPI) => {
        try {
            // Destructure everything from the payload. No more reading from the global state for critical data.
            const { prompt, systemPrompt, token } = payload; 
            const state = thunkAPI.getState() as RootState;
            const history = state.chat.history;

            // The check is now simpler and more reliable.
            if (!token || !systemPrompt) {
                return thunkAPI.rejectWithValue('Missing required data for chat.');
            }
            
            const userMessage: Message = { role: 'user', parts: [{ text: prompt }] };
            thunkAPI.dispatch(addMessage(userMessage));

            // The apiPayload no longer needs the token, as it's passed separately to the service.
            const apiPayload = { prompt, systemPrompt, history };
            const data = await chatService.generateResponse(apiPayload, token);
            
            return data.message;
        } catch (error: any) {
            const message = (error.response?.data?.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        addMessage: (state, action: PayloadAction<Message>) => {
            state.history.push(action.payload);
        },
        clearChat: (state) => {
            state.history = [];
            state.isLoading = false;
            state.isError = false;
            state.message = '';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendMessage.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(sendMessage.fulfilled, (state, action: PayloadAction<Message>) => {
                state.isLoading = false;
                state.history.push(action.payload);
            })
            .addCase(sendMessage.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    }
});

export const { addMessage, clearChat } = chatSlice.actions;
export default chatSlice.reducer;

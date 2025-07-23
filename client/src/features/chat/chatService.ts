import axios from 'axios';
import { CHAT_ENDPOINTS } from '../../config/api';

interface ChatPayload {
  prompt: string;
  systemPrompt: string;
  history: any[]; // You might want to define a stricter type for history items
}

const generateResponse = async (payload: ChatPayload, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(CHAT_ENDPOINTS.GENERATE, payload, config);
  return response.data;
};

const chatService = {
  generateResponse,
};

export default chatService;
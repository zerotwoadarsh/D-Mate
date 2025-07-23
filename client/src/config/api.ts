const API_BASE_URL = '/api';

export const AUTH_ENDPOINTS = {
  REGISTER: `${API_BASE_URL}/auth/register`,
  LOGIN: `${API_BASE_URL}/auth/login`,
};


export const CHAT_ENDPOINTS = { // <-- NEW
    GENERATE: `${API_BASE_URL}/chat`,
};
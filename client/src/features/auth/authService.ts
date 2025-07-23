import axios from 'axios';
import { AUTH_ENDPOINTS } from '../../config/api';
import type { LoginFormData, RegisterFormData } from '../../lib/validation';

// Register user
const register = async (userData: RegisterFormData) => {
  const response = await axios.post(AUTH_ENDPOINTS.REGISTER, userData);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

// Login user
const login = async (userData: LoginFormData) => {
    const response = await axios.post(AUTH_ENDPOINTS.LOGIN, userData);
    if (response.data) {
        // Log what we are about to save to ensure it contains the token
        console.log("Saving to localStorage:", response.data);
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

// Logout user
const logout = () => {
    localStorage.removeItem('user');
};

const authService = {
  register,
  logout,
  login,
};

export default authService;

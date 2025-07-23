import { createSlice, createAsyncThunk,type PayloadAction } from '@reduxjs/toolkit';
import authService from './authService';
import type { LoginFormData, RegisterFormData } from '../../lib/validation';

// Attempt to get user from localStorage. Handle potential parsing errors.
let user = null;
try {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
        user = JSON.parse(storedUser);
    }
} catch (error) {
    console.error("Could not parse user from localStorage", error);
    localStorage.removeItem('user'); // Clear corrupted data
}


interface AuthState {
  user: { _id: string; email: string; token: string; } | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

const initialState: AuthState = {
  user: user,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const register = createAsyncThunk('auth/register', async (user: RegisterFormData, thunkAPI) => {
  try {
    return await authService.register(user);
  } catch (error: any) {
    const message = (error.response?.data?.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const login = createAsyncThunk('auth/login', async (user: LoginFormData, thunkAPI) => {
    try {
        return await authService.login(user);
    } catch (error: any) {
        const message = (error.response?.data?.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const logout = createAsyncThunk('auth/logout', async () => {
  authService.logout();
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => { state.isLoading = true; })
      .addCase(register.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(login.pending, (state) => { state.isLoading = true; })
      .addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
        console.log("Setting user state in Redux with payload:", action.payload);
        state.isLoading = false;
        state.isSuccess = true;
        // Ensure the entire payload is stored.
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => { state.user = null; });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;

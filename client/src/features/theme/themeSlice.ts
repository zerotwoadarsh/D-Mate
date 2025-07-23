import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { themes, type Theme } from '../../config/themes';

interface ThemeState {
  currentTheme: Theme;
}

const initialState: ThemeState = {
  currentTheme: themes.default,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<string>) => {
      state.currentTheme = themes[action.payload] || themes.default;
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;

import { createSlice,type PayloadAction } from '@reduxjs/toolkit';
// Import the default export and the named type export separately.
import personalityData from '../../data/personalities';
import type { Personality } from '../../data/personalities';

// The async thunk and API-related state properties are now removed.

interface PersonalityState {
  all: Personality[]; // Changed from 'personalities' to 'all'
  selected: Personality | null;
}

const initialState: PersonalityState = {
  all: [], // Start with an empty array
  selected: null,
};

export const personalitySlice = createSlice({
  name: 'personality',
  initialState,
  reducers: {
    // This new action loads the data from our local file into the state.
    loadPersonalities: (state) => {
      state.all = personalityData;
    },
    selectPersonality: (state, action: PayloadAction<Personality | null>) => {
      state.selected = action.payload;
    },
    // Reset now also clears the selected personality
    resetPersonalities: (state) => {
        state.selected = null;
    }
  },
});

export const { loadPersonalities, selectPersonality, resetPersonalities } = personalitySlice.actions;
export default personalitySlice.reducer;

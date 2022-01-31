import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Entry } from '../../types/har';

export interface UIState {
  harExpanded: boolean;
  filter: string;
  selectedEntry: Entry | undefined;
}

const initialState: UIState = {
  harExpanded: false,
  filter: ``,
  selectedEntry: undefined,
};

export const uiSlice = createSlice({
  name: `ui`,
  initialState,
  reducers: {
    toggleHarExpandedView: (state) => {
      state.harExpanded = !state.harExpanded;
    },
    updateFilter: (state, action: PayloadAction<string>) => {
      state.filter = action.payload;
    },
    selectEntry: (state, action: PayloadAction<Entry | undefined>) => {
      state.selectedEntry = action.payload;
    },
  },
});

export const { toggleHarExpandedView, updateFilter, selectEntry } =
  uiSlice.actions;

export default uiSlice.reducer;

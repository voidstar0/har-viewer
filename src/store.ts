import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { uiSlice } from './features/ui/uiSlice';

const store = configureStore({
  reducer: {
    [uiSlice.name]: uiSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export { store };

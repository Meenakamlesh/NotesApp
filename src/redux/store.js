import { configureStore } from '@reduxjs/toolkit';
import NotesReducer from './noteSlice'; // Ensure the path is correct

export const store = configureStore({
  reducer: {
    Notes: NotesReducer, // Ensure the reducer matches the slice name
  },
});

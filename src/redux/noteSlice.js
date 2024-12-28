import { createSlice } from "@reduxjs/toolkit";
import Toaster, { toast } from 'react-hot-toast';

const initialState = {
  Notes: localStorage.getItem("notes")
    ? JSON.parse(localStorage.getItem("notes"))
    : [],
};

export const noteSlice = createSlice({
  name: "Notes",
  initialState,
  reducers: {
    addToNotes: (state, action) => {
      const notes = action.payload;
      state.Notes.push(notes);
      localStorage.setItem("notes",JSON.stringify(state.Notes));
      Toaster(" ✅ Notes created Successfully");


    },
    updateToNotes: (state, action) => {
      const notes = action.payload
      const index = state.Notes.findIndex((item) => item._id === notes._id)

      if (index >= 0) {
        // If the course is found in the Pastes, update it
        state.Notes[index] = notes
        // Update to localstorage
        localStorage.setItem("Notes", JSON.stringify(state.Notes))
        // show toast
        toast.success("Notes updated")
      }
    },
    
    removefromNotes: (state, action) => {
      const NotesId = action.payload;
      const index = state.Notes.findIndex((item)=> item._id === NotesId);

      if (index >= 0){
        state.Notes.splice(index,1);
        localStorage.setItem("Notes",JSON.stringify(state.Notes));
        toast.success("Notes Deleted");

      }
    },
    resetToNotes: (state) => {
      state.Notes = [];
      localStorage.removeItem("Notes")
    },
  },
});

export const { addToNotes, updateToNotes, resetToNotes, removefromNotes } =
  noteSlice.actions;

export default noteSlice.reducer; // Ensure the reducer is exported as default

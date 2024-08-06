import { createSlice } from "@reduxjs/toolkit";

const bookSearchSlice = createSlice({
  name: "books",
  initialState: {
    searchBookValue: '',
  },
  reducers: {
    addSearchBookValue: (state, action) => {
      state.searchBookValue = action.payload;
    }
  }
});

export const { addSearchBookValue } = bookSearchSlice.actions;
export default bookSearchSlice.reducer;

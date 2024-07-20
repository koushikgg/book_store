
import { createSlice } from "@reduxjs/toolkit";

const bookListSlice = createSlice({
  name: "books",
  initialState: {
    allBooks: [],
  },
  reducers: {
    getAllBooks: (state, action) => {

      state.allBooks = action.payload;
    }
  }
});

export const { getAllBooks } = bookListSlice.actions;
export default bookListSlice.reducer;

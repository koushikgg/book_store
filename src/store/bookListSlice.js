
import { createSlice } from "@reduxjs/toolkit";

const bookListSlice = createSlice({
  name: "cart",
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

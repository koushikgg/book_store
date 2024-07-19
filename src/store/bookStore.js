import { configureStore } from "@reduxjs/toolkit";
import bookListSlice from "./bookListSlice";


const bookStore = configureStore({
  reducer: {
    allbooksStore:bookListSlice
  },
});

export default bookStore;
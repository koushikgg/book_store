import { configureStore } from "@reduxjs/toolkit";
import bookListSlice from "./bookListSlice";
import cartSlice from "./cartSlice";
import wishListSlice from "./wishListSlice";


const bookStore = configureStore({
  reducer: {
    allbooksStore:bookListSlice,
    allcartDetails:cartSlice,
    wishListDetails:wishListSlice
  },
});

export default bookStore;
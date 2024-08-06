import { configureStore } from "@reduxjs/toolkit";
import bookListSlice from "./bookListSlice";
import cartSlice from "./cartSlice";
import wishListSlice from "./wishListSlice";
import bookSearchSlice from "./bookSearchSlice";
import myOrderListSlice from "./myOrderListSlice";

const bookStore = configureStore({
  reducer: {
    allbooksStore:bookListSlice,
    allcartDetails:cartSlice,
    wishListDetails:wishListSlice,
    bookSearchDetails:bookSearchSlice,
    booksMyOrderDetails:myOrderListSlice
  },
});

export default bookStore;
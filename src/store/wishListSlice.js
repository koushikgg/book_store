import { createSlice } from "@reduxjs/toolkit";

const wishListSlice = createSlice({
    name : "wishList",
    initialState : {
        wishListItems : [],
    },
    reducers : {
        getWishList: (state,action) => {
            state.wishListItems=action.payload
        },
        addItemToWishList: (state, action) => {
          state.wishListItems.push(action.payload);
        },
        deleteItemFromWishList: (state, action) => {
            state.wishListItems = state.wishListItems.filter((wishList) => wishList._id !== action.payload)
        }
    }
})
export const {getWishList, addItemToWishList, deleteItemFromWishList} = wishListSlice.actions;
export default wishListSlice.reducer